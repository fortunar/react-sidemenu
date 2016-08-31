import React, {Component, PropTypes} from 'react';

export class SideMenu extends Component {

  propTypes: {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    renderMenuItemContent: PropTypes.func,
    theme: PropTypes.string,
    collapse: PropTypes.bool,
    reverse: PropTypes.bool
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
    const {onMenuItemClick, collapse} = this.props;
    const self = this;
    return (e) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      // handle UI changes
      if (!item.active) {
        // if menu is in collapse mode, close all items
        if (collapse) {
          self.deactivateTree(itemTree);
        }
        item.active = true;
        self.activeParentPath(item);
        self.setState({itemTree: itemTree});
      } else {
        item.active = false;
        // if menu is in collapse mode, close only
        if (item.children) {
          self.deactivateTree(item.children);
        }
        if (item.parent) {
          self.activeParentPath(item.parent);
        }
        self.setState({itemTree: itemTree});
      }

      //handle what happens if the item is a leaf node
      if (!item.children || item.children.length === 0) {
        if (onMenuItemClick) {
          onMenuItemClick(item.value);
        } else {
          window.location.href = `#${item.value}`;
        }
      }
    }
  }

  renderChevron (item, reverse) {
    if (item.children && item.children.length > 0) {
      if (item.active) {
        return (<i className="fa fa-chevron-down"></i>);
      } else if (reverse) {
        return (<i className="fa fa-chevron-right"></i>);
      } else {
        return (<i className="fa fa-chevron-left"></i>);
      }
    }
    return null;
  }

  handleRenderMenuItemContent (item) {
    const {renderMenuItemContent, theme} = this.props;
    if (renderMenuItemContent) {
      return renderMenuItemContent(item);
    }
    else {
      return (
        <span>
          {item.icon &&
            <i className={`fa ${item.icon} item-icon`}> </i>
          }
          {/* render a simple label */}
          <span> {item.label} </span>
          {/* render fa chevrons for default theme */}
          {this.renderChevron(item)}
        </span>
      );
    }
  }

  renderItem(item, level) {
    const {onMenuItemClick, reverse} = this.props;

    if (item.divider) {
      return (<div key={item.value} className={`divider divider-level-${level}`}>{item.label} </div>);
    }
    else {
      return (<div
        key={item.value}
        className={`item item-level-${level} ${item.active ? 'active': ''}`}
        >
        <div className={`item-title ${reverse ? 'reverse' : ''}`}
        onClick={this.onItemClick(item)}>
          {this.handleRenderMenuItemContent(item)}
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
    const {itemTree, componentStateTree} = this.state;
    const {theme, onMenuItemClick, reverse} = this.props;


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
                onMenuItemClick: onMenuItemClick,
                reverse: reverse
              })
          })}
        </div>
      )
    }
  }
}

SideMenu.defaultProps = {
  collapse: true,
  reverse: false
}

export class Item extends Component {

  propTypes : {
    label: PropTypes.string,
    value: PropTypes.string,
    activeState: PropTypes.object,
    level: PropTypes.number,
    icon: PropTypes.string,
    devider: PropTypes.bool,
    reverse: PropTypes.bool
  }

  onItemClick() {
    this.props.handleComponentClick(this.props.activeState);
    const {onMenuItemClick, children, value} = this.props;
    if (!children || children.length === 0) {
      if (onMenuItemClick) {
        onMenuItemClick(value);
      } else {
        window.location.href = `#${value}`;
      }
    }
  }

  renderChevron (children, activeState, reverse) {
    if (children) {
      if (activeState.active) {
        return (<i className="fa fa-chevron-down"></i>);
      } else if (reverse) {
        return (<i className="fa fa-chevron-right"></i>);
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
      children,
      reverse} = this.props;

    if (divider) {
      return (
        <div className={`divider divider-level-${level}`}>{label} </div>
      )
    } else {
      return (
        <div className={`item item-level-${level} ${activeState.active ? 'active': ''}`}>
          <div className={`item-title ${reverse ? 'reverse' : ''}`} onClick={this.onItemClick.bind(this)}>
            {/* render icon if provided*/}
            {icon &&
              <i className={`fa ${icon} item-icon`}></i>
            }
            {/* render a simple label*/}
            <span> {label} </span>
            {/* render fa chevrons for default theme */}
            { (!theme || theme == 'default') && this.renderChevron(children, activeState, reverse)}
          </div>
          {children &&
          <div className={`children ${activeState.active ? 'active' : 'inactive'}`} style={{paddingLeft: `${20}px`}}>
            { React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                  handleComponentClick: this.props.handleComponentClick,
                  activeState: activeState.children[index],
                  level: level + 1,
                  onMenuItemClick: onMenuItemClick,
                  reverse: reverse
                })
            })}
          </div>}
        </div>
      )
    }

  }

}
