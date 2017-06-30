import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewImage, setImage, deleteImage } from './actions/card';
import Card from './components/card/card';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images } = this.props;

    return (
      <div id={ 'container' }>
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
    currentImage: state.currentImage,
    images: state.images,
  };
};

export default connect(mapStateToProps)(App);
