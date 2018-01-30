import React from 'react';
import './Popup.scss';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
};

handleChange(event) {
    if (!isNaN(event.target.value)) {
      this.setState({value: event.target.value});      
    } else {
       alert("You could input numbers only!!!")
    }
}

render() {
    return (
      <div>
        <div className="popup-container">
            <button  className="close-popup-btn" onClick = {this.props.closePopup.bind(this)}>x</button>
            <h3>Invest in Loan</h3>
            <p>{this.props.popupItemData.popupItemTitle} </p>
            <div className="popup-info">
              <p>Amount avalible: {this.props.popupItemData.popupItemAvailible} </p>       
              <p>Loan ends in:  {this.props.popupItemData.popupItemTerm} </p>                     
            </div>
            <div className="popup-form">
              <form>
                 <label>Investment amount (£)</label>
                 <div className="form-item">
                    <input type="text" onBlur={this.handleChange} placeholder="Investment amount"/>
                    <button className="big-btn" onClick = {this.props.popupCallBack.bind(this, this.state.value)}>Invest now</button>                 
                 </div>
              </form>              
            </div>                       
        </div>
        <div className="overlay-popup" onClick = {this.props.closePopup.bind(this)}>></div>
      </div>
    );
  }
}

export default Popup;
