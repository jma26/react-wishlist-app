import React, { Component } from 'react';
import './App.css';

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

  handleChange(field, event) {
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
            {
              this.state.wishes.map((wish) =>
                <div key={wish.id}>
                  <h2> Wish item: {wish.item} </h2>
                  <h2> Wish link: <a href={wish.link}>{wish.link} </a></h2>
                  <img src={wish.image} alt="Testing" />
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
