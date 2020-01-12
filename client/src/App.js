import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.connectToServer = this.connectToServer.bind(this);
  }
  connectToServer() {
    console.log("connectToServer()")
    fetch('/');
  }
  componentDidMount() {
    this.connectToServer();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        
        </header>
      </div>
    );
  }

}

export default App;
