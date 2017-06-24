import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { viewImage } = this.props;

    return (
      <div className={ 'Card-display' }>
        <img onClick={ () => viewImage() }
             className={ 'Card-display-image' }
             src={ this.props.image } />
      </div>
    );
  }
};

export default Display;
