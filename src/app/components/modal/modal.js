import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, hideModal } = this.props;

    return(
      <div className={ 'Modal' }>
        <div className={ 'Modal-content' }>
          <span className={ 'Modal-close' } onClick={ () => hideModal() }>&times;</span>
          <img className={ 'Modal-content-image' } src={ image.data.url } />
        </div>
      </div>
    );
  }
}

export default Modal;
