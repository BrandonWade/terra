import React, { Component } from 'react';
import './icon.css';

class Icon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleClick, className } = this.props;

    return (
      <div className={ className }
           onClick={ () => handleClick() }>
           { this.props.children }
      </div>
    );
  }
}

export default Icon;
