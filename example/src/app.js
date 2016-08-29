import React from 'react';
import SideMenu from 'react-sidemenu';
import ReactDOM from 'react-dom';

const items = [
	// by default all items are inactive
	{divider: true, label: 'Main navigation', value: 'main-nav'},
	{label: 'item 1', value: 'item1', icon: 'fa-search', children: [
		{label: 'item 1.1', value: 'item1.1', icon: 'fa-snapchat', children: [{label: 'item 1.1.1', value: 'item1.1.1', icon: 'fa-anchor'}, {label: 'item 1.1.2', value: 'item1.1.2', icon: 'fa-bar-chart'}]},
		{label: 'item 1.2', value: 'item1.2'},
		{label: 'item 1.3', value: 'item1.3'}]},
	{divider: true, label: 'Labels', value: 'labels-nav'},
	{label: 'item 2', value: 'item2', icon: 'fa-automobile', children: [
		{label: 'item 2.1', value: 'item2.1', children: [{label: 'item 2.1.1', value: 'item2.1.1'}, {label: 'item 2.1.2', value: 'item2.1.2'}]},
		{label: 'item 2.2', value: 'item2.2'},
		{label: 'item 2.3', value: 'item2.3'},
	{label: 'item 2.4', value: 'item2.5', icon: 'fa-bars'},
	{label: 'item 2.6', value: 'item2.7', icon: 'fa-bell'}]},
	{divider: true, label: 'Motors', value: 'motors-nav'},
	{label: 'item 3', value: 'item3', icon: 'fa-beer'}
];

let App = React.createClass({
	render: function() {
		return (
			<div>
				<SideMenu items={items}/>
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
