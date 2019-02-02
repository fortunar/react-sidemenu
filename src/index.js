// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import type { Node as React$Node } from 'react'

// types
type JSONDivider = {
  divider: true,
  label: string,
  value: string
}

type JSONItem = {
  label: string,
  value: string,
  icon?: string,
  children?: Array<JSONItem | JSONDivider>,
  extras?: any
}

type JSONStateTreeItem = {
  parent: ?JSONStateTreeItem,
  active: ?boolean,
  value: string,
  children: ?Array<JSONStateTreeItem>,
  onClick: (any) => mixed,
  extras: any,
  icon: ?string,
  label: ?string,
  divider: ?boolean
}

type Props = {
  items?: Array<JSONItem | JSONDivider>,
  onMenuItemClick?: (value: string, extras: any) => void,
  renderMenuItemContent?: ({ icon: ?string, value: ?string, label: ?string }) => React$Node,
  theme: string,
  collapse?: boolean,
  rtl?: boolean,
  activeItem?: string,
  children?: Array<React$Node>,
  shouldTriggerClickOnParents?: boolean,
};

type ComponentStateTreeItem = {
  parent: ?ComponentStateTreeItem,
  active: boolean,
  children: ?Array<ComponentStateTreeItem>
}

type State = {
  itemTree: ?Array<JSONStateTreeItem>,
  componentStateTree: ?Array<ComponentStateTreeItem>,
}

type PropsItem = {
  label: string,
  value: string,
  icon?: string,
  onMenuItemClick?: (value: string, extras: any) => void,
  divider?: boolean,
  extras?: any,
  children?: Array<React$Node>
}

// components
export default class SideMenu extends Component<Props, State> {
  static defaultProps = {
    collapse: true,
    rtl: false,
    theme: 'default'
  }

  static propTypes = {
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    renderMenuItemContent: PropTypes.func,
    theme: PropTypes.string,
    collapse: PropTypes.bool,
    rtl: PropTypes.bool,
    activeItem: PropTypes.string
  }

  constructor (props: Props) {
    super(props)
    this.state = { itemTree: [], componentStateTree: [] }
  }

  componentWillMount () {
    if (this.props.children) {
      this.setState({
        componentStateTree: this.buildComponentStateTree(this.props.children, null)
      })
    }
  }

  componentDidMount () {
    const { items } = this.props

    if (items) {
      this.setState({ itemTree: this.buildTree(items, null) })
    }
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (this.props.items && prevProps.items !== this.props.items) {
      this.setState({ itemTree: this.buildTree(this.props.items, null) })
    }
    // We rebuild the whole component tree if activeItem prop changes
    if (this.props.activeItem && this.props.activeItem !== prevProps.activeItem) {
      if (this.props.items) {
        this.setState({ itemTree: this.buildTree(this.props.items, null) })
      } else if (this.props.children) {
        this.setState({
          componentStateTree: this.buildComponentStateTree(this.props.children, null)
        })
      }
    }
  }

  //
  // methods for SideMenu using COMPONENT structure
  //

  buildComponentStateTree (children: Array<React$Node>, parent: ?ComponentStateTreeItem): Array<ComponentStateTreeItem> {
    const { activeItem } = this.props

    return React.Children.map(children, (child) => {
      const newChild = {}
      let subTree = []

      newChild.active = false
      newChild.parent = parent

      if (activeItem === child.props.value) {
        this.activateParentsComponentTree(newChild, false)
      }

      if (child.props.children) {
        subTree = this.buildComponentStateTree(child.props.children, newChild)
      }
      newChild.children = subTree

      return newChild
    })
  }

  handleComponentClick (item: ComponentStateTreeItem) {
    const { collapse } = this.props
    const { componentStateTree } = this.state
    const activeBefore = item.active
    if (collapse) {
      this.deactivateComponentTree(componentStateTree)
    } else {
      this.deactivateComponentTreeLeaves(componentStateTree)
    }
    this.activateParentsComponentTree(item, activeBefore)
    this.setState({ componentStateTree: componentStateTree })
  }

  activateParentsComponentTree (item: ?ComponentStateTreeItem, activeBefore: boolean) {
    if (item) {
      const isLeaf = !item.children || item.children.length === 0
      // We don't want to inacivate an active leaf item
      if (isLeaf && activeBefore) {
        item.active = true
      } else if (!activeBefore) {
        item.active = true
      }
      this.activateParentsComponentTree(item.parent, false)
    }
  }

  deactivateComponentTree (componentStateTree: ?Array<ComponentStateTreeItem>): ?Array<ComponentStateTreeItem> {
    if (!componentStateTree) {
      return null
    }
    return componentStateTree.map((child: ComponentStateTreeItem) => {
      child.active = false
      if (child.children) {
        child.children = this.deactivateComponentTree(child.children)
      }

      return child
    })
  }

  deactivateComponentTreeLeaves (componentStateTree: ?Array<ComponentStateTreeItem>): ?Array<ComponentStateTreeItem> {
    if (!componentStateTree) {
      return null
    }
    return componentStateTree.map((child: ComponentStateTreeItem) => {
      if (!child.children || child.children.length === 0) {
        child.active = false
      } else {
        child.children = this.deactivateComponentTreeLeaves(child.children)
      }
      return child
    })
  }

  //
  // methods for SideMenu using JSON structure
  //

  buildTree (children: Array<JSONItem | JSONDivider>, parent: ?JSONStateTreeItem): ?Array<JSONStateTreeItem> {
    const { activeItem } = this.props
    if (!Array.isArray(children)) {
      return null
    }
    return children.map((child: JSONItem | JSONDivider) => {
      let newChild: any = {
        ...child,
        active: false,
        parent: parent,
        children: null
      }
      let subTree = []

      if (newChild.value === activeItem) {
        newChild.active = true
        this.activeParentPath(newChild)
      }

      if (Array.isArray(child.children)) {
        //  $FlowFixMe
        subTree = this.buildTree(child.children, newChild)
      }
      newChild.children = subTree

      return newChild
    })
  }

  deactivateTree (itemTree: ?Array<JSONStateTreeItem>) {
    if (!itemTree) {
      return null
    }
    itemTree.forEach((item) => {
      item.active = false
      if (item.children) {
        this.deactivateTree(item.children)
      }
    })
  }

  deactivateTreeLeaves (itemTree: ?Array<JSONStateTreeItem>) {
    if (!itemTree) {
      return null
    }
    itemTree.forEach((item) => {
      if (!item.children) {
        item.active = false
      } else {
        this.deactivateTreeLeaves(item.children)
      }
    })
  }

  activeParentPath (item: JSONStateTreeItem) {
    let curItem: ?JSONStateTreeItem = item
    while (curItem) {
      curItem.active = true
      curItem = curItem.parent
    }
  }

  onItemClick (item: JSONStateTreeItem) {
    const { itemTree } = this.state
    const { onMenuItemClick, collapse, shouldTriggerClickOnParents } = this.props
    const self = this
    return (e: SyntheticTouchEvent<any>) => {
      if (e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      }

      const isLeaf = !item.children || item.children.length === 0
      // handle UI changes
      if (!item.active) {
        // if menu is in collapse mode, close all items
        if (collapse) {
          self.deactivateTree(itemTree)
        } else {
          self.deactivateTreeLeaves(itemTree)
        }
        item.active = true
        self.activeParentPath(item)
        self.setState({ itemTree: itemTree })
        // eslint-disable-next-line
      } 
      // we deactivate the item if it is active and does not have children
      else if (!isLeaf) {
        item.active = false
        // if menu is in collapse mode, close only
        if (item.children) {
          self.deactivateTree(item.children)
        }
        if (item.parent) {
          self.activeParentPath(item.parent)
        }
        self.setState({ itemTree: itemTree })
      }

      // check if item has an onClick method defined
      if (item.onClick) {
        item.onClick(item.value)
        // handle what happens if the item is a leaf node
      } else if (isLeaf || shouldTriggerClickOnParents) {
        if (onMenuItemClick) {
          onMenuItemClick(item.value, item.extras)
        } else {
          window.location.href = `#${item.value}`
        }
      }

      this.setState({ ...this.state })
    }
  }

  renderChevron (item: JSONStateTreeItem, rtl: ?boolean) {
    if (item.children && item.children.length > 0) {
      if (item.active) {
        return (<i className="fa fa-chevron-down" />)
      } else if (rtl) {
        return (<i className="fa fa-chevron-right" />)
      }
      return (<i className="fa fa-chevron-left" />)
    }
    return null
  }

  handleRenderMenuItemContent (item: JSONStateTreeItem): React$Node {
    const { renderMenuItemContent, rtl } = this.props
    if (renderMenuItemContent) {
      return renderMenuItemContent({
        icon: item.icon,
        value: item.value,
        label: item.label
      })
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
    )
  }

  renderItem (item: JSONStateTreeItem, level: number) {
    if (item.divider) {
      return (
        <div key={item.value} className={`divider divider-level-${level}`}>
          { item.label }
        </div>
      )
    }
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
    )
  }

  render () {
    const { itemTree, componentStateTree } = this.state
    const { theme, onMenuItemClick, rtl, renderMenuItemContent, shouldTriggerClickOnParents } = this.props
    const sidemenuComponent = this
    if (!componentStateTree || componentStateTree.length === 0) {
      // sidemenu constructed from json
      return (
        <div className={`Side-menu Side-menu-${theme} ${rtl ? 'rtl' : ''} children active`}>
          {itemTree && itemTree.map((item) =>
            this.renderItem(item, 1)
          )}
        </div>
      )
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
          })
        })}
      </div>
    )
  }
}

// Because component version of menu is built using cloning and adding some props,
// we need to silence errors related to these added props.
export class Item extends Component<PropsItem> {
  // $FlowFixMe
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    activeState: PropTypes.object,
    level: PropTypes.number,
    icon: PropTypes.string,
    rtl: PropTypes.bool,
    onMenuItemClick: PropTypes.func,
    handleComponentClick: PropTypes.func,
    renderMenuItemContent: PropTypes.func,
    divider: PropTypes.bool
  }

  onItemClick () {
    const {
      onMenuItemClick, children, value, extras,
      // $FlowFixMe
      handleComponentClick, activeState, shouldTriggerClickOnParents, onClick
    } = this.props

    const isLeaf = !children || children.length === 0
    if (onClick) {
      onClick(value)
    } else if (isLeaf || shouldTriggerClickOnParents) {
      if (onMenuItemClick) {
        onMenuItemClick(value, extras)
      } else {
        window.location.href = `#${value}`
      }
    }

    handleComponentClick(activeState)
  }

  renderChevron (children: ?Array<React$Node>, activeState: ComponentStateTreeItem, rtl: ?boolean) {
    if (children) {
      if (activeState.active) {
        return (<i className="fa fa-chevron-down" />)
      } else if (rtl) {
        return (<i className="fa fa-chevron-right" />)
      }
      return (<i className="fa fa-chevron-left" />)
    }
    return null
  }

  handleRenderMenuItemContent () {
    // $FlowFixMe
    const { renderMenuItemContent, children, value, label, icon, activeState, rtl } = this.props
    if (renderMenuItemContent) {
      return renderMenuItemContent({
        icon: icon,
        value: value,
        label: label
      })
    }
    return (
      <span>
        {/* render icon if provided */}
        {icon &&
          <i className={`fa ${icon} item-icon`} />
        }
        {/* render a simple label */}
        <span className="item-label"> {label} </span>
        { this.renderChevron(children, activeState, rtl) }
      </span>
    )
  }

  render () {
    const {
      label,
      onMenuItemClick,
      divider,
      children,
      // $FlowFixMe
      activeState, level, rtl, renderMenuItemContent, shouldTriggerClickOnParents, sidemenuComponent, handleComponentClick
    } = this.props

    if (divider) {
      return (
        <div className={`divider divider-level-${level}`}>{label} </div>
      )
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
                handleComponentClick: handleComponentClick,
                activeState: activeState.children != null ? activeState.children[index] : null,
                renderMenuItemContent: renderMenuItemContent,
                onMenuItemClick: onMenuItemClick,
                shouldTriggerClickOnParents: shouldTriggerClickOnParents,
                rtl: rtl,
                level: level + 1,
                sidemenuComponent: sidemenuComponent
              })
            })}
          </div>
        }
      </div>
    )
  }
}
