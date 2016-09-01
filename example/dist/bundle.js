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
        this.setState({ componentStateTree: this.buildComponentStateTree(this.props.children, null) });
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

        //handle what happens if the item is a leaf node
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
        } else {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-left" });
        }
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
      } else {
        return _react2["default"].createElement(
          "span",
          null,
          item.icon && _react2["default"].createElement(
            "i",
            { className: "fa " + item.icon + " item-icon" },
            " "
          ),
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
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, level) {
      var _this5 = this;

      var onMenuItemClick = this.props.onMenuItemClick;

      if (item.divider) {
        return _react2["default"].createElement(
          "div",
          { key: item.value, className: "divider divider-level-" + level },
          item.label,
          " "
        );
      } else {
        return _react2["default"].createElement(
          "div",
          {
            key: item.value,
            className: "item item-level-" + level + " " + (item.active ? 'active' : '')
          },
          _react2["default"].createElement(
            "div",
            { className: "item-title",
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
      } else {
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
    }
  }]);

  return SideMenu;
})(_react.Component);

exports.SideMenu = SideMenu;

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
        } else {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-left" });
        }
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
      } else {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _props6 = this.props;
      var label = _props6.label;
      var activeState = _props6.activeState;
      var level = _props6.level;
      var icon = _props6.icon;
      var onMenuItemClick = _props6.onMenuItemClick;
      var divider = _props6.divider;
      var value = _props6.value;
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
      } else {
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
    }
  }]);

  return Item;
})(_react.Component);

exports.Item = Item;
/* render a simple label */ /* render children */ /* render icon if provided*/ /* render a simple label*/

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9rZm9ydHVuYS9EZXNrdG9wL3Byb2plY3RzL3JlYWN0L3JlYWN0LXNpZGVtZW51L3NyYy9TaWRlTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNBMEMsT0FBTzs7OztJQUVwQyxRQUFRO1lBQVIsUUFBUTs7QUFXUixXQVhBLFFBQVEsQ0FXUCxLQUFLLEVBQUUsWUFBWSxFQUFFOzBCQVh0QixRQUFROztBQVlsQiwrQkFaVSxRQUFRLDZDQVlaLEtBQUssRUFBRSxZQUFZLEVBQUU7QUFDM0IsUUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFDLENBQUM7R0FDakQ7Ozs7OztlQWRVLFFBQVE7O1dBb0JELDhCQUFHO0FBQ25CLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdkIsWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7T0FDOUY7S0FDRjs7O1dBRXNCLGlDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7OztBQUN4QyxhQUFPLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzdDLFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtBQUNqQixZQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsWUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUN4QixpQkFBTyxHQUFHLE1BQUssdUJBQXVCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEU7QUFDRCxnQkFBUSxD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QixvQ0FBb0IsRUFBRSxPQUFLLEtBQUssQ0FBQyxvQkFBb0I7QUFDckQsMkJBQVcsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN4QyxxQ0FBcUIsRUFBRSxxQkFBcUI7QUFDNUMsK0JBQWUsRUFBRSxlQUFlO0FBQ2hDLG1CQUFHLEVBQUUsR0FBRztBQUNSLHFCQUFLLEVBQUUsS0FBSyxHQUFHLENBQUM7ZUFDakIsQ0FBQyxDQUFBO2FBQ0wsQ0FBQztXQUNFO1NBQ0YsQ0FDUDtPQUNGO0tBRUY7OztTQWhHVSxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTaWRlTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBvbk1lbnVJdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1lbnVJdGVtQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sbGFwc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHJ0bDogUHJvcFR5cGVzLmJvb2xcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzLCBkZWZhdWx0UHJvcHMpIHtcbiAgIHN1cGVyKHByb3BzLCBkZWZhdWx0UHJvcHMpO1xuICAgdGhpcy5zdGF0ZSA9IHtpdGVtczogW10sIGNvbXBvbmVudFN0YXRlVHJlZTogW119O1xuICB9XG5cbiAgLy9cbiAgLy8gbWV0aG9kcyBmb3IgQ09NUE9ORU5UIHN0cnVjdHVyZVxuICAvL1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50U3RhdGVUcmVlOiB0aGlzLmJ1aWxkQ29tcG9uZW50U3RhdGVUcmVlKHRoaXMucHJvcHMuY2hpbGRyZW4sIG51bGwpfSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRDb21wb25lbnRTdGF0ZVRyZWUoY2hpbGRyZW4sIHBhcmVudCkge1xuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgbGV0IG5ld0NoaWxkID0ge31cbiAgICAgIGxldCBzdWJUcmVlID0gW107XG4gICAgICBpZiAoY2hpbGQucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgICAgc3ViVHJlZSA9IHRoaXMuYnVpbGRDb21wb25lbnRTdGF0ZVRyZWUoY2hpbGQucHJvcHMuY2hpbGRyZW4sIG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICAgIG5ld0NoaWxkLmNoaWxkcmVuID0gc3ViVHJlZTtcbiAgICAgIG5ld0NoaWxkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgbmV3Q2hpbGQucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICByZXR1cm4gbmV3Q2hpbGQ7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDb21wb25lbnRDbGljayhpdGVtKSB7XG4gICAgY29uc3Qge2NvbGxhcHNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbXBvbmVudFN0YXRlVHJlZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGFjdGl2ZUJlZm9yZSA9IGl0ZW0uYWN0aXZlO1xuXG4gICAgLy8gY29sbGFwc2VcbiAgICBpZiAoY29sbGFwc2UpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZUNvbXBvbmVudFRyZWUoY29tcG9uZW50U3RhdGVUcmVlKTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmF0ZVBhcmVudHNDb21wb25lbnRUcmVlKGl0ZW0sIGFjdGl2ZUJlZm9yZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50U3RhdGVUcmVlOiBjb21wb25lbnRTdGF0ZVRyZWV9KTtcbiAgfVxuXG4gIGFjdGl2YXRlUGFyZW50c0NvbXBvbmVudFRyZWUoaXRlbSwgYWN0aXZlQmVmb3JlKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gIWFjdGl2ZUJlZm9yZTtcbiAgICAgIHRoaXMuYWN0aXZhdGVQYXJlbnRzQ29tcG9uZW50VHJlZShpdGVtLnBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgZGVhY3RpdmF0ZUNvbXBvbmVudFRyZWUoY29tcG9uZW50U3RhdGVUcmVlKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudFN0YXRlVHJlZS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIGlmIChjaGlsZC5jaGlsZHJlbikge1xuICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IHRoaXMuZGVhY3RpdmF0ZUNvbXBvbmVudFRyZWUoY2hpbGQuY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBtZXRob2RzIGZvciBKU09OIHN0cnVjdHVyZVxuICAvL1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtpdGVtc30gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpdGVtVHJlZTogdGhpcy5idWlsZFRyZWUoaXRlbXMsIG51bGwpfSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRUcmVlKGNoaWxkcmVuLCBwYXJlbnQpIHtcbiAgICByZXR1cm4gY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xuICAgICAgbGV0IG5ld0NoaWxkID0gey4uLmNoaWxkfVxuICAgICAgbGV0IHN1YlRyZWUgPSBbXTtcbiAgICAgIGlmIChjaGlsZC5jaGlsZHJlbikge1xuICAgICAgICBzdWJUcmVlID0gdGhpcy5idWlsZFRyZWUoY2hpbGQuY2hpbGRyZW4sIG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICAgIG5ld0NoaWxkLmNoaWxkcmVuID0gc3ViVHJlZTtcbiAgICAgIG5ld0NoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIG5ld0NoaWxkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIG5ld0NoaWxkO1xuICAgIH0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZVRyZWUoaXRlbVRyZWUpIHtcbiAgICBpdGVtVHJlZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlVHJlZShpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2ZVBhcmVudFBhdGgoaXRlbSkge1xuICAgIGxldCBjdXJJdGVtID0gaXRlbTtcbiAgICB3aGlsZSAoY3VySXRlbSAhPT0gbnVsbCkge1xuICAgICAgY3VySXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY3VySXRlbSA9IGN1ckl0ZW0ucGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIG9uSXRlbUNsaWNrIChpdGVtKSB7XG4gICAgY29uc3Qge2l0ZW1UcmVlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge29uTWVudUl0ZW1DbGljaywgY29sbGFwc2V9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLm5hdGl2ZUV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAvLyBoYW5kbGUgVUkgY2hhbmdlc1xuICAgICAgaWYgKCFpdGVtLmFjdGl2ZSkge1xuICAgICAgICAvLyBpZiBtZW51IGlzIGluIGNvbGxhcHNlIG1vZGUsIGNsb3NlIGFsbCBpdGVtc1xuICAgICAgICBpZiAoY29sbGFwc2UpIHtcbiAgICAgICAgICBzZWxmLmRlYWN0aXZhdGVUcmVlKGl0ZW1UcmVlKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNlbGYuYWN0aXZlUGFyZW50UGF0aChpdGVtKTtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7aXRlbVRyZWU6IGl0ZW1UcmVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyBpZiBtZW51IGlzIGluIGNvbGxhcHNlIG1vZGUsIGNsb3NlIG9ubHlcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICBzZWxmLmRlYWN0aXZhdGVUcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgIHNlbGYuYWN0aXZlUGFyZW50UGF0aChpdGVtLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7aXRlbVRyZWU6IGl0ZW1UcmVlfSk7XG4gICAgICB9XG5cbiAgICAgIC8vaGFuZGxlIHdoYXQgaGFwcGVucyBpZiB0aGUgaXRlbSBpcyBhIGxlYWYgbm9kZVxuICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChvbk1lbnVJdGVtQ2xpY2spIHtcbiAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2soaXRlbS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7aXRlbS52YWx1ZX1gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ2hldnJvbiAoaXRlbSwgcnRsKSB7XG4gICAgaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+KTtcbiAgICAgIH0gZWxzZSBpZiAocnRsKSB7XG4gICAgICAgIHJldHVybiAoPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBoYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQgKGl0ZW0pIHtcbiAgICBjb25zdCB7cmVuZGVyTWVudUl0ZW1Db250ZW50LCBydGx9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAocmVuZGVyTWVudUl0ZW1Db250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTWVudUl0ZW1Db250ZW50KGl0ZW0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHtpdGVtLmljb24gJiZcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhICR7aXRlbS5pY29ufSBpdGVtLWljb25gfT4gPC9pPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7LyogcmVuZGVyIGEgc2ltcGxlIGxhYmVsICovfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIml0ZW0tbGFiZWxcIj4ge2l0ZW0ubGFiZWx9IDwvc3Bhbj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDaGV2cm9uKGl0ZW0sIHJ0bCl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVySXRlbShpdGVtLCBsZXZlbCkge1xuICAgIGNvbnN0IHtvbk1lbnVJdGVtQ2xpY2t9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpdGVtLmRpdmlkZXIpIHtcbiAgICAgIHJldHVybiAoPGRpdiBrZXk9e2l0ZW0udmFsdWV9IGNsYXNzTmFtZT17YGRpdmlkZXIgZGl2aWRlci1sZXZlbC0ke2xldmVsfWB9PntpdGVtLmxhYmVsfSA8L2Rpdj4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoPGRpdlxuICAgICAgICBrZXk9e2l0ZW0udmFsdWV9XG4gICAgICAgIGNsYXNzTmFtZT17YGl0ZW0gaXRlbS1sZXZlbC0ke2xldmVsfSAke2l0ZW0uYWN0aXZlID8gJ2FjdGl2ZSc6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BpdGVtLXRpdGxlYH1cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkl0ZW1DbGljayhpdGVtKX0+XG4gICAgICAgICAge3RoaXMuaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50KGl0ZW0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIHJlbmRlciBjaGlsZHJlbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjaGlsZHJlbiAke2l0ZW0uYWN0aXZlID8gJ2FjdGl2ZScgOiAnaW5hY3RpdmUnfWB9PlxuICAgICAgICAgIHtpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubWFwKChjaGlsZCkgPT5cbiAgICAgICAgICAgIHRoaXMucmVuZGVySXRlbShjaGlsZCwgbGV2ZWwgKyAxKVxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2l0ZW1UcmVlLCBjb21wb25lbnRTdGF0ZVRyZWV9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7dGhlbWUsIG9uTWVudUl0ZW1DbGljaywgcnRsLCByZW5kZXJNZW51SXRlbUNvbnRlbnR9ID0gdGhpcy5wcm9wcztcblxuXG4gICAgaWYgKCF0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICAvLyBzaWRlbWVudSBjb25zdHJ1Y3RlZCBmcm9tIGpzb25cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgU2lkZS1tZW51IFNpZGUtbWVudS0ke3RoZW1lfSAke3J0bCA/ICdydGwnIDogJyd9IGNoaWxkcmVuIGFjdGl2ZWB9PlxuICAgICAgICAgIHtpdGVtVHJlZSAmJiBpdGVtVHJlZS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICB0aGlzLnJlbmRlckl0ZW0oaXRlbSwgMSlcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNpZGVtZW51IGNvbnN0cnVjdGVkIHdpdGggcmVhY3QgY29tcG9uZW50c1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BTaWRlLW1lbnUgIFNpZGUtbWVudS0ke3RoZW1lfSAke3J0bCA/ICdydGwnIDogJyd9IGNoaWxkcmVuIGFjdGl2ZWB9PlxuICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVN0YXRlOiBjb21wb25lbnRTdGF0ZVRyZWVbaW5kZXhdLFxuICAgICAgICAgICAgICAgIGhhbmRsZUNvbXBvbmVudENsaWNrOiB0aGlzLmhhbmRsZUNvbXBvbmVudENsaWNrLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50OiByZW5kZXJNZW51SXRlbUNvbnRlbnQsXG4gICAgICAgICAgICAgICAgb25NZW51SXRlbUNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgICAgICAgICAgICAgcnRsOiBydGwsXG4gICAgICAgICAgICAgICAgbGV2ZWw6IDFcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG59XG5cblNpZGVNZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29sbGFwc2U6IHRydWUsXG4gIHJ0bDogZmFsc2UsXG4gIHRoZW1lOiAnZGVmYXVsdCdcbn1cblxuZXhwb3J0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHByb3BUeXBlcyA6IHtcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVTdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsZXZlbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRldmlkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHJ0bDogUHJvcFR5cGVzLmJvb2xcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQ29tcG9uZW50Q2xpY2sodGhpcy5wcm9wcy5hY3RpdmVTdGF0ZSk7XG4gICAgY29uc3Qge29uTWVudUl0ZW1DbGljaywgY2hpbGRyZW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjaGlsZHJlbiB8fCBjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChvbk1lbnVJdGVtQ2xpY2spIHtcbiAgICAgICAgb25NZW51SXRlbUNsaWNrKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCMke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ2hldnJvbiAoY2hpbGRyZW4sIGFjdGl2ZVN0YXRlLCBydGwpIHtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGlmIChhY3RpdmVTdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+KTtcbiAgICAgIH0gZWxzZSBpZiAocnRsKSB7XG4gICAgICAgIHJldHVybiAoPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBoYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHtyZW5kZXJNZW51SXRlbUNvbnRlbnQsIGNoaWxkcmVuLCB2YWx1ZSwgbGFiZWwsIGljb24sIGFjdGl2ZVN0YXRlLCBydGx9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAocmVuZGVyTWVudUl0ZW1Db250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTWVudUl0ZW1Db250ZW50KHtpY29uOiBpY29uLCB2YWx1ZTogdmFsdWUsIGxhYmVsOiBsYWJlbH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHsvKiByZW5kZXIgaWNvbiBpZiBwcm92aWRlZCovfVxuICAgICAgICAgIHtpY29uICYmXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9e2BmYSAke2ljb259IGl0ZW0taWNvbmB9PjwvaT5cbiAgICAgICAgICB9XG4gICAgICAgICAgey8qIHJlbmRlciBhIHNpbXBsZSBsYWJlbCovfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIml0ZW0tbGFiZWxcIj4ge2xhYmVsfSA8L3NwYW4+XG4gICAgICAgICAgeyB0aGlzLnJlbmRlckNoZXZyb24oY2hpbGRyZW4sIGFjdGl2ZVN0YXRlLCBydGwpIH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2xhYmVsLFxuICAgICAgYWN0aXZlU3RhdGUsXG4gICAgICBsZXZlbCxcbiAgICAgIGljb24sXG4gICAgICBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgICBkaXZpZGVyLFxuICAgICAgdmFsdWUsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIHJ0bCxcbiAgICAgIHJlbmRlck1lbnVJdGVtQ29udGVudH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRpdmlkZXIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZGl2aWRlciBkaXZpZGVyLWxldmVsLSR7bGV2ZWx9YH0+e2xhYmVsfSA8L2Rpdj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BpdGVtIGl0ZW0tbGV2ZWwtJHtsZXZlbH0gJHthY3RpdmVTdGF0ZS5hY3RpdmUgPyAnYWN0aXZlJzogJyd9YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BpdGVtLXRpdGxlYH0gb25DbGljaz17dGhpcy5vbkl0ZW1DbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgIHt0aGlzLmhhbmRsZVJlbmRlck1lbnVJdGVtQ29udGVudCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtjaGlsZHJlbiAmJlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2hpbGRyZW4gJHthY3RpdmVTdGF0ZS5hY3RpdmUgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSd9YH0+XG4gICAgICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICAgIGhhbmRsZUNvbXBvbmVudENsaWNrOiB0aGlzLnByb3BzLmhhbmRsZUNvbXBvbmVudENsaWNrLFxuICAgICAgICAgICAgICAgICAgYWN0aXZlU3RhdGU6IGFjdGl2ZVN0YXRlLmNoaWxkcmVuW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgIHJlbmRlck1lbnVJdGVtQ29udGVudDogcmVuZGVyTWVudUl0ZW1Db250ZW50LFxuICAgICAgICAgICAgICAgICAgb25NZW51SXRlbUNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgICAgICAgICAgICAgICBydGw6IHJ0bCxcbiAgICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCArIDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=
