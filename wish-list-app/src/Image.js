import React from 'react';

const Image = (props) => {
  if (props.image) {
    return (<img src={props.image} alt={props.alt} />)
  } else {
    return (<img src='http://via.placeholder.com/250x200' alt='Nothing'/>)
  }
}

export default Image;