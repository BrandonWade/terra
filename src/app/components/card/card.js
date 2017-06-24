import React, { Component } from 'react';
import Display from './display';
import Controls from './controls';
import './card.css';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { viewImage, setImage, deleteImage } = this.props;
    
    return (
      <div className={ 'Card' }>
        <Display viewImage={ viewImage } />
        <Controls setImage={ setImage }
                  deleteImage={ deleteImage } />
      </div>
    );
  }
};

export default Card;
