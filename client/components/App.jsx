import React from 'react';

import './reset.scss';
import './App.scss';


function getAmountVal(arr, prop) {
     let amount = 0;
     arr.forEach((element, index) => {
        amount += parseFloat(element[prop].replace(",", "."));
     });   
     return amount.toString().replace(".", ",");
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loansData: [],
      totalAmount: 0
    };
    this.createItemsView = this.createItemsView.bind(this);
};

createItemsView(arrayElem) {
   return <div key={arrayElem.title}  className="item-elem">      
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
           </div>                     
           <button>Invest in Loan</button>              
        </div> 
}  

componentDidMount() {

      const that = this;
      async function fetchAsync() {
        let response = await fetch("http://localhost:9000/json/current-loans.json");
        let data = await response.json();

         data.loans.forEach((x, index) => {
           const valToDate = +x.term_remaining;
           const valToDateDay = new Date(valToDate).getDay();
           const valToDateMonth = new Date(valToDate).getMonth();   
           const valToDateYear = new Date(valToDate).getFullYear();  
           const valToTime = `${new Date(valToDate).getHours()}:${new Date(valToDate).getMinutes()}`;
           x.term_remaining = ` ${valToDateDay}/${valToDateMonth}/${valToDateYear} ${valToTime}`;
           return  x;
         });   

          that.setState({
              loansData: data.loans
          });

          that.setState({
              totalAmount: getAmountVal(data.loans, "amount")
          });          

          return data;
      }

      fetchAsync();

};

render() {

    const listItems = this.state.loansData.map((elem, index ) => 
        this.createItemsView(elem)    
    );

    return (
      <div className="general-container">
        <div className="loan-items-container"> 
          <h2>Current loans</h2>
           {listItems}
        </div> 
        <p className="loan-total-amount">Total amount, avalible for investments: <strong> £ {this.state.totalAmount} </strong> </p>   
      </div>
    );
  }
}

export default App;
