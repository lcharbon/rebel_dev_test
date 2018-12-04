import React, { Component } from 'react';
import styles from './InputList.module.css';
import settings from '../../support/settings.json';

import Input from '../Input/Input.js'

class InputList extends Component {

  constructor() {
    super();
    this.state = {
      inputValues: {},
      selectedInputs: [],
      focusedInputId: -1
    }
  }

  setFocusedInput(inputId) {
    this.setState({
      focusedInputId: inputId
    })
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
                deleteStagedItem={ this.props.deleteStagedItem }
                setFocusedInput={ this.setFocusedInput.bind(this) }
                isFocused={ this.state.focusedInputId === index }
              />
            )
          })
        }
      </div>
    );
  }
}

export default InputList;