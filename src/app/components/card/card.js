import React, { Component } from 'react';
import Display from './display';
import Controls from './controls';
import './card.css';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, viewImage, setImage, deleteImage } = this.props;
    console.log('IMAGE = ');
    console.log(image);
    return (
      <div className={ 'Card' }>
        <Display image={ image }
                 viewImage={ viewImage } />
        <Controls setImage={ setImage }
                  deleteImage={ deleteImage } />
      </div>
    );
  }
};

export default Card;
