import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, className, handleClick } = this.props;

    return (
      <button className={ className } onClick={ () => handleClick() }>{ text }</button>
    );
  }
};

export default Button;
