import React, { Component } from 'react';
import Icon from '../icon/icon';
import ImageIcon from '../../icons/image';
import DeleteIcon from '../../icons/delete';

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setImage, deleteImage } = this.props;

    return (
      <div className={ 'Card-controls' }>
        <Icon handleClick={ () => setImage() }
              className={ 'Icon Card-controls-item' }>
          <ImageIcon />
        </Icon>
        <Icon handleClick={ () => deleteImage() }
              className={ 'Icon Card-controls-item' }>
          <DeleteIcon />
        </Icon>
      </div>
    );
  }
};

export default Controls;
