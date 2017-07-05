import React, { Component } from 'react';
import './icon.css';

class ImageIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleClick, className } = this.props;

    return (
      <div className={ 'Icon ' + className }
           onClick={ () => handleClick() }>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    );
  }
}

export default ImageIcon;
