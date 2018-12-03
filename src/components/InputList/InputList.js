import React, { Component } from 'react';
import styles from './InputList.module.css';
import settings from '../../support/settings.json';

import Input from '../Input/Input.js'

class InputList extends Component {

  constructor() {
    super();
    this.state = {
      inputValues: {},
      selectedInputs: []
    }
  }

  render() {
    return (
      <div className={styles["main"]}>
        {
          [...Array(settings.inputs)].map((ignore, index) => {
            return (
              <Input
                key={ index }
                inputId={ index }
                data={ this.props.listItems[index] }
                saveStagedItem={ this.props.saveStagedItem }
              />
            )
          })
        }
      </div>
    );
  }
}

export default InputList;