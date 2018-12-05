import React, { Component } from "react";
import styles from "./Input.module.css";
import settings from "../../support/settings.json";
import $T from "../../support/inject_text.js";

class Input extends Component {
	constructor() {
		super();

		this.isFocused = false;
		this.state = {
			text: "",
		};
	}

	componentDidUpdate() {
	
		
		if (this.props.isFocused) {
			this.focus();
		} else {
			// Clears text from state when list item is deleted.
			if (!this.props.data && this.state.text) this.setState({ text: "" });
			this.blur();
		} 
	}

	save() {
		let components = this.state.text.split("=").filter((component) => !!component);
		let listItem = {};
		let isEmpty = !this.state.text;

		if (isEmpty) {
			if (this.props.data) this.props.deleteStagedItem(this.props.inputId);
			return false;
		}

		if (components.length !== 2) {
			alert($T("7"));
			this.setState({ text: "" });
			return false;
		}

		listItem = {  
			key: String(components[0]).trim(),
			value: String(components[1]).trim(),
			selected: this.props.data ? this.props.data.selected : true
		};

		this.props.saveStagedItem(this.props.inputId, listItem);

		return true;
	}

	listControls(event) {
		let wasId = this.props.inputId;

		if (wasId < 0 || !this.isFocused) return;
		
		// Key Up
		if (event.which === 38 && wasId > 0) {
			event.preventDefault();
			this.save();
			this.props.setFocusedInput(wasId -1);
		}

		// Key Down
		if (event.which === 40 && wasId < settings.inputs) {
			this.save();
			this.props.setFocusedInput(wasId + 1);
			event.preventDefault();
		}

		// Enter Key
		if (event.which === 13 && wasId < settings.inputs) {
			this.save();
			this.props.setFocusedInput(wasId + 1);
			event.preventDefault();
		}
	}

	toggleSelected() {
		let listItem;

		if (!this.props.data) return;

		listItem = this.props.data;

		listItem.selected = !listItem.selected;

		this.props.saveStagedItem(this.props.inputId, listItem);
	}

	setFocus() {
		this.props.setFocusedInput(this.props.inputId);
	}

	focus() {
		if (this.isFocused === false && this.inputDOM) {
			this.setState({
				text: this.inputValue()
			});

			this.inputDOM.focus();
			
			this.isFocused = true;
			this.keylistenserHandler = this.listControls.bind(this);

			document.addEventListener("keydown", this.keylistenserHandler);
		}
	}

	blur() {
		if (this.isFocused === true ) {
			this.isFocused = false;

			document.removeEventListener("keydown", this.keylistenserHandler);

			this.setState({ text: "" });
		}
	}

	isSelected() {
		return Boolean(this.props.data && this.props.data.selected);
	}

	inputValue() {
		if (!this.props.data) return "";
		return `${this.props.data.key}=${this.props.data.value}`;
	}

	onchange(event) {
		let newText = event.target.value;
		let regex = new RegExp(/^$|^[a-z0-9]*=?[a-z0-9]*$/i);

		event.preventDefault();
		if (!regex.test(newText)) return;
		
		this.setState({
			text: newText
		});
	}

	oninputblur() {
		if (this.props.isFocused) {
			this.save();
			this.props.setFocusedInput(-1);
		}
	}

	onclick() {
		if (!this.props.data) this.setFocus();
		else this.toggleSelected();
	}

	oninputclick(event) {
		this.setFocus();

		event.preventDefault();
		event.stopPropagation();
	}

	ondoubleclick(event) {
		this.setFocus();
		event.stopPropagation();
	}

	renderInput() {
		let inputValue = this.inputValue();

		if (this.props.isFocused === true || !this.props.data) {
			return (
				<input 
					ref={(input) => { this.inputDOM = input; }}
					onChange={ this.onchange.bind(this) }
					value={ this.state.text }
					onClick={ this.oninputclick.bind(this) }
					onBlur={ this.oninputblur.bind(this) }
				/>
			);
		} else {
			return (
				<div 
					className={ styles["input-area"] }
				>
					{ inputValue }
				</div>
			);
		}
	}

	render() {
		return (
			<div 
				className={ this.isSelected() ? styles["main-selected"] : styles["main"] }
				onClick={ this.onclick.bind(this) }
				onDoubleClick={ this.ondoubleclick.bind(this) }
			>
				{ this.renderInput() }
			</div>
		);
	}
}

export default Input;