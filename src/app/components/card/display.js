import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, viewImage } = this.props;

    return (
      <div className={ 'Card-display' }>
        <img onClick={ () => viewImage() }
             className={ 'Card-display-image' }
             src={ image.data.url } />
      </div>
    );
  }
};

export default Display;
