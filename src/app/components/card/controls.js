import React, { Component } from 'react';
import ImageIcon from '../icons/image';
import DeleteIcon from '../icons/delete';

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setImage, deleteImage } = this.props;

    return (
      <div className={ 'Card-controls' }>
        <ImageIcon handleClick={ () => setImage() }
                   className={ 'Card-controls-item' } />
        <DeleteIcon handleClick={ () => deleteImage() }
                    className={ 'Card-controls-item' } />
      </div>
    );
  }
};

export default Controls;
