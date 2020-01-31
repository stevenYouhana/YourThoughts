import React from 'react';
import './App.css';
import Header from '../Header/Header';
import WordToday from '../WordToday/WordToday';
import FunFact from '../FunFact/FunFact';

class App extends React.Component {
  constructor(props) {
    super(props);


  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <FunFact />
        <WordToday />
      </div>
    );
  }
}

export default App;
