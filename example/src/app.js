import React from 'react';
import SideMenu from 'react-sidemenu';
import ReactDOM from 'react-dom';

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

let App = React.createClass({
	render: function() {
		return (
			<div>
				<SideMenu items={items} />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
