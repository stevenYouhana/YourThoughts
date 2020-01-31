import React from 'react';
import {confirmAlert} from 'react-confirm-alert';
import Api from '../../util/Api';
import './ConfirmAlert.css';
class ConfirmAlert extends React.Component {
  yesAction = () => {
        Api.getLocation().then(res => {
          this.props.setLocation(res);
        })
  }

  dialog = () => {
    confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='location-confirmAlert'>
          <h5>YourThoughts would like to access the location of your current city</h5>
          <button id="btn-location-no" className="alert-button" onClick={onClose}>Cancel</button>
          <button id="btn-location-ok" className="alert-button"
            onClick={() => {
              this.yesAction();
              setTimeout(() => {
                onClose()
              }, 500)
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
