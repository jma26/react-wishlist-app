import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import List from './List';

class App extends Component {
  constructor() {
    super();
    this.id = 1;
    this.state = {
      wishes: [],
      item: '',
      link: '',
      image: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Only run if the previous state of 'wishes' is not the same as current state
    if (prevState.wishes !== this.state.wishes) {
      let wishes = this.state.wishes;
      let reader = new FileReader();
      // Initialize empty array
      let imageFiles = [];
      reader.onloadend = () => {
        wishes.forEach((wish) => {
          // Push each image into array
          imageFiles.push(wish.image);
        })
      }
      // Have each imageFile run through reader
      imageFiles.forEach((imageFile) => reader.readAsDataURL(imageFile));
    }
  }

  handleSubmit(event) {
    if (this.state.item === '' || this.state.link === '') {
      event.preventDefault();
      alert('Empty input fields not allowed!');
      this.setState({
        item: '',
        link: '',
        image: null
      });
      event.target.reset();
    } else {
      event.preventDefault();
      let formData = new FormData();
      formData.append('item', this.state.item);
      formData.append('link', this.state.link);
      formData.append('image', this.state.image);
      
      let wish = {
        id: this.id++,
        item: this.state.item,
        link: this.state.link,
        image: this.state.image
      }
  
      this.setState({
        wishes: [...this.state.wishes, wish],
        item: '',
        link: '',
        image: null
      });
      event.target.reset();
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  imageUpload(files) {
    console.log(files);
    if (files) {
      let imageFile = files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          image: reader.result,
        })
      }
      reader.readAsDataURL(imageFile);
    }
  }

  isImageAvailable(wish) {
    if (wish.image) {
      return <img src={wish.image} alt={wish.item} />
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main">
          <form onSubmit={this.handleSubmit} className="wishform">
            <fieldset className="wish-field">
              <label htmlFor="wish" /> Wish item
              <input type="text" maxLength="30" id="wish" name="item" value={this.state.item} onChange={(event) => this.handleChange(event)} />
            </fieldset>
            <fieldset className="link-field">
              <label htmlFor="link" /> Link
              <input type="text" id="link" name="link" value={this.state.link} onChange={(event) => this.handleChange(event)} />
            </fieldset>
            <fieldset className="image-field">
              <label type="image-upload" /> Image
              <input type="file" id="image-upload" onChange={(event) => this.imageUpload(event.target.files)}/>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
          <List wishes={this.state.wishes} />
        </div>
      </div>
    );
  }
}

export default App;
