// @flow
import React, {Component} from 'react';
import SideMenu, {Item} from 'src';

//$FlowFixMe
export default class ExampleNoCollapse extends Component {
	render() {
		return(<div>
				<p>
          This propery controls whether sections of menu collapse when you click on other items.
        </p>
	      <SideMenu collapse={false}>
					<Item divider={true} label="Segment 1" value="segment1"/>
	        <Item label="Item 1" value="item1" icon="fa-search">
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
		);
	}
}
