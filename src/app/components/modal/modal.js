import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, hideModal } = this.props;
    console.log(image);

    return(
      <div className={ 'modal' }>
        <div className={ 'modal-content' }>
          <span className={ 'close' } onClick={ () => hideModal() }>&times;</span>
          <img src={ image.data.url } />
        </div>
      </div>
    );
  }
}

export default Modal;
