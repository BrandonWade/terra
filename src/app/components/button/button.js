import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className={ this.props.className }>{ this.props.text }</button>
    );
  }
};

export default Button;
