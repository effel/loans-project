import React from 'react';
import './Popup.scss';

class Popup extends React.Component {
  constructor(props) {
    super(props);
};

render() {
    return (
      <div className="overlay-popup">
         <div className="popup-container">
           {this.props.popupItemTitle}
           <button onClick = {this.props.popupCallBack.bind(this, "7")}>Edit the Recipe</button>
         </div>
      </div>
    );
  }
}

export default Popup;
