import React,{Component } from "react";
import styles from "./App.module.css";
import $T from "../../support/inject_text.js";

import ControlButton from "../ControlButton/ControlButton.js";
import InputList from "../InputList/InputList.js";
import KeyValueList from "../KeyValueList/KeyValueList.js";

class App extends Component {
	
	constructor() {
		super();
		this.state = {
			listItems: [],
			stagedItems: []
		};
	}
	
	onaddclick() {
		let newListItems = this.state.listItems.slice();
		let newStagedItems = [];
		
		this.state.stagedItems.forEach((listItem) => {
			if (listItem.selected === true) {
				listItem.selected = false;
				newListItems.push(listItem);
			} else {
				newStagedItems.push(listItem);
			}
		});

		if (newListItems.length === 0) {
			alert($T("8"));
		}

		this.setState({ 
			listItems: newListItems,
			stagedItems: newStagedItems
		});
	}

	onremoveclick() {
		let newListItems = [];
		let listItem;

		for (listItem of this.state.listItems) {
			if (listItem.selected !== true) newListItems.push(listItem);
		}

		this.setState({ listItems: newListItems});
	}

	onclearclick() {
		this.setState({
			listItems: [],
			stagedItems: []
		});
	}

	onexportclick() {
		let blob = new Blob([JSON.stringify(this.generateJSON(), null, 2)], {type : "application/json"});
		let url = URL.createObjectURL(blob);
		let downloadTag = document.createElement("a");
		
		document.body.appendChild(downloadTag);
		
		downloadTag.style = "display: none;";
		downloadTag.href = url;
		downloadTag.download = "list.json";
		downloadTag.click();
		downloadTag.remove();
	}

	onsortnameclick() {
		let newListItems = this.state.listItems.slice();

		newListItems.sort(function(a, b) {
			let nameA = a.key.toUpperCase();
			let nameB = b.key.toUpperCase();
			
			return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
		});

		this.setState({
			listItems: newListItems
		});
	}

	onsortvalueclick() {
		let newListItems = this.state.listItems.slice();

		newListItems.sort(function(a, b) {
			let valueA = a.value.toUpperCase();
			let valueB = b.value.toUpperCase();
			
			return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
		});

		this.setState({
			listItems: newListItems
		});
	}

	saveStagedItem(index, listItem) {
		let newStagedItems = this.state.stagedItems.slice();
		let targetListItem = newStagedItems[index];

		if (targetListItem) {
			// Update existing list item.
			Object.assign(targetListItem, listItem);
		} else {
			// Adds list item.
			newStagedItems.push(listItem);
		}

		this.setState({
			stagedItems: newStagedItems
		});
	}

	deleteStagedItem(index) {
		let newStagedItems = this.state.stagedItems.slice();

		newStagedItems.splice(index, 1);
		
		this.setState({
			stagedItems: newStagedItems
		});
	}

	setSelected(index, value) {
		let newListItems = this.state.listItems.slice();

		newListItems[index].selected = value;

		this.setState({ listItems: newListItems });
	}

	generateJSON() {
		let json = {};

		this.state.listItems.forEach((listItem) => {
			json[listItem.key] = listItem.value;
		});

		return json;
	}

	render() {
		return (
			<div className={ styles["main"] }>
				<div className={ styles["input-list-container"] }>
					<InputList
						listItems={ this.state.stagedItems } 
						saveStagedItem={ this.saveStagedItem.bind(this) }
						deleteStagedItem={ this.deleteStagedItem.bind(this) }
					/>
				</div>
				<div className={ styles["controls"] }>
					<div className={ styles["control-button-container"] }>
						<ControlButton 
							caption={ $T("1") /* Add */}
							onclick={ this.onaddclick.bind(this) }
						/>
					</div>
					<div className={ styles["control-button-container"] }>
						<ControlButton
							onclick={ this.onremoveclick.bind(this) }
							caption={ $T("2") /* Remove Selected */}
						/>
					</div>
					<div className={ styles["control-button-container"] }>
						<ControlButton
							onclick={ this.onclearclick.bind(this) }
							caption={ $T("3") /* Clear */}
						/>
					</div>
					<div className={ styles["control-button-container"] }>
						<ControlButton
							onclick={ this.onexportclick.bind(this) }
							caption={ $T("4") /* Export to JSON */}
						/>
					</div>
					<div className={ styles["control-button-container"] }>
						<ControlButton 
							onclick={ this.onsortnameclick.bind(this) }
							caption={ $T("5") /* Sort by Name */}
						/>
					</div>
					<div className={ styles["control-button-container"] }>
						<ControlButton
							onclick={ this.onsortvalueclick.bind(this) }
							caption={ $T("6") /* Sort by Value */}
						/>
					</div>
				</div>
				<div className={ styles["key-value-list-container"] }>
					<KeyValueList 
						listItems={ this.state.listItems }
						setSelected={ this.setSelected.bind(this) }
					/>
				</div>
			</div>
		);
	}
}

export default App;
