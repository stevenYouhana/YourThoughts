import React from 'react';
import Api from '../../util/Api';
import SubmitHandle from './SubmitHandle';


export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
  }
  validateEmail(email) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
      return (false)
  }
  render() {
    return (
      <SubmitHandle wordToday={this.props.wordToday} validateEmail={this.validateEmail}
              getOthers={this.props.getOthers} showOthers={this.props.showOthers} />

    );

  }
}
