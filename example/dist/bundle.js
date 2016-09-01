require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-sidemenu":[function(require,module,exports){
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

      return _react2["default"].Children.map(children, function (child) {
        var newChild = {};
        var subTree = [];
        if (child.props.children) {
          subTree = _this.buildComponentStateTree(child.props.children, newChild);
        }
        newChild.children = subTree;
        newChild.active = false;
        newChild.parent = parent;

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

      return children.map(function (child) {
        var newChild = _extends({}, child);
        var subTree = [];
        if (child.children) {
          subTree = _this3.buildTree(child.children, newChild);
        }
        newChild.children = subTree;
        newChild.parent = parent;
        newChild.active = false;
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

        // handle what happens if the item is a leaf node
        if (!item.children || item.children.length === 0) {
          if (onMenuItemClick) {
            onMenuItemClick(item.value);
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
          { key: item.value, className: "divider divider-level-" + level },
          item.label
        );
      }
      return _react2["default"].createElement(
        "div",
        {
          key: item.value,
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
  rtl: _react.PropTypes.bool
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

      if (!children || children.length === 0) {
        if (onMenuItemClick) {
          onMenuItemClick(value);
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
  divider: _react.PropTypes.bool
};
/* render a simple label */ /* render children */ /* render icon if provided*/ /* render a simple label*/

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdXJiYW5tYXJvdnQvRG9jdW1lbnRzL1dvcmsvQmFub3N0dWRpb3MvcmVhY3Qtc2lkZW1lbnUvc3JjL1NpZGVNZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0E0QyxPQUFPOzs7O0lBRXRDLFFBQVE7WUFBUixRQUFROztBQUVSLFdBRkEsUUFBUSxDQUVQLEtBQUssRUFBRSxZQUFZLEVBQUU7MEJBRnRCLFFBQVE7O0FBR2pCLCtCQUhTLFFBQVEsNkNBR1gsS0FBSyxFQUFFLFlBQVksRUFBRTtBQUMzQixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsQ0FBQztHQUNwRDs7Ozs7O2VBTFUsUUFBUTs7V0FXRCw4QkFBRztBQUNuQixVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3ZCLFlBQUksQ0FBQyxRQUFRLENBQUM7QUFDWiw0QkFBa0IsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO1NBQzVFLENBQUMsQ0FBQztPQUNKO0tBQ0Y7OztXQUVzQixpQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFOzs7QUFDeEMsYUFBTyxtQkFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM3QyxZQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsWUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFlBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDeEIsaUJBQU8sR0FBRyxNQUFLLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3hFO0FBQ0QsZ0JBQVEsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQzVCLGdCQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUN4QixnQkFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXpCLGVBQU8sUUFBUSxDQUFDO09BQ2pCLENBQUMsQ0FBQztLQUNKOzs7V0FFbUIsOEJBQUMsSUFBSSxFQUFFO1VBQ2pCLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUF2QixRQUFRO1VBQ1Isa0JBQWtCLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBakMsa0JBQWtCOztBQUMxQixVQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7QUFHakMsVUFBSSxRQUFRLEVBQUU7QUFDWixZQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztPQUNsRDtBQUNELFVBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdEQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztLQUMzRDs7O1dBRTJCLHNDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7QUFDL0MsVUFBSSxJQUFJLEVBQUU7QUFDUixZQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsWUFBWSxDQUFDO0FBQzVCLFlBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDaEQ7S0FDRjs7O1dBRXNCLGlDQUFDLGtCQUFrQixFQUFFOzs7QUFDMUMsYUFBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDdkMsYUFBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDckIsWUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ2xCLGVBQUssQ0FBQyxRQUFRLEdBQUcsT0FBSyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7O0FBRUQsZUFBTyxLQUFLLENBQUM7T0FDZCxDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7V0FNZ0IsNkJBQUc7VUFDVixLQUFLLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBcEIsS0FBSzs7QUFFYixVQUFJLEtBQUssRUFBRTtBQUNULFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQzFEO0tBQ0Y7OztXQUVRLG1CQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7OztBQUMxQixhQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDN0IsWUFBTSxRQUFRLGdCQUFRLEtBQUssQ0FBRSxDQUFDO0FBQzlCLFlBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixZQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDbEIsaUJBQU8sR0FBRyxPQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO0FBQ0QsZ0JBQVEsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQzVCLGdCQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN6QixnQkFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDeEIsZUFBTyxRQUFRLENBQUM7T0FDakIsQ0FBQyxDQUFDO0tBQ0o7OztXQUVhLHdCQUFDLFFBQVEsRUFBRTs7O0FBQ3ZCLGNBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDekIsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsWUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2pCLGlCQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7T0FDRixDQUFDLENBQUM7S0FDSjs7O1dBRWUsMEJBQUMsSUFBSSxFQUFFO0FBQ3JCLFVBQUksT0FBTyxHQUFHLElBQUksQ0FBQztBQUNuQixhQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDdkIsZUFBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdEIsZUFBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7T0FDMUI7S0FDRjs7O1dBRVUscUJBQUMsSUFBSSxFQUFFO1VBQ1IsUUFBUSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQXZCLFFBQVE7bUJBQ3NCLElBQUksQ0FBQyxLQUFLO1VBQXhDLGVBQWUsVUFBZixlQUFlO1VBQUUsUUFBUSxVQUFSLFFBQVE7O0FBQ2pDLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixhQUFPLFVBQUMsQ0FBQyxFQUFLO0FBQ1osU0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BCLFNBQUMsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs7O0FBR3pDLFlBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztBQUVoQixjQUFJLFFBQVEsRUFBRTtBQUNaLGdCQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1dBQy9CO0FBQ0QsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsY0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLGNBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN2QyxNQUFNO0FBQ0wsY0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O0FBRXBCLGNBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNqQixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7V0FDcEM7QUFDRCxjQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixnQkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUNwQztBQUNELGNBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN2Qzs7O0FBR0QsWUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ2hELGNBQUksZUFBZSxFQUFFO0FBQ25CLDJCQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQzdCLE1BQU07QUFDTCxrQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQU8sSUFBSSxDQUFDLEtBQUssQUFBRSxDQUFDO1dBQ3pDO1NBQ0Y7T0FDRixDQUFDO0tBQ0g7OztXQUVZLHVCQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDdkIsVUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUM3QyxZQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixpQkFBUSx3Q0FBRyxTQUFTLEVBQUMsb0JBQW9CLEdBQUcsQ0FBRTtTQUMvQyxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ2QsaUJBQVEsd0NBQUcsU0FBUyxFQUFDLHFCQUFxQixHQUFHLENBQUU7U0FDaEQ7QUFDRCxlQUFRLHdDQUFHLFNBQVMsRUFBQyxvQkFBb0IsR0FBRyxDQUFFO09BQy9DO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRTBCLHFDQUFDLElBQUksRUFBRTtvQkFDTyxJQUFJLENBQUMsS0FBSztVQUF6QyxxQkFBcUIsV0FBckIscUJBQXFCO1VBQUUsR0FBRyxXQUFILEdBQUc7O0FBQ2xDLFVBQUkscUJBQXFCLEVBQUU7QUFDekIsZUFBTyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNwQztBQUNELGFBQ0U7OztRQUNHLElBQUksQ0FBQyxJQUFJLElBQ1Isd0NBQUcsU0FBUyxVQUFRLElBQUksQ0FBQyxJQUFJLGVBQWEsR0FBRztRQUcvQzs7WUFBTSxTQUFTLEVBQUMsWUFBWTs7VUFBSSxJQUFJLENBQUMsS0FBSzs7U0FBVTtRQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7T0FDMUIsQ0FDUDtLQUNIOzs7V0FFUyxvQkFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFOzs7QUFDdEIsVUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLGVBQ0U7O1lBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEFBQUMsRUFBQyxTQUFTLDZCQUEyQixLQUFLLEFBQUc7VUFDOUQsSUFBSSxDQUFDLEtBQUs7U0FDUixDQUNOO09BQ0g7QUFDRCxhQUNFOzs7QUFDRSxhQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQUFBQztBQUNoQixtQkFBUyx1QkFBcUIsS0FBSyxVQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEVBQUUsQ0FBQSxBQUFHO1FBQ3JFOzs7QUFDRSxxQkFBUyxFQUFDLFlBQVk7QUFDdEIsbUJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxBQUFDO1VBQzlCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUM7U0FDcEM7UUFFTjs7WUFBSyxTQUFTLGlCQUFjLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQSxBQUFHO1VBQy9ELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO21CQUN4QyxPQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztXQUFBLENBQ2xDO1NBQ0c7T0FDRixDQUNOO0tBQ0g7OztXQUVLLGtCQUFHOzs7bUJBQ2tDLElBQUksQ0FBQyxLQUFLO1VBQTNDLFFBQVEsVUFBUixRQUFRO1VBQUUsa0JBQWtCLFVBQWxCLGtCQUFrQjtvQkFDMkIsSUFBSSxDQUFDLEtBQUs7VUFBakUsS0FBSyxXQUFMLEtBQUs7VUFBRSxlQUFlLFdBQWYsZUFBZTtVQUFFLEdBQUcsV0FBSCxHQUFHO1VBQUUscUJBQXFCLFdBQXJCLHFCQUFxQjs7QUFHMUQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFOztBQUV4QixlQUNFOztZQUFLLFNBQVMsMkJBQXlCLEtBQUssVUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQSxxQkFBbUI7VUFDaEYsUUFBUSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO21CQUM3QixPQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1dBQUEsQ0FDekI7U0FDRyxDQUNOO09BQ0g7O0FBRUQsYUFDRTs7VUFBSyxTQUFTLDRCQUEwQixLQUFLLFVBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUEscUJBQW1CO1FBQ2hGLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFLO0FBQzFELGlCQUFPLG1CQUFNLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDL0IsdUJBQVcsRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7QUFDdEMsZ0NBQW9CLEVBQUUsT0FBSyxvQkFBb0IsQ0FBQyxJQUFJLFFBQU07QUFDMUQsaUNBQXFCLEVBQUUscUJBQXFCO0FBQzVDLDJCQUFlLEVBQUUsZUFBZTtBQUNoQyxlQUFHLEVBQUUsR0FBRztBQUNSLGlCQUFLLEVBQUUsQ0FBQztXQUNULENBQUMsQ0FBQztTQUNKLENBQUM7T0FDRSxDQUNOO0tBQ0g7OztTQTFPVSxRQUFROzs7OztBQTZPckIsUUFBUSxDQUFDLFNBQVMsR0FBRztBQUNuQixPQUFLLEVBQUUsaUJBQVUsS0FBSztBQUN0QixpQkFBZSxFQUFFLGlCQUFVLElBQUk7QUFDL0IsdUJBQXFCLEVBQUUsaUJBQVUsSUFBSTtBQUNyQyxPQUFLLEVBQUUsaUJBQVUsTUFBTTtBQUN2QixVQUFRLEVBQUUsaUJBQVUsSUFBSTtBQUN4QixLQUFHLEVBQUUsaUJBQVUsSUFBSTtDQUNwQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxZQUFZLEdBQUc7QUFDdEIsVUFBUSxFQUFFLElBQUk7QUFDZCxLQUFHLEVBQUUsS0FBSztBQUNWLE9BQUssRUFBRSxTQUFTO0NBQ2pCLENBQUM7O0lBRVcsSUFBSTtZQUFKLElBQUk7O1dBQUosSUFBSTswQkFBSixJQUFJOzsrQkFBSixJQUFJOzs7ZUFBSixJQUFJOztXQUVKLHVCQUFHO0FBQ1osVUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxLQUFLO1VBQS9DLGVBQWUsV0FBZixlQUFlO1VBQUUsUUFBUSxXQUFSLFFBQVE7VUFBRSxLQUFLLFdBQUwsS0FBSzs7QUFDeEMsVUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN0QyxZQUFJLGVBQWUsRUFBRTtBQUNuQix5QkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCLE1BQU07QUFDTCxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQU8sS0FBSyxBQUFFLENBQUM7U0FDcEM7T0FDRjtLQUNGOzs7V0FFWSx1QkFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxVQUFJLFFBQVEsRUFBRTtBQUNaLFlBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtBQUN0QixpQkFBUSx3Q0FBRyxTQUFTLEVBQUMsb0JBQW9CLEdBQUcsQ0FBRTtTQUMvQyxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ2QsaUJBQVEsd0NBQUcsU0FBUyxFQUFDLHFCQUFxQixHQUFHLENBQUU7U0FDaEQ7QUFDRCxlQUFRLHdDQUFHLFNBQVMsRUFBQyxvQkFBb0IsR0FBRyxDQUFFO09BQy9DO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRTBCLHVDQUFHO29CQUNzRCxJQUFJLENBQUMsS0FBSztVQUFwRixxQkFBcUIsV0FBckIscUJBQXFCO1VBQUUsUUFBUSxXQUFSLFFBQVE7VUFBRSxLQUFLLFdBQUwsS0FBSztVQUFFLEtBQUssV0FBTCxLQUFLO1VBQUUsSUFBSSxXQUFKLElBQUk7VUFBRSxXQUFXLFdBQVgsV0FBVztVQUFFLEdBQUcsV0FBSCxHQUFHOztBQUM3RSxVQUFJLHFCQUFxQixFQUFFO0FBQ3pCLGVBQU8scUJBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7T0FDMUU7QUFDRCxhQUNFOzs7UUFFRyxJQUFJLElBQ0gsd0NBQUcsU0FBUyxVQUFRLElBQUksZUFBYSxHQUFHO1FBRzFDOztZQUFNLFNBQVMsRUFBQyxZQUFZOztVQUFHLEtBQUs7O1NBQVM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQztPQUMzQyxDQUNQO0tBQ0g7OztXQUVLLGtCQUFHOzs7b0JBUXFCLElBQUksQ0FBQyxLQUFLO1VBUDlCLEtBQUssV0FBTCxLQUFLO1VBQ1gsV0FBVyxXQUFYLFdBQVc7VUFDWCxLQUFLLFdBQUwsS0FBSztVQUNMLGVBQWUsV0FBZixlQUFlO1VBQ2YsT0FBTyxXQUFQLE9BQU87VUFDUCxRQUFRLFdBQVIsUUFBUTtVQUNSLEdBQUcsV0FBSCxHQUFHO1VBQ0gscUJBQXFCLFdBQXJCLHFCQUFxQjs7QUFFdkIsVUFBSSxPQUFPLEVBQUU7QUFDWCxlQUNFOztZQUFLLFNBQVMsNkJBQTJCLEtBQUssQUFBRztVQUFFLEtBQUs7O1NBQVEsQ0FDaEU7T0FDSDtBQUNELGFBQ0U7O1VBQUssU0FBUyx1QkFBcUIsS0FBSyxVQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEVBQUUsQ0FBQSxBQUFHO1FBQy9FOztZQUFLLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO1VBQzlELElBQUksQ0FBQywyQkFBMkIsRUFBRTtTQUMvQjtRQUNMLFFBQVEsSUFDUDs7WUFBSyxTQUFTLGlCQUFjLFdBQVcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQSxBQUFHO1VBQ3RFLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBSztBQUM5QyxtQkFBTyxtQkFBTSxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQy9CLGtDQUFvQixFQUFFLE9BQUssS0FBSyxDQUFDLG9CQUFvQjtBQUNyRCx5QkFBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3hDLG1DQUFxQixFQUFFLHFCQUFxQjtBQUM1Qyw2QkFBZSxFQUFFLGVBQWU7QUFDaEMsaUJBQUcsRUFBRSxHQUFHO0FBQ1IsbUJBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQzthQUNqQixDQUFDLENBQUM7V0FDSixDQUFDO1NBQ0U7T0FFSixDQUNOO0tBQ0g7OztTQWhGVSxJQUFJOzs7OztBQW1GakIsSUFBSSxDQUFDLFNBQVMsR0FBRztBQUNmLE9BQUssRUFBRSxpQkFBVSxNQUFNO0FBQ3ZCLE9BQUssRUFBRSxpQkFBVSxNQUFNO0FBQ3ZCLGFBQVcsRUFBRSxpQkFBVSxNQUFNO0FBQzdCLE9BQUssRUFBRSxpQkFBVSxNQUFNO0FBQ3ZCLE1BQUksRUFBRSxpQkFBVSxNQUFNO0FBQ3RCLEtBQUcsRUFBRSxpQkFBVSxJQUFJO0FBQ25CLGlCQUFlLEVBQUUsaUJBQVUsSUFBSTtBQUMvQixzQkFBb0IsRUFBRSxpQkFBVSxJQUFJO0FBQ3BDLHVCQUFxQixFQUFFLGlCQUFVLElBQUk7QUFDckMsU0FBTyxFQUFFLGlCQUFVLElBQUk7Q0FDeEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTaWRlTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMsIGRlZmF1bHRQcm9wcykge1xuICAgIHN1cGVyKHByb3BzLCBkZWZhdWx0UHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7IGl0ZW1zOiBbXSwgY29tcG9uZW50U3RhdGVUcmVlOiBbXSB9O1xuICB9XG5cbiAgLy9cbiAgLy8gbWV0aG9kcyBmb3IgQ09NUE9ORU5UIHN0cnVjdHVyZVxuICAvL1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbXBvbmVudFN0YXRlVHJlZTogdGhpcy5idWlsZENvbXBvbmVudFN0YXRlVHJlZSh0aGlzLnByb3BzLmNoaWxkcmVuLCBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQ29tcG9uZW50U3RhdGVUcmVlKGNoaWxkcmVuLCBwYXJlbnQpIHtcbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IG5ld0NoaWxkID0ge307XG4gICAgICBsZXQgc3ViVHJlZSA9IFtdO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YlRyZWUgPSB0aGlzLmJ1aWxkQ29tcG9uZW50U3RhdGVUcmVlKGNoaWxkLnByb3BzLmNoaWxkcmVuLCBuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgICBuZXdDaGlsZC5jaGlsZHJlbiA9IHN1YlRyZWU7XG4gICAgICBuZXdDaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIG5ld0NoaWxkLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgcmV0dXJuIG5ld0NoaWxkO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ29tcG9uZW50Q2xpY2soaXRlbSkge1xuICAgIGNvbnN0IHsgY29sbGFwc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRTdGF0ZVRyZWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgYWN0aXZlQmVmb3JlID0gaXRlbS5hY3RpdmU7XG5cbiAgICAvLyBjb2xsYXBzZVxuICAgIGlmIChjb2xsYXBzZSkge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlQ29tcG9uZW50VHJlZShjb21wb25lbnRTdGF0ZVRyZWUpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2YXRlUGFyZW50c0NvbXBvbmVudFRyZWUoaXRlbSwgYWN0aXZlQmVmb3JlKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29tcG9uZW50U3RhdGVUcmVlOiBjb21wb25lbnRTdGF0ZVRyZWUgfSk7XG4gIH1cblxuICBhY3RpdmF0ZVBhcmVudHNDb21wb25lbnRUcmVlKGl0ZW0sIGFjdGl2ZUJlZm9yZSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpdGVtLmFjdGl2ZSA9ICFhY3RpdmVCZWZvcmU7XG4gICAgICB0aGlzLmFjdGl2YXRlUGFyZW50c0NvbXBvbmVudFRyZWUoaXRlbS5wYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRlYWN0aXZhdGVDb21wb25lbnRUcmVlKGNvbXBvbmVudFN0YXRlVHJlZSkge1xuICAgIHJldHVybiBjb21wb25lbnRTdGF0ZVRyZWUubWFwKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XG4gICAgICBpZiAoY2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgY2hpbGQuY2hpbGRyZW4gPSB0aGlzLmRlYWN0aXZhdGVDb21wb25lbnRUcmVlKGNoaWxkLmNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gbWV0aG9kcyBmb3IgSlNPTiBzdHJ1Y3R1cmVcbiAgLy9cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXRlbVRyZWU6IHRoaXMuYnVpbGRUcmVlKGl0ZW1zLCBudWxsKSB9KTtcbiAgICB9XG4gIH1cblxuICBidWlsZFRyZWUoY2hpbGRyZW4sIHBhcmVudCkge1xuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBuZXdDaGlsZCA9IHsgLi4uY2hpbGQgfTtcbiAgICAgIGxldCBzdWJUcmVlID0gW107XG4gICAgICBpZiAoY2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgc3ViVHJlZSA9IHRoaXMuYnVpbGRUcmVlKGNoaWxkLmNoaWxkcmVuLCBuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgICBuZXdDaGlsZC5jaGlsZHJlbiA9IHN1YlRyZWU7XG4gICAgICBuZXdDaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICBuZXdDaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJldHVybiBuZXdDaGlsZDtcbiAgICB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVUcmVlKGl0ZW1UcmVlKSB7XG4gICAgaXRlbVRyZWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmVQYXJlbnRQYXRoKGl0ZW0pIHtcbiAgICBsZXQgY3VySXRlbSA9IGl0ZW07XG4gICAgd2hpbGUgKGN1ckl0ZW0gIT09IG51bGwpIHtcbiAgICAgIGN1ckl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGN1ckl0ZW0gPSBjdXJJdGVtLnBhcmVudDtcbiAgICB9XG4gIH1cblxuICBvbkl0ZW1DbGljayhpdGVtKSB7XG4gICAgY29uc3QgeyBpdGVtVHJlZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uTWVudUl0ZW1DbGljaywgY29sbGFwc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5uYXRpdmVFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgLy8gaGFuZGxlIFVJIGNoYW5nZXNcbiAgICAgIGlmICghaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgLy8gaWYgbWVudSBpcyBpbiBjb2xsYXBzZSBtb2RlLCBjbG9zZSBhbGwgaXRlbXNcbiAgICAgICAgaWYgKGNvbGxhcHNlKSB7XG4gICAgICAgICAgc2VsZi5kZWFjdGl2YXRlVHJlZShpdGVtVHJlZSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZWxmLmFjdGl2ZVBhcmVudFBhdGgoaXRlbSk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoeyBpdGVtVHJlZTogaXRlbVRyZWUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyBpZiBtZW51IGlzIGluIGNvbGxhcHNlIG1vZGUsIGNsb3NlIG9ubHlcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICBzZWxmLmRlYWN0aXZhdGVUcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgIHNlbGYuYWN0aXZlUGFyZW50UGF0aChpdGVtLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGl0ZW1UcmVlOiBpdGVtVHJlZSB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIHdoYXQgaGFwcGVucyBpZiB0aGUgaXRlbSBpcyBhIGxlYWYgbm9kZVxuICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChvbk1lbnVJdGVtQ2xpY2spIHtcbiAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2soaXRlbS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7aXRlbS52YWx1ZX1gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlckNoZXZyb24oaXRlbSwgcnRsKSB7XG4gICAgaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWRvd25cIiAvPik7XG4gICAgICB9IGVsc2UgaWYgKHJ0bCkge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tcmlnaHRcIiAvPik7XG4gICAgICB9XG4gICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiIC8+KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBoYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQoaXRlbSkge1xuICAgIGNvbnN0IHsgcmVuZGVyTWVudUl0ZW1Db250ZW50LCBydGwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHJlbmRlck1lbnVJdGVtQ29udGVudCkge1xuICAgICAgcmV0dXJuIHJlbmRlck1lbnVJdGVtQ29udGVudChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuPlxuICAgICAgICB7aXRlbS5pY29uICYmXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPXtgZmEgJHtpdGVtLmljb259IGl0ZW0taWNvbmB9IC8+XG4gICAgICAgIH1cbiAgICAgICAgey8qIHJlbmRlciBhIHNpbXBsZSBsYWJlbCAqL31cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXRlbS1sYWJlbFwiPiB7IGl0ZW0ubGFiZWwgfSA8L3NwYW4+XG4gICAgICAgIHsgdGhpcy5yZW5kZXJDaGV2cm9uKGl0ZW0sIHJ0bCkgfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJJdGVtKGl0ZW0sIGxldmVsKSB7XG4gICAgaWYgKGl0ZW0uZGl2aWRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBrZXk9e2l0ZW0udmFsdWV9IGNsYXNzTmFtZT17YGRpdmlkZXIgZGl2aWRlci1sZXZlbC0ke2xldmVsfWB9PlxuICAgICAgICAgIHsgaXRlbS5sYWJlbCB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXtpdGVtLnZhbHVlfVxuICAgICAgICBjbGFzc05hbWU9e2BpdGVtIGl0ZW0tbGV2ZWwtJHtsZXZlbH0gJHtpdGVtLmFjdGl2ZSA/ICdhY3RpdmUnIDogJyd9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtLXRpdGxlXCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrKGl0ZW0pfT5cbiAgICAgICAgICB7IHRoaXMuaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50KGl0ZW0pIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiByZW5kZXIgY2hpbGRyZW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2hpbGRyZW4gJHtpdGVtLmFjdGl2ZSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJ31gfT5cbiAgICAgICAgICB7aXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+XG4gICAgICAgICAgICB0aGlzLnJlbmRlckl0ZW0oY2hpbGQsIGxldmVsICsgMSlcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpdGVtVHJlZSwgY29tcG9uZW50U3RhdGVUcmVlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgdGhlbWUsIG9uTWVudUl0ZW1DbGljaywgcnRsLCByZW5kZXJNZW51SXRlbUNvbnRlbnQgfSA9IHRoaXMucHJvcHM7XG5cblxuICAgIGlmICghdGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgLy8gc2lkZW1lbnUgY29uc3RydWN0ZWQgZnJvbSBqc29uXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YFNpZGUtbWVudSBTaWRlLW1lbnUtJHt0aGVtZX0gJHtydGwgPyAncnRsJyA6ICcnfSBjaGlsZHJlbiBhY3RpdmVgfT5cbiAgICAgICAgICB7aXRlbVRyZWUgJiYgaXRlbVRyZWUubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJdGVtKGl0ZW0sIDEpXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICAvLyBzaWRlbWVudSBjb25zdHJ1Y3RlZCB3aXRoIHJlYWN0IGNvbXBvbmVudHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BTaWRlLW1lbnUgIFNpZGUtbWVudS0ke3RoZW1lfSAke3J0bCA/ICdydGwnIDogJyd9IGNoaWxkcmVuIGFjdGl2ZWB9PlxuICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgYWN0aXZlU3RhdGU6IGNvbXBvbmVudFN0YXRlVHJlZVtpbmRleF0sXG4gICAgICAgICAgICBoYW5kbGVDb21wb25lbnRDbGljazogdGhpcy5oYW5kbGVDb21wb25lbnRDbGljay5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50OiByZW5kZXJNZW51SXRlbUNvbnRlbnQsXG4gICAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2s6IG9uTWVudUl0ZW1DbGljayxcbiAgICAgICAgICAgIHJ0bDogcnRsLFxuICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TaWRlTWVudS5wcm9wVHlwZXMgPSB7XG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gIG9uTWVudUl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbmRlck1lbnVJdGVtQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjb2xsYXBzZTogUHJvcFR5cGVzLmJvb2wsXG4gIHJ0bDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5TaWRlTWVudS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbGxhcHNlOiB0cnVlLFxuICBydGw6IGZhbHNlLFxuICB0aGVtZTogJ2RlZmF1bHQnLFxufTtcblxuZXhwb3J0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIG9uSXRlbUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQ29tcG9uZW50Q2xpY2sodGhpcy5wcm9wcy5hY3RpdmVTdGF0ZSk7XG4gICAgY29uc3QgeyBvbk1lbnVJdGVtQ2xpY2ssIGNoaWxkcmVuLCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNoaWxkcmVuIHx8IGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKG9uTWVudUl0ZW1DbGljaykge1xuICAgICAgICBvbk1lbnVJdGVtQ2xpY2sodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJDaGV2cm9uKGNoaWxkcmVuLCBhY3RpdmVTdGF0ZSwgcnRsKSB7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICBpZiAoYWN0aXZlU3RhdGUuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiAoPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1kb3duXCIgLz4pO1xuICAgICAgfSBlbHNlIGlmIChydGwpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgLz4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiAvPik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50KCkge1xuICAgIGNvbnN0IHsgcmVuZGVyTWVudUl0ZW1Db250ZW50LCBjaGlsZHJlbiwgdmFsdWUsIGxhYmVsLCBpY29uLCBhY3RpdmVTdGF0ZSwgcnRsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChyZW5kZXJNZW51SXRlbUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNZW51SXRlbUNvbnRlbnQoeyBpY29uOiBpY29uLCB2YWx1ZTogdmFsdWUsIGxhYmVsOiBsYWJlbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuPlxuICAgICAgICB7LyogcmVuZGVyIGljb24gaWYgcHJvdmlkZWQqL31cbiAgICAgICAge2ljb24gJiZcbiAgICAgICAgICA8aSBjbGFzc05hbWU9e2BmYSAke2ljb259IGl0ZW0taWNvbmB9IC8+XG4gICAgICAgIH1cbiAgICAgICAgey8qIHJlbmRlciBhIHNpbXBsZSBsYWJlbCovfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpdGVtLWxhYmVsXCI+IHtsYWJlbH0gPC9zcGFuPlxuICAgICAgICB7IHRoaXMucmVuZGVyQ2hldnJvbihjaGlsZHJlbiwgYWN0aXZlU3RhdGUsIHJ0bCkgfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCxcbiAgICAgIGFjdGl2ZVN0YXRlLFxuICAgICAgbGV2ZWwsXG4gICAgICBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgICBkaXZpZGVyLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBydGwsXG4gICAgICByZW5kZXJNZW51SXRlbUNvbnRlbnQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGl2aWRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BkaXZpZGVyIGRpdmlkZXItbGV2ZWwtJHtsZXZlbH1gfT57bGFiZWx9IDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaXRlbSBpdGVtLWxldmVsLSR7bGV2ZWx9ICR7YWN0aXZlU3RhdGUuYWN0aXZlID8gJ2FjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXRpdGxlXCIgb25DbGljaz17dGhpcy5vbkl0ZW1DbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICB7dGhpcy5oYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGlsZHJlbiAmJlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2hpbGRyZW4gJHthY3RpdmVTdGF0ZS5hY3RpdmUgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSd9YH0+XG4gICAgICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVDb21wb25lbnRDbGljazogdGhpcy5wcm9wcy5oYW5kbGVDb21wb25lbnRDbGljayxcbiAgICAgICAgICAgICAgICBhY3RpdmVTdGF0ZTogYWN0aXZlU3RhdGUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgIHJlbmRlck1lbnVJdGVtQ29udGVudDogcmVuZGVyTWVudUl0ZW1Db250ZW50LFxuICAgICAgICAgICAgICAgIG9uTWVudUl0ZW1DbGljazogb25NZW51SXRlbUNsaWNrLFxuICAgICAgICAgICAgICAgIHJ0bDogcnRsLFxuICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSXRlbS5wcm9wVHlwZXMgPSB7XG4gIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aXZlU3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxldmVsOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBydGw6IFByb3BUeXBlcy5ib29sLFxuICBvbk1lbnVJdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDb21wb25lbnRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbmRlck1lbnVJdGVtQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIGRpdmlkZXI6IFByb3BUeXBlcy5ib29sLFxufTtcbiJdfQ==
