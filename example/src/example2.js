import React from 'react';
import {SideMenu, Item} from 'react-sidemenu';
import ReactDOM from 'react-dom';

let Example2 = React.createClass({
	render: function() {
		return (
			<div>
	      <SideMenu>
					<Item divider={true} label="Segment 1" value="segment1"/>
	        <Item label="Item 1" icon="fa-search">
	          <Item label="Item 1.1" value="item1.1" icon="fa-snapchat">
	            <Item label="Item 1.1.1" value="item1.1.1" icon="fa-anchor"/>
	            <Item label="Item 1.1.2" value="item1.1.2" icon="fa-bar-chart"/>
	          </Item>
	          <Item label="Item 1.2" value="item1.2"/>
	        </Item>
	        <Item label="Item 2" value="item2" icon="fa-automobile">
	          <Item label="Item 2.1" value="item2.1.1">
	            <Item label="Item 2.1.1" value="item2.1.1"/>
	            <Item label="Item 2.1.2" value="item2.1.2"/>
	          </Item>
	          <Item label="Item 2.2" value="item2.2"/>
	        </Item>
					<Item divider={true} label="Segment 2" value="segment2"/>
					<Item label="Item 3" value="item3" icon="fa-beer"/>
	      </SideMenu>
			</div>
		)
	}
});

ReactDOM.render(<Example2 />, document.getElementById('example-2'));
