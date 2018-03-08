import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class SideMenu extends Component {

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = { items: [], componentStateTree: [], activeItem: this.props.activeItem };
    this.onClickDictionary = {};
  }

  //
  // methods for COMPONENT structure
  //

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps;    
    if (items) {
      this.setState({ itemTree: this.buildTree(items, null) });
    }
    if (this.state.activeItem != nextProps.activeItem) {
      if (this.onClickDictionary[nextProps.activeItem]) {
        this.onClickDictionary[nextProps.activeItem]();
      }
    }
  }

  componentWillMount() {
    if (this.props.children) {
      this.setState({
        componentStateTree: this.buildComponentStateTree(this.props.children, null),
      });
    }
  }

  buildComponentStateTree(children, parent) {
    const { activeItem } = this.props;

    return React.Children.map(children, (child) => {
      const newChild = {};
      let subTree = [];

      newChild.active = false;
      newChild.parent = parent;

      if (activeItem === child.props.value) {
        this.activateParentsComponentTree(newChild);
      }

      if (child.props.children) {
        subTree = this.buildComponentStateTree(child.props.children, newChild);
      }
      newChild.children = subTree;

      return newChild;
    });
  }

  handleComponentClick(item) {
    const { collapse } = this.props;
    const { componentStateTree } = this.state;
    const activeBefore = item.active;

    // collapse
    if (collapse) {
      this.deactivateComponentTree(componentStateTree);
    }
    this.activateParentsComponentTree(item, activeBefore);
    this.setState({ componentStateTree: componentStateTree });
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
    const { items } = this.props;

    if (items) {
      this.setState({ itemTree: this.buildTree(items, null) });
    }
  }

  buildTree(children, parent) {
    const { activeItem } = this.props;

    return children.map((child) => {
      const newChild = { ...child };
      let subTree = [];

      newChild.parent = parent;
      newChild.active = false;

      if (newChild.value === activeItem) {
        newChild.active = true;
        this.activeParentPath(newChild);
      }

      if (child.children) {
        subTree = this.buildTree(child.children, newChild);
      }
      newChild.children = subTree;

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

  onItemClick(item) {
    const { itemTree } = this.state;
    const { onMenuItemClick, collapse, shouldTriggerClickOnParents } = this.props;
    const self = this;
    return (e) => {
      if (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
      // handle UI changes
      if (!item.active) {
        // if menu is in collapse mode, close all items
        if (collapse) {
          self.deactivateTree(itemTree);
        }
        item.active = true;
        self.activeParentPath(item);
        self.setState({ itemTree: itemTree });
      } else {
        item.active = false;
        // if menu is in collapse mode, close only
        if (item.children) {
          self.deactivateTree(item.children);
        }
        if (item.parent) {
          self.activeParentPath(item.parent);
        }
        self.setState({ itemTree: itemTree });
      }

      // check if item has an onClick method defined
      if (item.onClick) {
        item.onClick(item.value);
      }
      // handle what happens if the item is a leaf node
      else if (!item.children || item.children.length === 0 || shouldTriggerClickOnParents) {
        if (onMenuItemClick) {
          onMenuItemClick(item.value, item.extras);
        } else {
          window.location.href = `#${item.value}`;
        }
      }

      this.setState({...this.state, activeItem: item.value});
    };
  }

  renderChevron(item, rtl) {
    if (item.children && item.children.length > 0) {
      if (item.active) {
        return (<i className="fa fa-chevron-down" />);
      } else if (rtl) {
        return (<i className="fa fa-chevron-right" />);
      }
      return (<i className="fa fa-chevron-left" />);
    }
    return null;
  }

  handleRenderMenuItemContent(item) {
    const { renderMenuItemContent, rtl } = this.props;
    if (renderMenuItemContent) {
      return renderMenuItemContent(item);
    }
    return (
      <span>
        {item.icon &&
          <i className={`fa ${item.icon} item-icon`} />
        }
        {/* render a simple label */}
        <span className="item-label"> { item.label } </span>
        { this.renderChevron(item, rtl) }
      </span>
    );
  }

  renderItem(item, level) {
    if (item.divider) {
      return (
        <div key={item.value} className={`divider divider-level-${level}`}>
          { item.label }
        </div>
      );
    }
    this.onClickDictionary[item.value] = this.onItemClick(item);
    return (
      <div
        key={item.value}
        className={`item item-level-${level} ${item.active ? 'active' : ''}`}>
        <div
          className="item-title"
          onClick={this.onItemClick(item)}>
          { this.handleRenderMenuItemContent(item) }
        </div>
        {/* render children */}
        <div className={`children ${item.active ? 'active' : 'inactive'}`}>
          {item.children && item.children.map((child) =>
            this.renderItem(child, level + 1)
          )}
        </div>
      </div>
    );
  }

  render() {
    const { itemTree, componentStateTree } = this.state;
    const { theme, onMenuItemClick, rtl, renderMenuItemContent, shouldTriggerClickOnParents } = this.props;

    const sidemenuComponent = this;
    if (!this.props.children) {
      // sidemenu constructed from json
      return (
        <div className={`Side-menu Side-menu-${theme} ${rtl ? 'rtl' : ''} children active`}>
          {itemTree && itemTree.map((item) =>
            this.renderItem(item, 1)
          )}
        </div>
      );
    }
    // sidemenu constructed with react components
    return (
      <div className={`Side-menu  Side-menu-${theme} ${rtl ? 'rtl' : ''} children active`}>
        { React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            activeState: componentStateTree[index],
            handleComponentClick: this.handleComponentClick.bind(this),
            renderMenuItemContent: renderMenuItemContent,
            onMenuItemClick: onMenuItemClick,
            shouldTriggerClickOnParents: shouldTriggerClickOnParents,
            rtl: rtl,
            level: 1,
            sidemenuComponent: sidemenuComponent
          });
        })}
      </div>
    );
  }
}

SideMenu.propTypes = {
  items: PropTypes.array,
  onMenuItemClick: PropTypes.func,
  renderMenuItemContent: PropTypes.func,
  theme: PropTypes.string,
  collapse: PropTypes.bool,
  rtl: PropTypes.bool,
  activeItem: PropTypes.string,
};

SideMenu.defaultProps = {
  collapse: true,
  rtl: false,
  theme: 'default',
};

export class Item extends Component {

  onItemClick() {
    this.props.handleComponentClick(this.props.activeState);
    const { onMenuItemClick, children, value, shouldTriggerClickOnParents, onClick, extras, sidemenuComponent } = this.props;
    if (onClick) {
      onClick(value);
    }
    else if (!children || children.length === 0 || shouldTriggerClickOnParents) {
      if (onMenuItemClick) {
        onMenuItemClick(value, extras);
      } else {
        window.location.href = `#${value}`;
      }
    }
    if (sidemenuComponent) {
      sidemenuComponent.setState({...sidemenuComponent.state, activeItem: value});
    }
  }

  renderChevron(children, activeState, rtl) {
    if (children) {
      if (activeState.active) {
        return (<i className="fa fa-chevron-down" />);
      } else if (rtl) {
        return (<i className="fa fa-chevron-right" />);
      }
      return (<i className="fa fa-chevron-left" />);
    }
    return null;
  }

  handleRenderMenuItemContent() {
    const { renderMenuItemContent, children, value, label, icon, activeState, rtl } = this.props;
    if (renderMenuItemContent) {
      return renderMenuItemContent({ icon: icon, value: value, label: label });
    }
    return (
      <span>
        {/* render icon if provided*/}
        {icon &&
          <i className={`fa ${icon} item-icon`} />
        }
        {/* render a simple label*/}
        <span className="item-label"> {label} </span>
        { this.renderChevron(children, activeState, rtl) }
      </span>
    );
  }

  render() {
    const { label,
      activeState,
      level,
      onMenuItemClick,
      divider,
      children,
      rtl,
      renderMenuItemContent,
      shouldTriggerClickOnParents,
      value,
      sidemenuComponent
   } = this.props;

    if (divider) {
      return (
        <div className={`divider divider-level-${level}`}>{label} </div>
      );
    }
    if (sidemenuComponent) {
      sidemenuComponent.onClickDictionary[value] = this.onItemClick.bind(this);
    }
    return (
      <div className={`item item-level-${level} ${activeState.active ? 'active' : ''}`}>
        <div className="item-title" onClick={this.onItemClick.bind(this)}>
          {this.handleRenderMenuItemContent()}
        </div>
        {children &&
          <div className={`children ${activeState.active ? 'active' : 'inactive'}`}>
            {React.Children.map(children, (child, index) => {
              return React.cloneElement(child, {
                handleComponentClick: this.props.handleComponentClick,
                activeState: activeState.children[index],
                renderMenuItemContent: renderMenuItemContent,
                onMenuItemClick: onMenuItemClick,
                shouldTriggerClickOnParents: shouldTriggerClickOnParents,
                rtl: rtl,
                level: level + 1,
                sidemenuComponent: sidemenuComponent
              });
            })}
          </div>
        }
      </div>
    );
  }
}

Item.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  activeState: PropTypes.object,
  level: PropTypes.number,
  icon: PropTypes.string,
  rtl: PropTypes.bool,
  onMenuItemClick: PropTypes.func,
  handleComponentClick: PropTypes.func,
  renderMenuItemContent: PropTypes.func,
  divider: PropTypes.bool,
};
