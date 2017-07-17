import React, { Component } from 'react';
import OutlineModal from 'reboron/OutlineModal';
import './modal.css';

const backdropStyle = {
  backgroundColor: 'rgba(0,0,0,0.8)',
};

const modalStyle = {
  width: 'auto',
};

const rectStyle = {
  stroke: '#202020',
};

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalVisible) {
      this.refs.modal.show();
    } else {
      this.refs.modal.hide();
    }
  }

  render() {
    const { image, hideModal } = this.props;

    return(
      <OutlineModal ref={ 'modal' } backdropStyle={ backdropStyle } modalStyle={ modalStyle } rectStyle={ rectStyle } onHide={ () => hideModal() }>
        <div className={ 'Modal-content' }>
          <div className={ 'Modal-header' }>
            <h3 className={ 'Modal-heading' }>{ image.file_name }</h3>
            <span className={ 'Modal-close' } onClick={ () => this.refs.modal.hide() }>&times;</span>
          </div>
          <div className={ 'Modal-body' }>
            <img className={ 'Modal-body-image' } src={ image.url } />
          </div>
        </div>
      </OutlineModal>
    );
  }
}

export default Modal;
