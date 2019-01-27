import React, { Component } from 'react';
import Websocket from 'react-websocket';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        transcript: null
      };
    }

    handleData(data) {
      let result = JSON.parse(data);
      console.log(result)
      this.setState({transcript: result});
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div>
              <pre>{this.state.transcript}</pre>

            <Websocket url='ws://0.0.0.0:6677'
                onMessage={this.handleData.bind(this)}/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
