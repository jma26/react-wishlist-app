import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
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
      // Map through the array and run it through reader
      imageFiles.map((imageFile) => {
        reader.readAsDataURL(imageFile);
      })
    }
  }

  handleSubmit(event) {
    alert('handleSubmit() called!');
    event.preventDefault();
    
    let formData = new FormData();
    formData.append('item', this.state.item);
    formData.append('link', this.state.link);
    formData.append('image', this.state.image);
    
    let wish = {
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

  handleChange(field, event) {
    console.log(field);
    this.setState({
      [field]: event.target.value
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
              <input type="file" id="image-upload" onChange={(event) => this.imageUpload(event.target.files)}/>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
          <div className="list">
          <img src={this.state.image} alt="Testing" />
            {
              this.state.wishes.map((wish) =>
                <img src={wish.image} alt="Testing" />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
