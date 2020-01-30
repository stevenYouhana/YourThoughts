import React from 'react';
import Submit from './Submit';
import Others from '../Others/Others';
import background from './background.jpg'
import ConfirmAlert from '../ConfirmAlert/ConfirmAlert';
import './WordToday.css';

export default class WordToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOthers: false,
      showLocationAlert: true,
      error: false,
      region: 'private',
      lon: 0,
      lat: 0
    }
    this.getOthers = this.getOthers.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.showOthers = this.showOthers.bind(this);
  }
  showOthers() {
    this.setState({showOthers: true, others: []});
  }
  getOthers(response) {
      response.thoughts.map(thought => {
        this.setState({others: [...this.state.others, thought]});
      })
  }
  setLocation(res) {
    this.setState({
      showLocationAlert: false,
      region: res.region,
      lon: res.longitude,
      lat: res.latitude
    })
  }
  render() {
    return(
      <div className="main">
      {this.state.showLocationAlert ? <ConfirmAlert setLocation={this.setLocation} /> : null}
        <h4>Speak your thoughts about <span className="wordToday">{this.props.wordToday}</span></h4>
         <div className="input-wrapper">
          <div className="user-inputs">
            <textarea id="thought-input" className="fancy-scrollbar" type="text" placeholder="Speak your thoughts ..." />
            <div id="second-row">
              <input id="user-email-field" type="text" placeholder="email address"/>
              <Submit id="btn-submit" wordToday={this.props.wordToday}
                getOthers={this.getOthers}
                showOthers={this.showOthers}
                location={this.state.region}
                />
            </div>
            {
              this.state.showOthers ?
              <Others wordToday={this.props.wordToday} getOthers={this.state.others} /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}
