import React, { Component } from 'react';
import styles from './Input.module.css';
import $T from '../../support/inject_text.js'

class Input extends Component {
  
  constructor() {
    super();
    this.state = {
      isInputing: false,
      text: ""
    }
  }

  componentDidMount(){   
    if (this.state.isInputing) {
      this.inputDOM.focus(); 
    } 
  }
  
  onchange(event) {
    let newText = event.target.value;
    let regex = new RegExp(/^$|^[a-z0-9=]*$/i);

    event.preventDefault();
    
    if (!regex.test(newText)) return;
    
    this.setState({
      text: newText
    })

    
  }

  onblur() {
    let components = this.state.text.split("=").filter((component) => !!component);
    let listItem = {}
    
    if (!this.state.text) return;

    this.setState({
      text: "",
      isInputing: false
    });

    if (components.length !== 2) {
      alert($T("7"));
      return;
    }
    
    listItem = {  
      key: components[0].trim(),
      value: components[1].trim(),
      selected: false
    };

    this.props.saveStagedItem(this.props.inputId, listItem);
  }

  onclick() {
    if (!this.props.data) this.setState({ isInputing: true });
    else this.toggleSelected();
  }

  oninputareaclick(event) {
    this.setState({ 
      isInputing: true,
      text: this.inputValue()
    });
    event.stopPropagation();
  }

  toggleSelected() {
    let listItem;

    if (!this.props.data) return;

    listItem = this.props.data;

    listItem.selected = !listItem.selected;

    this.props.saveStagedItem(this.props.inputId, listItem);
  }

  isSelected() {
    return Boolean(this.props.data && this.props.data.selected);
  }

  inputValue() {
    if (!this.props.data) return "";
    return `${this.props.data.key}=${this.props.data.value}`;
  }

  renderInput() {
    let inputValue = this.inputValue();

    if (this.state.isInputing === true || !inputValue) {
      return (
        <input 
          ref={(input) => { this.inputDOM = input; }}
          autoFocus={ !!inputValue }
          onChange={ this.onchange.bind(this) }
          value={ this.state.text }
          onClick={ (e) => { e.stopPropagation() } }
          onBlur={ this.onblur.bind(this) }
        />
      )
    } else {
      return (
        <div 
          className={ styles["input-area"] }
          onClick={ this.oninputareaclick.bind(this) }
        >
          { inputValue }
        </div>
      )
    }
  }

  render() {
    return (
      <div 
        className={ this.isSelected() ? styles["main-selected"] : styles["main"] }
        onClick={ this.onclick.bind(this) }
      >
      { this.renderInput() }
      </div>
    );
  }
}

export default Input;