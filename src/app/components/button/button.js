import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleClick } = this.props;

    return (
      <button className={ this.props.className } onClick={ () => handleClick() }>{ this.props.text }</button>
    );
  }
};

export default Button;
