import React, { Component } from 'react';

import Image from './Image';

const List = (props) => (
  <div className="list">
    {
      props.wishes.map((wish) =>
        <div className="wish" key={wish.id}>
          <h2> {wish.item} </h2>
          <h2> <a href={wish.link}>{wish.link} </a></h2>
          <Image image={wish.image} alt={wish.item} />
        </div>
      )
    }
  </div>
)

export default List;