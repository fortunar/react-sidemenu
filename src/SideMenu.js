import React, {Component, PropTypes} from 'react';

export class SideMenu extends Component {

  propTypes: {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    theme: PropTypes.string,
    collapse: PropTypes.bool
  }

  constructor(props, defaultProps) {
   super(props, defaultProps);
   this.state = {items: [], componentStateTree: []};
  }

  //
  // methods for COMPONENT structure
  //

  componentWillMount() {
    if (this.props.children) {
      this.setState({componentStateTree: this.buildComponentStateTree(this.props.children, null)});
    }
  }

  buildComponentStateTree(children, parent) {
    return React.Children.map(children, (child) => {
      let newChild = {}
      let subTree = [];
      if (child.props.children) {
        subTree = this.buildComponentStateTree(child.props.children, newChild);
      }
      newChild.children = subTree;
      newChild.active = false;
      newChild.parent = parent;

      return newChild;
    });
  }

  handleComponentClick(item) {
    const {collapse} = this.props;
    const {componentStateTree} = this.state;
    const activeBefore = item.active;

    // collapse
    console.log("COLLAPSE ", collapse)
    if (collapse) {
      this.deactivateComponentTree(componentStateTree);
    }
    this.activateParentsComponentTree(item, activeBefore);
    this.setState({componentStateTree: componentStateTree});
  }

  activateParentsComponentTree(item, activeBefore) {
    if (item) {
      item.active = !activeBefore;
      this.activateParentsComponentTree(item.parent);
    }
  }

  deactivateComponentTree(componentStateTree) {
    return componentStateTree.map((child) => {
      child.active = false;
      if (child.children) {
        child.children = this.deactivateComponentTree(child.children);
      }

      return child;
    });
  }

  //
  // methods for JSON structure
  //

  componentDidMount() {
    const {items} = this.props;

    if (items) {
      this.setState({itemTree: this.buildTree(items, null)});
    }
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
    const {itemTree, componentStateTree, onMenuItemClick} = this.state;
    const {theme} = this.props;


    if (!this.props.children) {
      // sidemenu constructed from json
      return (
        <div className={`Side-menu ${theme ? `Side-menu-${theme}` : 'Side-menu-default'} children active`}>
          {itemTree && itemTree.map((item) =>
            this.renderItem(item, 1)
          )}
        </div>
      );
    } else {
      // sidemenu constructed with react components
      return (
        <div className={`Side-menu ${theme ? `Side-menu-${theme}` : 'Side-menu-default'} children active`}>
          { React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, {
                activeState: componentStateTree[index],
                handleComponentClick: this.handleComponentClick.bind(this),
                level: 1,
                onMenuItemClick: onMenuItemClick
              })
          })}
        </div>
      )
    }
  }
}

SideMenu.defaultProps = {
  collapse: true
}

export class Item extends Component {

  propTypes : {
    label: PropTypes.string,
    value: PropTypes.string,
    activeState: PropTypes.object,
    level: PropTypes.number,
    icon: PropTypes.string,
    devider: PropTypes.bool
  }

  onItemClick() {
    this.props.handleComponentClick(this.props.activeState);
  }

  renderChevron (children, activeState) {
    if (children) {
      if (activeState.active) {
        return (<i className="fa fa-chevron-down"></i>);
      } else {
        return (<i className="fa fa-chevron-left"></i>);
      }
    }
    return null;
  }

  render() {
    const {label,
      activeState,
      level,
      icon,
      onMenuItemClick,
      divider,
      theme,
      value,
      children} = this.props;

    if (divider) {
      return (
        <div className={`divider divider-level-${level}`}>{label} </div>
      )
    } else {
      return (
        <div className={`item item-level-${level} ${activeState.active ? 'active': ''}`}>
          <div className="item-title" onClick={this.onItemClick.bind(this)}>
            {/* render icon if provided*/}
            {icon &&
              <i className={`fa ${icon} item-icon`}> </i>
            }
            {/* render a simple label if not a leaf element */}
            {this.props.children &&
              <span> {label} </span>
            }
            {/* render a link if it is a leaf and no onMenuItemClick is provided */}
            {!this.props.children && !onMenuItemClick &&
              <a href={`#${value}`}>
                <span> {label} </span>
              </a>
            }
            {/* use onMenuItemClick if provided */}
            {!this.props.children && onMenuItemClick &&
              <span onClick={()=> onMenuItemClick(value)}> {label} </span>
            }
            {/* render fa chevrons for default theme */}
            { (!theme || theme == 'default') && this.renderChevron(children, activeState)}
          </div>
          {children &&
          <div className={`children ${activeState.active ? 'active' : 'inactive'}`} style={{paddingLeft: `${20}px`}}>
            { React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                  handleComponentClick: this.props.handleComponentClick,
                  activeState: activeState.children[index],
                  level: level + 1,
                  onMenuItemClick: onMenuItemClick
                })
            })}
          </div>}
        </div>
      )
    }

  }

}
