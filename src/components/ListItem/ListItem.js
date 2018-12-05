import React, { Component } from "react";
import styles from "./ListItem.module.css";

class ListItem extends Component {
	
	toggleSelected() {
		if (!this.props.data) return;
		
		this.props.setSelected(
			this.props.itemId,
			!this.props.data.selected
		);
	}

	isSelected() {
		return Boolean(this.props.data && this.props.data.selected);
	}

	inputValue() {
		if (!this.props.data) return "";
		return `${this.props.data.key}=${this.props.data.value}`;
	}

	render() {
		return (
			<div 
				className={ this.isSelected() ? styles["main-selected"] : styles["main"] }
				onClick={ this.toggleSelected.bind(this) }
			>
				{ this.inputValue() }
			</div>
		);
	}
}

export default ListItem;