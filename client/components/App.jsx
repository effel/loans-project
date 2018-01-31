import React from 'react';
import Popup from './Popup.jsx';

import './App.scss';

function formatAmount(amount) {

}

function modifyStoreData(arrayToModify, that) {
    let amount = 0;
    arrayToModify.forEach((element, index) => {
      const valToDate = (+element.term_remaining)*10;
      const valToDateDay = Math.floor(valToDate / (3600*24));
      const valToDateMonth = Math.floor(valToDateDay / 30);  
      element.id = Math.random().toString(36).substr(2, 16);;
      element.term_remaining = `${valToDateMonth} Month ${valToDateDay} Days`;
      element.invested = false;
      amount += parseFloat(element.amount.replace(",", "."));
    });   
    that.setState({
        totalAmount: amount.toString().replace(".", ",")
    });   
    return  arrayToModify;   
}

function isInvested(value) {
   if (value) {
      return <span className="label">value</span>;
   }
}
function IsInvested(isInvested) {
  return (
    (isInvested.isInvested === "true") ?  <div className="label">Invested</div> : ""
  );
}

function createItemsView(arrayElem, openPopup) {
  return <div key={arrayElem.id}  className="item-elem">      
           <h3>{arrayElem.title}</h3>    
           <div className="item-elem-info"> 
               <p>
                 <span>Tranche:</span>
                 {arrayElem.tranche}
               </p>
               <p>
                 <span>Available:</span>
                 {arrayElem.available}
               </p>          
               <p>
                 <span>Annualised return:</span>
                 {arrayElem.annualised_return}
               </p>     
               <p>
                 <span>Term remaining:</span>
                 {arrayElem.term_remaining}
               </p>    
               <p>
                 <span>ltv:</span>
                 {arrayElem.ltv}
               </p>   
               <p>
                 <span>Amount:</span>
                 {arrayElem.amount} £
               </p> 
               <IsInvested isInvested={arrayElem.invested} />    
           </div>                     
           <button onClick = {openPopup.bind(this, arrayElem)}>Invest in Loan</button>              
        </div> 
} 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loansData: [],
      totalAmount: 0,
      openPopup: false,
      popupData: {
        popupItemTitle: "",
        popupItemAvailible: "",
        popupItemTerm: "",
        popupItemId: "",      }
    };
    this.modifyAmount = this.modifyAmount.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
};


modifyAmount(popupData) {
    let newTotalAmount = +(this.state.totalAmount.replace(",", ".")) + +(popupData.value); 
    const editedLoanData = this.state.loansData.find((item, index) => {
       if (item.id === popupData.itemId) {
          const amountNumber = parseFloat(item.amount.replace(",", ".")) + +(popupData.value); 
          item.invested="true";
          item.amount = amountNumber.toFixed(3).toString().replace(".", ",");
       }
    });

    this.setState({
      totalAmount: newTotalAmount.toFixed(3).toString().replace(".", ",")
    });     
    this.setState({
      openPopup: false
    }); 
    return false;
}

openPopup(item) {
  this.setState({
      openPopup: true,
      popupData: {
        popupItemTitle : item.title,
        popupItemAvailible : item.available,
        popupItemTerm : item.term_remaining,
        popupItemId : item.id   
      } 

  });

}
closePopup(title) {
  this.setState({
      openPopup: false
  });
}
renderPopup(item) {
   if (this.state.openPopup) {
        return <Popup 
          popupCallBack={this.modifyAmount} 
          popupItemData={this.state.popupData}
          closePopup={this.closePopup}
          />
 
   }
}

componentDidMount() {

      const that = this;
      async function fetchAsync() {
        let response = await fetch("http://localhost:9000/json/current-loans.json");
        let data = await response.json();
         
        modifyStoreData(data.loans, that)
        that.setState({
            loansData: data.loans
        });
        return data;
      }

      fetchAsync();

};

render() {

    const listItems = this.state.loansData.map((elem, index ) => 
      createItemsView(elem, this.openPopup)    
    );

    return (
      <div className="general-container">
        <div className="loan-items-container"> 
          <h2>Current loans</h2>
          {listItems}
        </div> 
        <p className="loan-total-amount">Total amount, avalible for investments: <strong> £ {this.state.totalAmount} </strong> </p>   
        {this.renderPopup()}    
      </div>

    );
  }
}

export default App;
