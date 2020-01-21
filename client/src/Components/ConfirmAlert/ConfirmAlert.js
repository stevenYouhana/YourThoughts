import React from 'react';
import {confirmAlert} from 'react-confirm-alert';
import Api from '../../util/Api';
import './ConfirmAlert.css';
class ConfirmAlert extends React.Component {
  yesAction = () => {
      console.log("Api.getLocation().then ");
        Api.getLocation().then(res => {
          this.props.setLocation(res);
        })
  }

  dialog = () => {
    confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='location-confirmAlert'>
          <h5>YourThoughts would like to access your current location</h5>
          <button className="alert-button" onClick={onClose}>No</button>
          <button className="alert-button"
            onClick={() => {
              this.yesAction();
              setTimeout(() => {
                onClose()
              }, 500)
              // onClose();
            }}
          >
            Ok
          </button>
        </div>
      );
    }
  });
  }

 render() {
   return (
     <div className='container'>
       {this.dialog()}
     </div>
   );
 }
}

export default ConfirmAlert;
