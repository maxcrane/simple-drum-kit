import React, { Component } from 'react';
import './App.css';
import Drums from './Drums';

class App extends Component {
  componentWillMount() {
      // Create a single AudioContext (depending on namespace) for audio output
      this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  render() {
    return (
      <div className="App">
        <Drums context={ this.context } />
      </div>
    );
  }
}

export default App;
