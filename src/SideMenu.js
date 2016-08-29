import React, {Component, PropTypes} from 'react';

export class SideMenu extends Component {

  propTypes : {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {items: [], componentStateTree: []};
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

    if (items) {
      console.log(this.buildTree(items, null));
      this.setState({itemTree: this.buildTree(items, null)});
      console.log(this.state);
    }
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

  renderItem(item, level) {
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
        <div className={`children ${item.active ? 'active' : 'inactive'}`} style={{paddingLeft: `${level * 20}px`}}>
          {item.children && item.children.map((child) =>
            this.renderItem(child, level + 1)
          )}
        </div>
      </div>
    );
  }

  render() {
    const {itemTree, componentStateTree} = this.state;

    if (!this.props.children) {
      // sidemenu constructed from json
      return (
        <div className="Side-menu">
          {itemTree && itemTree.map((item) =>
            this.renderItem(item, 1)
          )}
        </div>
      );
    } else {
      // sidemenu constructed with react components
      return (
        <div className="Side-menu">
          { React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, {
                activeState: componentStateTree[index],
                handleComponentClick: this.handleComponentClick.bind(this)
              })
          })}
        </div>
      )
    }
  }

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
    const {componentStateTree} = this.state;
    this.deactivateComponentTree(componentStateTree);
    this.activateParentsComponentTree(item);
    this.setState({componentStateTree: componentStateTree});

  }

  activateParentsComponentTree(item) {
    if (item) {
      item.active = true;
      if (item.parent) {
        this.activateParentsComponentTree(item.parent);
      }
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
}

export class Item extends Component {

  propTypes : {
    label: PropTypes.string,
    value: PropTypes.string
  }

  onItemClick() {
    this.props.handleComponentClick(this.props.activeState);
  }

  render() {
    const {label, activeState} = this.props;
    if (this.props.children) {
      return (
        <div className="parent">
          <span onClick={this.onItemClick.bind(this)}>{label}</span>
          <div className={`children ${activeState.active ? 'active' : 'inactive'}`} style={{paddingLeft: `${20}px`}}>
            { React.Children.map(this.props.children, (child, index) => {
                return React.cloneElement(child, {
                  handleComponentClick: this.props.handleComponentClick,
                  activeState: activeState.children[index]
                })
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="child" onClick={this.onItemClick.bind(this)}>
          <span>{label}</span>
        </div>
      )
    }

  }

}
