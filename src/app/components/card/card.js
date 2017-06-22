import React, { Component } from 'react';
import Display from './display';
import Controls from './controls';
import './card.css';

class Card extends Component {
  render() {
    return (
      <div className={ 'Card' }>
        <Display />
        <Controls />
      </div>
    );
  }
};

export default Card;
