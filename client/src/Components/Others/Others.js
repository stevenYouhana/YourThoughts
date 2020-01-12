import React from 'react';
import Thought from '../Thought/Thought';
import Api from '../../util/Api';
import './Others.css';

export default class Others extends React.Component {
  constructor(props) {
    super(props);
    this.state = {thoughts:
      ["my thought on the word",
      "I think it's that",
      "in my opinion that's that",
      "never thought og that word before actually!"
    ],
    others: []
    }
    this.renderThoughts = this.renderThoughts.bind(this);
  }
  renderThoughts() {
    // console.log('renderThoughts(): ', this.props.getOthers);
    return this.props.getOthers.map((thought, i) => {
      console.log("renderThoughts(): ",thought)
        return <Thought key={i} thought={thought} />
    })
  }

  componentDidMount() {
    console.log('componentDidMount()')
    Api.othersFor(this.props.wordToday).then(response => {
      this.setState({others: response.thought});
    });
  }
  render() {
    return(
      <div>
        <h3>Here is what others thought of <span id="wordToday">{this.props.wordToday}</span></h3>
        <div className="thoughts-section fancy-scrollbar">
            {this.renderThoughts()}
        </div>
      </div>
    );
  }
}
