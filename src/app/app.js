import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewImage, setImage, deleteImage } from './actions/card';
import { hideModal } from './actions/modal';
import Modal from './components/modal/modal';
import Card from './components/card/card';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images, currentImage, modalVisible } = this.props;

    return (
      <div id={ 'container' }>
        <Modal hideModal={ () => this.props.dispatch(hideModal()) } modalVisible={ modalVisible } image={ currentImage } />
        <div className={ 'card-wrapper' }>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentImage: state.currentImage,
    images: state.images,
    modalVisible: state.modalVisible,
  };
};

export default connect(mapStateToProps)(App);
