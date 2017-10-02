import React from 'react';
import {SideMenu, Item} from 'react-sidemenu';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

const items = [
	// by default all items are inactive
	{label: 'item 1', value: 'item1', children: [
		{label: 'item 1.1', value: 'item1.1', children: [{label: 'item 1.1.1', value: 'item1.1.1'}, {label: 'item 1.1.2', value: 'item1.1.2'}]},
		{label: 'item 1.2', value: 'item1.2'},
		{label: 'item 1.3', value: 'item1.3'}]},
	{label: 'item 2', value: 'item2', children: [
		{label: 'item 2.1', value: 'item2.1', children: [{label: 'item 2.1.1', value: 'item2.1.1'}, {label: 'item 2.1.2', value: 'item2.1.2'}]},
		{label: 'item 2.2', value: 'item2.2'},
		{label: 'item 2.3', value: 'item2.3'}]},
	{label: 'item 3', value: 'item3'}
];

let App = createReactClass({
	render: function() {
		return (
			<div>
				<SideMenu>
					<Item label="Item 1">
						<Item label="Item 1.1">
							<Item label="Item 1.1.1"/>
							<Item label="Item 1.1.2" />
						</Item>
						<Item label="Item 1.2"/>
					</Item>
					<Item label="Item 2">
						<Item label="Item 2.1">
							<Item label="Item 2.1.1"/>
							<Item label="Item 2.1.2"/>
						</Item>
						<Item label="Item 2.2"/>
					</Item>
				</SideMenu>
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
