import React from 'react';
import Numbersapi from '../../util/Numbersapi';
import './FunFact.css';

export default class FunFact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fact: 'keep breathing...', author: ''}
  }
  componentDidMount() {
    Numbersapi.getQuote().then(data => {
      this.setState({
        fact: data.content,
        author: data.author
      });
    });
  }
  render() {
    return(
      <div className="main-dev">
        <div className="funFact">
          <p>{this.state.fact}</p>
          <p id='author'>-{this.state.author}</p>
        </div>
      </div>
    );
  }


}
