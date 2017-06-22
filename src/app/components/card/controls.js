import React, { Component } from 'react';
import Button from '../button/button';

class Controls extends Component {
  render() {
    return (
      <div className={ 'Card-controls' }>
        <Button className={ 'Card-controls-item' } text={ 'Set' } />
        <Button className={ 'Card-controls-item' } text={ 'Options' } />
      </div>
    );
  }
};

export default Controls;
