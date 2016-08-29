import React, {Component, PropTypes} from 'react';

export default class SideMenu extends Component {

  propTypes : {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    theme: PropTypes.string
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
    const {items} = this.props;
    this.setState({itemTree: this.buildTree(items, null)});
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
      e.nativeEvent.stopImmediatePropagation();
      if (!item.active) {
        item.active = true;
        self.deactivateTree(itemTree);
        self.activeParentPath(item);
        self.setState({itemTree: itemTree});
      } else {
        item.active = false;
        self.deactivateTree(itemTree);
        if (item.parent) {
          self.activeParentPath(item.parent);
        }
        self.setState({itemTree: itemTree});
      }
    }
  }

  renderChevron (item) {
    if (item.children && item.children.length > 0) {
      if (item.active) {
        return (<i className="fa fa-chevron-down"></i>);
      } else {
        return (<i className="fa fa-chevron-left"></i>);
      }
    }
    return null;
  }

  renderItem(item, level) {
    const {onMenuItemClick, theme} = this.props;

    if (item.divider) {
      return (<div key={item.value} className={`divider divider-level-${level}`}>{item.label} </div>);
    }
    else {
      return (<div
        key={item.value}
        onClick={this.onItemClick(item)}
        className={`item item-level-${level} ${item.active ? 'active': ''}`}
        >
        <div className="item-title">
          {/* render icon if provided*/}
          {item.icon &&
            <i className={`fa ${item.icon} item-icon`}> </i>
          }
          {/* render a simple label if not a leaf element */}
          {item.children.length > 0 &&
            <span> {item.label} </span>
          }
          {/* render a link if it is a leaf and no onMenuItemClick is provided */}
          {item.children.length === 0 && !onMenuItemClick &&
            <a href={`#${item.value}`}>
              <span> {item.label} </span>
            </a>
          }
          {/* use onMenuItemClick if provided */}
          {item.children.length === 0 && onMenuItemClick &&
            <span onClick={()=> onMenuItemClick(item.value)}> {item.label} </span>
          }
          {/* render fa chevrons for default theme */}
          { (!theme || theme == 'default') && this.renderChevron(item)}
        </div>
        {/* render children */}
        <div className={`children ${item.active ? 'active' : 'inactive'}`}>
          {item.children && item.children.map((child) =>
            this.renderItem(child, level + 1)
          )}
        </div>
      </div>);
    }
  }

  render() {
    const {itemTree} = this.state;
    const {theme} = this.props;

    return (
      <div className={`Side-menu ${theme ? `Side-menu-${theme}` : 'Side-menu-default'} children active`}>
        {itemTree && itemTree.map((item) =>
          this.renderItem(item, 1)
        )}
      </div>
    );
  }
}
