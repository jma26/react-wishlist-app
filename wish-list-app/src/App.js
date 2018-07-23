import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1> wish<span>Li</span>st </h1>
        </header>
        <div class="main">
          <form>
            <label for="wish" /> Wish item
            <input type="text" id="wish" />
            <label for="link" /> Link
            <input type="text" id="link" />
            <label type="image-upload" /> Image
            <input type="file" id="image-upload" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
