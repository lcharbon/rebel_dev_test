import React, { Component } from "react";
import styles from "./KeyValueList.module.css";
import settings from "../../support/settings.json";

import ListItem from "../ListItem/ListItem.js";

class KeyValueList extends Component {
	countPadInputs() {
		let padListItemsCount = settings.inputs - this.props.listItems.length;
		return padListItemsCount > 0 ? padListItemsCount : 0;
	}
	
	render() {
		let listItems = this.props.listItems.concat([...Array(this.countPadInputs())]);
		
		return (
			<div className={styles["main"]}>
				{
					listItems.map((ignore, index) => {
						return (
							<ListItem
								key={ index }
								itemId={ index }
								data={ this.props.listItems[index] }
								setSelected={ this.props.setSelected }
							/>
						);
					})
				}
			</div>
		);
	}
}

export default KeyValueList;