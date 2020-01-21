import React from 'react';
import Api from '../../util/Api';

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateEmail(email) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
      alert("You have entered an invalid email address!")
      this.setState({error: true});
      return (false)
  }
  handleSubmit() {
    const thought = document.querySelector('#thought-input').value;
    const email =  document.querySelector('#user-email-field').value;
    const word = this.props.wordToday;

    if (!this.validateEmail(email)) return;
    if (!thought || !email) return alert("Fill in all fields to submit");
    let existingEntry = false;
    for (let i=0; i<3; i++) {
      console.log(localStorage.key(i))
      existingEntry = localStorage.key(i) ? true : false;
    }
    console.log("existingEntry: "+existingEntry);
    if (!existingEntry) {
      console.log("if (!existingEntry) ", existingEntry)
      Api.getLocation().then(result => {
        const prevWord = localStorage.getItem('word');
        const prevEmail = localStorage.getItem('email');
        const prevIp = localStorage.getItem('clientIp');

        if (prevIp !== result.ip &&
          prevWord !== word &&
          prevEmail !== email) {
            console.log("if (prevIp !== result.ip &&prevWord !== word &&prevEmail !== email)")
          Api.newRecord({
            email: email,
            word: word,
            thought: thought,
            region: this.props.region,
            lon: this.props.lon,
            lat: this.props.lat
          });
        }
        else {
          console.log("localStorage: ",localStorage)
          alert("You have already sent your thought to this word");
        }
      });
    }
    else {
      Api.getLocation().then(result => {
        console.log("Api.getLocation().then(result => { ",result.ip);
          localStorage.removeItem('clientIp');
          localStorage.removeItem('word');
          localStorage.removeItem('email');
          localStorage.setItem('clientIp', result.ip);
          localStorage.setItem('word', word);

          Api.newRecord({
            email: email,
            word: word,
            thought: thought,
            region: this.props.region,
            lon: this.props.lon,
            lat: this.props.lat
          });
      })
    }
    
    Api.othersFor(this.props.wordToday).then(response => {
        this.props.getOthers(response);
     });

    this.props.showOthers();
    // document.querySelector("#btn-submit").disabled = true;
  }
  render() {
    return <button id="btn-submit" onClick={this.handleSubmit}>Send</button>
  }
}
