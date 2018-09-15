import React, {Component} from 'react';
import SideMenu from 'src';

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

export default class ExampleRTL extends Component {
	render() {
		return (
			<div>
				<SideMenu
				items={items}
				rtl={true}
				/>
			</div>
		);
	}
}
