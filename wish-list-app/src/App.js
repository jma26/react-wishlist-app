import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      link: '',
      image: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('handleSubmit() called!');
    event.preventDefault();
  }

  handleChange(field, event) {
    console.log(field);
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="title"> wish<span>Li</span>st </h1>
        </header>
        <div className="main">
          <form onSubmit={this.handleSubmit} className="wishform">
            <fieldset className="wish-field">
              <label htmlFor="wish" /> Wish item
              <input type="text" id="wish" onChange={(event) => this.handleChange("item", event)} />
            </fieldset>
            <fieldset className="link-field">
              <label htmlFor="link" /> Link
              <input type="text" id="link" onChange={(event) => this.handleChange("link", event)} />
            </fieldset>
            <fieldset className="image-field">
              <label type="image-upload" /> Image
              <input type="file" id="image-upload" onChange={(event) => this.handleChange("image", event)}/>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
          <div className="list">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
