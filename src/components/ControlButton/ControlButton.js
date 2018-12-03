import React, { Component } from 'react';
import styles from './ControlButton.module.css';

class ControlButton extends Component {
  render() {
    return (
      <div 
        className={styles["main"]}
        onClick={ this.props.onclick }
      >
        { this.props.caption }
      </div>
    );
  }
}

export default ControlButton;