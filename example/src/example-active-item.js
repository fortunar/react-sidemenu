import React from 'react';
import {SideMenu, Item} from 'react-sidemenu';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

let ExampleActiveItem = createReactClass({

  getInitialState: function() {
    return { activeItem: 'item1.1.1'};
  },

	render: function() {
		return (
			<div>
        <p>
          <b>activeItem</b> propery presets the active menu item and opens all the necessary parents.
        </p>
        <p>
          You can also change <b>activeItem</b> from the wrapper component, by simply changing the variable passed to SideMenu.
        </p>
        <button className="btn btn-primary" onClick={() => this.setState({activeItem: 'item2.1.2'})} style={{marginBottom: 10}}>Set Active item to 2.1.2</button>
        <br/>
        <SideMenu
          activeItem={this.state.activeItem}>
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
