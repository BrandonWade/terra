import React, { Component } from 'react';
import Button from '../button/button';

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setImage, deleteImage } = this.props;
    
    return (
      <div className={ 'Card-controls' }>
        <Button handleClick={ () => setImage() }
                className={ 'Card-controls-item' }
                text={ 'Set' } />
        <Button handleClick={ () => deleteImage() }
                className={ 'Card-controls-item' }
                text={ 'Delete' } />
      </div>
    );
  }
};

export default Controls;
