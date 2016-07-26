import React, {Component, PropTypes} from 'react';

export default class SideMenu extends Component {

  propTypes : {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  buildTree(children, parent) {
      return children.map((child) => {
        let newChild = {...child}
        let subTree = [];
        if (child.children) {
          subTree = this.buildTree(child.children, newChild);
        }
        newChild.children = subTree;
        newChild.parent = parent;
        newChild.active = false;
        return newChild;
      });
  }

  componentDidMount() {
    console.log('DID MOUNT');
    const {items} = this.props;
    console.log(this.buildTree(items, null));
    this.setState({itemTree: this.buildTree(items, null)});
    console.log(this.state);
    // items.forEach((item) => this.setInactiveState(item));
  }


  activateItem(item) {
    const {itemTree} = this.state;
    const self = this;
    return (e) => {
      item.active = true;
      console.log('ACTIVATE ITEM');
      console.log(item);
      console.log(items);
      console.log(e);
      this.setState({items: items});
    }
  }

  deactivateTree(itemTree) {
    itemTree.forEach((item) => {
      item.active = false;
      if (item.children) {
        this.deactivateTree(item.children);
      }
    });
  }

  activeParentPath(item) {
    let curItem = item;
    while (curItem !== null) {
      curItem.active = true;
      curItem = curItem.parent;
    }
  }

  onItemClick (item) {
    const {itemTree} = this.state;
    const self = this;
    return (e) => {
      e.stopPropagation();
      item.active = true;
      self.deactivateTree(itemTree);
      self.activeParentPath(item);
      self.setState({itemTree: itemTree});
      console.log(item);
    }
  }

  renderItem(item){
    const {onMenuItemClick} = this.props;
    return (
      <div key={item.value}
      onClick={this.onItemClick(item)}>
        {item.children.length > 0 &&
          <span> {item.label} </span>
        }
        {item.children.length === 0 && !onMenuItemClick &&
          <a href={`#${item.value}`}>
            <span> {item.label} </span>
          </a>
        }
        {item.children.length === 0 && onMenuItemClick &&
          <span onClick={()=> onMenuItemClick(item.value)}> {item.label} </span>
        }
        <div className={`children ${item.active ? 'active' : 'inactive'}`}>
          {item.children && item.children.map((child) =>
            this.renderItem(child)
          )}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    const {itemTree} = this.state;

    return (
      <div className="Side-menu">
        {itemTree && itemTree.map((item) =>
          this.renderItem(item)
        )}
      </div>
    );
  }
}
