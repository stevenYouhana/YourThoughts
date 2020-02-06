import React from 'react';
import Submit from './Submit';
import Others from '../Others/Others';
import background from './background.jpg'
import ConfirmAlert from '../ConfirmAlert/ConfirmAlert';
import Api from '../../util/Api';
import './WordToday.css';

export default class WordToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ["ready..."],
      wordIndex: 0,
      selectedWord: '',
      showOthers: false,
      others: [],
      showLocationAlert: true,
      error: false,
      region: 'private',
      lon: 0,
      lat: 0
    }
    this.getOthers = this.getOthers.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.showOthers = this.showOthers.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.randomiseWord = this.randomiseWord.bind(this);
  }
  randomiseWord() {
    let ran = Math.floor(Math.random() * Math.floor(this.state.words.length));
    this.setState({
      selectedWord: this.state.words[ran],
      wordIndex: ran
    });
  }
  nextWord() {
    this.state.wordIndex < this.state.words.length - 1 ?
    this.setState({wordIndex: this.state.wordIndex + 1}) :
    this.setState({wordIndex: 0});

    setTimeout(() => {
      this.setState({
        selectedWord: this.state.words[this.state.wordIndex],
        showOthers: false
      });
    }, 10);
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
  handleNextWord = () => {
    this.nextWord();
  }
  componentDidMount() {
    Api.getWordsForTheWeek().then(response => response.json())
      .then(jsonResponse => {
          this.setState({words: jsonResponse})
          this.randomiseWord();
      })
  }
  render() {
    return(
      <div className="main">
      {this.state.showLocationAlert ? <ConfirmAlert setLocation={this.setLocation} /> : null}
      <button id="btn-nextWord" onClick={this.handleNextWord}>next word</button>
        <h4>Speak your thoughts about <span id="selectedWord" className="selectedWord">{this.state.selectedWord}</span></h4>
         <div className="input-wrapper">
          <div className="user-inputs">
            <textarea id="thought-input" className="fancy-scrollbar" type="text" placeholder="Speak your thoughts ..." />
            <div id="second-row">
              <input id="user-email-field" type="text" placeholder="email address"/>
              <Submit id="btn-submit" selectedWord={this.state.selectedWord}
                getOthers={this.getOthers}
                showOthers={this.showOthers}
                location={this.state.region}
                />
            </div>
            {
              this.state.showOthers ?
              <Others selectedWord={this.state.selectedWord} getOthers={this.state.others} /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}
