"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// Random for keys

var getRandom = function getRandom() {
  return String(Math.random()).substr(2);
};

exports.getRandom = getRandom;

var SideMenu = (function (_Component) {
  _inherits(SideMenu, _Component);

  function SideMenu(props, defaultProps) {
    _classCallCheck(this, SideMenu);

    _get(Object.getPrototypeOf(SideMenu.prototype), "constructor", this).call(this, props, defaultProps);
    this.state = { items: [], componentStateTree: [] };
  }

  //
  // methods for COMPONENT structure
  //

  _createClass(SideMenu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var items = nextProps.items;

      if (items) {
        this.setState({ itemTree: this.buildTree(items, null) });
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.children) {
        this.setState({
          componentStateTree: this.buildComponentStateTree(this.props.children, null)
        });
      }
    }
  }, {
    key: "buildComponentStateTree",
    value: function buildComponentStateTree(children, parent) {
      var _this = this;

      var activeItem = this.props.activeItem;

      return _react2["default"].Children.map(children, function (child) {
        var newChild = {};
        var subTree = [];

        newChild.active = false;
        newChild.parent = parent;

        if (activeItem === child.props.value) {
          _this.activateParentsComponentTree(newChild);
        }

        if (child.props.children) {
          subTree = _this.buildComponentStateTree(child.props.children, newChild);
        }
        newChild.children = subTree;

        return newChild;
      });
    }
  }, {
    key: "handleComponentClick",
    value: function handleComponentClick(item) {
      var collapse = this.props.collapse;
      var componentStateTree = this.state.componentStateTree;

      var activeBefore = item.active;

      // collapse
      if (collapse) {
        this.deactivateComponentTree(componentStateTree);
      }
      this.activateParentsComponentTree(item, activeBefore);
      this.setState({ componentStateTree: componentStateTree });
    }
  }, {
    key: "activateParentsComponentTree",
    value: function activateParentsComponentTree(item, activeBefore) {
      if (item) {
        item.active = !activeBefore;
        this.activateParentsComponentTree(item.parent);
      }
    }
  }, {
    key: "deactivateComponentTree",
    value: function deactivateComponentTree(componentStateTree) {
      var _this2 = this;

      return componentStateTree.map(function (child) {
        child.active = false;
        if (child.children) {
          child.children = _this2.deactivateComponentTree(child.children);
        }

        return child;
      });
    }

    //
    // methods for JSON structure
    //

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var items = this.props.items;

      if (items) {
        this.setState({ itemTree: this.buildTree(items, null) });
      }
    }
  }, {
    key: "buildTree",
    value: function buildTree(children, parent) {
      var _this3 = this;

      var activeItem = this.props.activeItem;

      return children.map(function (child) {
        var newChild = _extends({}, child);
        var subTree = [];

        newChild.parent = parent;
        newChild.active = false;

        if (newChild.value === activeItem) {
          newChild.active = true;
          _this3.activeParentPath(newChild);
        }

        if (child.children) {
          subTree = _this3.buildTree(child.children, newChild);
        }
        newChild.children = subTree;

        return newChild;
      });
    }
  }, {
    key: "deactivateTree",
    value: function deactivateTree(itemTree) {
      var _this4 = this;

      itemTree.forEach(function (item) {
        item.active = false;
        if (item.children) {
          _this4.deactivateTree(item.children);
        }
      });
    }
  }, {
    key: "activeParentPath",
    value: function activeParentPath(item) {
      var curItem = item;
      while (curItem !== null) {
        curItem.active = true;
        curItem = curItem.parent;
      }
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(item) {
      var itemTree = this.state.itemTree;
      var _props = this.props;
      var onMenuItemClick = _props.onMenuItemClick;
      var collapse = _props.collapse;
      var shouldTriggerClickOnParents = _props.shouldTriggerClickOnParents;

      var self = this;
      return function (e) {
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
              window.location.href = "#" + item.value;
            }
          }
      };
    }
  }, {
    key: "renderChevron",
    value: function renderChevron(item, rtl) {
      if (item.children && item.children.length > 0) {
        if (item.active) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-down" });
        } else if (rtl) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-right" });
        }
        return _react2["default"].createElement("i", { className: "fa fa-chevron-left" });
      }
      return null;
    }
  }, {
    key: "handleRenderMenuItemContent",
    value: function handleRenderMenuItemContent(item) {
      var _props2 = this.props;
      var renderMenuItemContent = _props2.renderMenuItemContent;
      var rtl = _props2.rtl;

      if (renderMenuItemContent) {
        return renderMenuItemContent(item);
      }
      return _react2["default"].createElement(
        "span",
        null,
        item.icon && _react2["default"].createElement("i", { className: "fa " + item.icon + " item-icon" }),
        _react2["default"].createElement(
          "span",
          { className: "item-label" },
          " ",
          item.label,
          " "
        ),
        this.renderChevron(item, rtl)
      );
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, level) {
      var _this5 = this;

      if (item.divider) {
        return _react2["default"].createElement(
          "div",
          { key: "" + item.value + getRandom(), className: "divider divider-level-" + level },
          item.label
        );
      }
      return _react2["default"].createElement(
        "div",
        {
          key: "" + item.value + getRandom(),
          className: "item item-level-" + level + " " + (item.active ? 'active' : '') },
        _react2["default"].createElement(
          "div",
          {
            className: "item-title",
            onClick: this.onItemClick(item) },
          this.handleRenderMenuItemContent(item)
        ),
        _react2["default"].createElement(
          "div",
          { className: "children " + (item.active ? 'active' : 'inactive') },
          item.children && item.children.map(function (child) {
            return _this5.renderItem(child, level + 1);
          })
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _state = this.state;
      var itemTree = _state.itemTree;
      var componentStateTree = _state.componentStateTree;
      var _props3 = this.props;
      var theme = _props3.theme;
      var onMenuItemClick = _props3.onMenuItemClick;
      var rtl = _props3.rtl;
      var renderMenuItemContent = _props3.renderMenuItemContent;
      var shouldTriggerClickOnParents = _props3.shouldTriggerClickOnParents;

      if (!this.props.children) {
        // sidemenu constructed from json
        return _react2["default"].createElement(
          "div",
          { className: "Side-menu Side-menu-" + theme + " " + (rtl ? 'rtl' : '') + " children active" },
          itemTree && itemTree.map(function (item) {
            return _this6.renderItem(item, 1);
          })
        );
      }
      // sidemenu constructed with react components
      return _react2["default"].createElement(
        "div",
        { className: "Side-menu  Side-menu-" + theme + " " + (rtl ? 'rtl' : '') + " children active" },
        _react2["default"].Children.map(this.props.children, function (child, index) {
          return _react2["default"].cloneElement(child, {
            activeState: componentStateTree[index],
            handleComponentClick: _this6.handleComponentClick.bind(_this6),
            renderMenuItemContent: renderMenuItemContent,
            onMenuItemClick: onMenuItemClick,
            shouldTriggerClickOnParents: shouldTriggerClickOnParents,
            rtl: rtl,
            level: 1
          });
        })
      );
    }
  }]);

  return SideMenu;
})(_react.Component);

exports.SideMenu = SideMenu;

SideMenu.propTypes = {
  items: _react.PropTypes.array,
  onMenuItemClick: _react.PropTypes.func,
  renderMenuItemContent: _react.PropTypes.func,
  theme: _react.PropTypes.string,
  collapse: _react.PropTypes.bool,
  rtl: _react.PropTypes.bool,
  activeItem: _react.PropTypes.string
};

SideMenu.defaultProps = {
  collapse: true,
  rtl: false,
  theme: 'default'
};

var Item = (function (_Component2) {
  _inherits(Item, _Component2);

  function Item() {
    _classCallCheck(this, Item);

    _get(Object.getPrototypeOf(Item.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Item, [{
    key: "onItemClick",
    value: function onItemClick() {
      this.props.handleComponentClick(this.props.activeState);
      var _props4 = this.props;
      var onMenuItemClick = _props4.onMenuItemClick;
      var children = _props4.children;
      var value = _props4.value;
      var shouldTriggerClickOnParents = _props4.shouldTriggerClickOnParents;
      var onClick = _props4.onClick;
      var extras = _props4.extras;

      if (onClick) {
        onClick(value);
      } else if (!children || children.length === 0 || shouldTriggerClickOnParents) {
        if (onMenuItemClick) {
          onMenuItemClick(value, extras);
        } else {
          window.location.href = "#" + value;
        }
      }
    }
  }, {
    key: "renderChevron",
    value: function renderChevron(children, activeState, rtl) {
      if (children) {
        if (activeState.active) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-down" });
        } else if (rtl) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-right" });
        }
        return _react2["default"].createElement("i", { className: "fa fa-chevron-left" });
      }
      return null;
    }
  }, {
    key: "handleRenderMenuItemContent",
    value: function handleRenderMenuItemContent() {
      var _props5 = this.props;
      var renderMenuItemContent = _props5.renderMenuItemContent;
      var children = _props5.children;
      var value = _props5.value;
      var label = _props5.label;
      var icon = _props5.icon;
      var activeState = _props5.activeState;
      var rtl = _props5.rtl;

      if (renderMenuItemContent) {
        return renderMenuItemContent({ icon: icon, value: value, label: label });
      }
      return _react2["default"].createElement(
        "span",
        null,
        icon && _react2["default"].createElement("i", { className: "fa " + icon + " item-icon" }),
        _react2["default"].createElement(
          "span",
          { className: "item-label" },
          " ",
          label,
          " "
        ),
        this.renderChevron(children, activeState, rtl)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _props6 = this.props;
      var label = _props6.label;
      var activeState = _props6.activeState;
      var level = _props6.level;
      var onMenuItemClick = _props6.onMenuItemClick;
      var divider = _props6.divider;
      var children = _props6.children;
      var rtl = _props6.rtl;
      var renderMenuItemContent = _props6.renderMenuItemContent;
      var shouldTriggerClickOnParents = _props6.shouldTriggerClickOnParents;

      if (divider) {
        return _react2["default"].createElement(
          "div",
          { className: "divider divider-level-" + level },
          label,
          " "
        );
      }
      return _react2["default"].createElement(
        "div",
        { className: "item item-level-" + level + " " + (activeState.active ? 'active' : '') },
        _react2["default"].createElement(
          "div",
          { className: "item-title", onClick: this.onItemClick.bind(this) },
          this.handleRenderMenuItemContent()
        ),
        children && _react2["default"].createElement(
          "div",
          { className: "children " + (activeState.active ? 'active' : 'inactive') },
          _react2["default"].Children.map(children, function (child, index) {
            return _react2["default"].cloneElement(child, {
              handleComponentClick: _this7.props.handleComponentClick,
              activeState: activeState.children[index],
              renderMenuItemContent: renderMenuItemContent,
              onMenuItemClick: onMenuItemClick,
              shouldTriggerClickOnParents: shouldTriggerClickOnParents,
              rtl: rtl,
              level: level + 1
            });
          })
        )
      );
    }
  }]);

  return Item;
})(_react.Component);

exports.Item = Item;

Item.propTypes = {
  label: _react.PropTypes.string,
  value: _react.PropTypes.string,
  activeState: _react.PropTypes.object,
  level: _react.PropTypes.number,
  icon: _react.PropTypes.string,
  rtl: _react.PropTypes.bool,
  onMenuItemClick: _react.PropTypes.func,
  handleComponentClick: _react.PropTypes.func,
  renderMenuItemContent: _react.PropTypes.func,
  divider: _react.PropTypes.bool,
  extras: _react.PropTypes.any
};
/* render a simple label */ /* render children */ /* render icon if provided*/ /* render a simple label*/