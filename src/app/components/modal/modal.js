import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, hideModal } = this.props;

    return(
      <div className={ 'Modal' } onClick={ () => hideModal() }>
        <div className={ 'Modal-content' }>
          <div className={ 'Modal-header' }>
            <h3 className={ 'Modal-heading' }>{ image.name }</h3>
            <span className={ 'Modal-close' } onClick={ () => hideModal() }>&times;</span>
          </div>
          <div className={ 'Modal-body' }>
            <img className={ 'Modal-body-image' } src={ image.path } />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
