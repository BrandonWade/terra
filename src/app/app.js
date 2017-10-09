import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './components/modal/modal';
import Card from './components/card/card';
import {
    modalAction,
    fetchAction,
    imageAction,
    SHOW_MODAL,
    HIDE_MODAL,
    FETCH_IMAGES,
    SET_IMAGE,
    DELETE_IMAGE,
} from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.dispatch(fetchAction(FETCH_IMAGES));
  }

  render() {
    const { images, currentImage, modalVisible } = this.props;

    return (
      <div id={ 'container' }>
        <Modal hideModal={ () => this.props.dispatch(modalAction(HIDE_MODAL)) } modalVisible={ modalVisible } image={ currentImage } />
        <div className={ 'card-wrapper' }>
          {
            images.map((card, index) => {
              return (
                <Card key={ index }
                      image={ images[index] }
                      viewImage={ () => this.props.dispatch(modalAction(SHOW_MODAL, index)) }
                      setImage={ () => this.props.dispatch(imageAction(SET_IMAGE, index)) }
                      deleteImage={ () => this.props.dispatch(imageAction(DELETE_IMAGE, index)) } />
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
