import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewImage, setImage, deleteImage } from './actions/card';
import { showModal, hideModal } from './actions/modal';
import Modal from './components/modal/modal';
import Card from './components/card/card';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { images, currentImage } = this.props;

    return (
      <div id={ 'container' }>
        <Modal hideModal={ () => this.props.dispatch(hideModal()) }
               image={ images[0] } />
        {
          images.map((card, index) => {
            return (
              <Card key={ index }
                    image={ images[index] }
                    viewImage={ () => this.props.dispatch(viewImage(index)) }
                    setImage={ () => this.props.dispatch(setImage(index)) }
                    deleteImage={ () => this.props.dispatch(deleteImage(index)) } />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentImage: state.card.currentImage,
    images: state.card.images,
    modalVisible: state.modal.modalVisible,
  };
};

export default connect(mapStateToProps)(App);
