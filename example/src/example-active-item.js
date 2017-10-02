import React from 'react';
import {SideMenu, Item} from 'react-sidemenu';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

const items = [
	{divider: true, label: 'Segment 1', value: 'segment1'},
	{label: 'Item 1', value: 'item1', icon: 'fa-search',
	children: [
		{label: 'Item 1.1', value: 'item1.1', icon: 'fa-snapchat',
		children: [
			{label: 'Item 1.1.1', value: 'item1.1.1', icon: 'fa-anchor'},
			{label: 'Item 1.1.2', value: 'item1.1.2', icon: 'fa-bar-chart'}]},
		{label: 'Item 1.2', value: 'item1.2'}]},
	{label: 'Item 2', value: 'item2', icon: 'fa-automobile',
	children: [
		{label: 'Item 2.1', value: 'item2.1',
		children: [
			{label: 'Item 2.1.1', value: 'item2.1.1'},
			{label: 'Item 2.1.2', value: 'item2.1.2'}]},
		{label: 'Item 2.2', value: 'item2.2'}]},
	{divider: true, label: 'Segment 2', value: 'segment2'},
	{label: 'Item 3', value: 'item3', icon: 'fa-beer'}
];

let ExampleActiveItem = createReactClass({

  getInitialState: function() {
    return { activeItem: 'item1.1.1'};
  },

  changeActiveItem: function(value) {
    this.setState({activeItem: value});
    var self = this;
    setTimeout(function(){
      alert(`Property activeItem of the state changed to: ${self.state.activeItem}!`);
    }, 10);
  },

	render: function() {
		return (
			<div>
        <SideMenu
        activeItem={this.state.activeItem}
        onMenuItemClick={this.changeActiveItem}>
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

ReactDOM.render(<ExampleActiveItem />, document.getElementById('example-active-item'));
