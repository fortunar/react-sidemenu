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
    value: function renderChevron(item, reverse) {
      if (item.children && item.children.length > 0) {
        if (item.active) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-down" });
        } else if (reverse) {
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
      var reverse = _props2.reverse;
      var theme = _props2.theme;

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
          this.renderChevron(item, reverse)
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
      var reverse = _props3.reverse;
      var renderMenuItemContent = _props3.renderMenuItemContent;

      if (!this.props.children) {
        // sidemenu constructed from json
        return _react2["default"].createElement(
          "div",
          { className: "Side-menu " + (theme ? "Side-menu-" + theme : 'Side-menu-default') + " " + (reverse ? 'reverse' : '') + " children active" },
          itemTree && itemTree.map(function (item) {
            return _this6.renderItem(item, 1);
          })
        );
      } else {
        // sidemenu constructed with react components
        return _react2["default"].createElement(
          "div",
          { className: "Side-menu " + (theme ? "Side-menu-" + theme : 'Side-menu-default') + " " + (reverse ? 'reverse' : '') + " children active" },
          _react2["default"].Children.map(this.props.children, function (child, index) {
            return _react2["default"].cloneElement(child, {
              activeState: componentStateTree[index],
              handleComponentClick: _this6.handleComponentClick.bind(_this6),
              renderMenuItemContent: renderMenuItemContent,
              onMenuItemClick: onMenuItemClick,
              reverse: reverse,
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
  reverse: false
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
    value: function renderChevron(children, activeState, reverse) {
      if (children) {
        if (activeState.active) {
          return _react2["default"].createElement("i", { className: "fa fa-chevron-down" });
        } else if (reverse) {
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
      var theme = _props5.theme;
      var value = _props5.value;
      var label = _props5.label;
      var icon = _props5.icon;
      var activeState = _props5.activeState;
      var reverse = _props5.reverse;

      if (renderMenuItemContent) {
        return renderMenuItemContent({ theme: theme, value: value, label: label });
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
          (!theme || theme == 'default') && this.renderChevron(children, activeState, reverse)
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
      var theme = _props6.theme;
      var value = _props6.value;
      var children = _props6.children;
      var reverse = _props6.reverse;
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
                reverse: reverse,
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
/* render a simple label */ /* render fa chevrons for default theme */ /* render children */ /* render icon if provided*/ /* render a simple label*/ /* render fa chevrons for default theme */

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9rZm9ydHVuYS9EZXNrdG9wL3Byb2plY3RzL3JlYWN0L3JlYWN0LXNpZGVtZW51L3NyYy9TaWRlTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNBMEMsT0FBTzs7OztJQUVwQyxRQUFRO1lBQVIsUUFBUTs7QUFXUixXQVhBLFFBQVEsQ0FXUCxLQUFLLEVBQUUsWUFBWSxFQUFFOzBCQVh0QixRQUFROztBQVlsQiwrQkFaVSxRQUFRLDZDQVlaLEtBQUssRUFBRSxZQUFZLEVBQUU7QUFDM0IsUUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFDLENBQUM7R0FDakQ7Ozs7OztlQWRVLFFBQVE7O1dBb0JELDhCQUFHO0FBQ25CLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDdkIsWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7T0FDOUY7S0FDRjs7O1dBRXNCLGlDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7OztBQUN4QyxhQUFPLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzdDLFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtBQUNqQixZQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsWUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUN4QixpQkFBTyxHQUFHLE1BQUssdUJBQXVCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEU7QUFDRCxnQkFBUSxD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QUFNLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQSxBQUFHO1lBQ3JFLG1CQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBSztBQUM3QyxxQkFBTyxtQkFBTSxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQy9CLG9DQUFvQixFQUFFLE9BQUssS0FBSyxDQUFDLG9CQUFvQjtBQUNyRCwyQkFBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3hDLHFDQUFxQixFQUFFLHFCQUFxQjtBQUM1QywrQkFBZSxFQUFFLGVBQWU7QUFDaEMsdUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHFCQUFLLEVBQUUsS0FBSyxHQUFHLENBQUM7ZUFDakIsQ0FBQyxDQUFBO2FBQ0wsQ0FBQztXQUNFO1NBQ0YsQ0FDUDtPQUNGO0tBRUY7OztTQWxHVSxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTaWRlTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBvbk1lbnVJdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIHJlbmRlck1lbnVJdGVtQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sbGFwc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIHJldmVyc2U6IFByb3BUeXBlcy5ib29sXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcywgZGVmYXVsdFByb3BzKSB7XG4gICBzdXBlcihwcm9wcywgZGVmYXVsdFByb3BzKTtcbiAgIHRoaXMuc3RhdGUgPSB7aXRlbXM6IFtdLCBjb21wb25lbnRTdGF0ZVRyZWU6IFtdfTtcbiAgfVxuXG4gIC8vXG4gIC8vIG1ldGhvZHMgZm9yIENPTVBPTkVOVCBzdHJ1Y3R1cmVcbiAgLy9cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudFN0YXRlVHJlZTogdGhpcy5idWlsZENvbXBvbmVudFN0YXRlVHJlZSh0aGlzLnByb3BzLmNoaWxkcmVuLCBudWxsKX0pO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQ29tcG9uZW50U3RhdGVUcmVlKGNoaWxkcmVuLCBwYXJlbnQpIHtcbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgIGxldCBuZXdDaGlsZCA9IHt9XG4gICAgICBsZXQgc3ViVHJlZSA9IFtdO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YlRyZWUgPSB0aGlzLmJ1aWxkQ29tcG9uZW50U3RhdGVUcmVlKGNoaWxkLnByb3BzLmNoaWxkcmVuLCBuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgICBuZXdDaGlsZC5jaGlsZHJlbiA9IHN1YlRyZWU7XG4gICAgICBuZXdDaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIG5ld0NoaWxkLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgcmV0dXJuIG5ld0NoaWxkO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ29tcG9uZW50Q2xpY2soaXRlbSkge1xuICAgIGNvbnN0IHtjb2xsYXBzZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtjb21wb25lbnRTdGF0ZVRyZWV9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBhY3RpdmVCZWZvcmUgPSBpdGVtLmFjdGl2ZTtcblxuICAgIC8vIGNvbGxhcHNlXG4gICAgaWYgKGNvbGxhcHNlKSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGVDb21wb25lbnRUcmVlKGNvbXBvbmVudFN0YXRlVHJlZSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZhdGVQYXJlbnRzQ29tcG9uZW50VHJlZShpdGVtLCBhY3RpdmVCZWZvcmUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NvbXBvbmVudFN0YXRlVHJlZTogY29tcG9uZW50U3RhdGVUcmVlfSk7XG4gIH1cblxuICBhY3RpdmF0ZVBhcmVudHNDb21wb25lbnRUcmVlKGl0ZW0sIGFjdGl2ZUJlZm9yZSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpdGVtLmFjdGl2ZSA9ICFhY3RpdmVCZWZvcmU7XG4gICAgICB0aGlzLmFjdGl2YXRlUGFyZW50c0NvbXBvbmVudFRyZWUoaXRlbS5wYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRlYWN0aXZhdGVDb21wb25lbnRUcmVlKGNvbXBvbmVudFN0YXRlVHJlZSkge1xuICAgIHJldHVybiBjb21wb25lbnRTdGF0ZVRyZWUubWFwKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2U7XG4gICAgICBpZiAoY2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgY2hpbGQuY2hpbGRyZW4gPSB0aGlzLmRlYWN0aXZhdGVDb21wb25lbnRUcmVlKGNoaWxkLmNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gbWV0aG9kcyBmb3IgSlNPTiBzdHJ1Y3R1cmVcbiAgLy9cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7aXRlbXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbVRyZWU6IHRoaXMuYnVpbGRUcmVlKGl0ZW1zLCBudWxsKX0pO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkVHJlZShjaGlsZHJlbiwgcGFyZW50KSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcbiAgICAgIGxldCBuZXdDaGlsZCA9IHsuLi5jaGlsZH1cbiAgICAgIGxldCBzdWJUcmVlID0gW107XG4gICAgICBpZiAoY2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgc3ViVHJlZSA9IHRoaXMuYnVpbGRUcmVlKGNoaWxkLmNoaWxkcmVuLCBuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgICBuZXdDaGlsZC5jaGlsZHJlbiA9IHN1YlRyZWU7XG4gICAgICBuZXdDaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICBuZXdDaGlsZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJldHVybiBuZXdDaGlsZDtcbiAgICB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVUcmVlKGl0ZW1UcmVlKSB7XG4gICAgaXRlbVRyZWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmVQYXJlbnRQYXRoKGl0ZW0pIHtcbiAgICBsZXQgY3VySXRlbSA9IGl0ZW07XG4gICAgd2hpbGUgKGN1ckl0ZW0gIT09IG51bGwpIHtcbiAgICAgIGN1ckl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGN1ckl0ZW0gPSBjdXJJdGVtLnBhcmVudDtcbiAgICB9XG4gIH1cblxuICBvbkl0ZW1DbGljayAoaXRlbSkge1xuICAgIGNvbnN0IHtpdGVtVHJlZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtvbk1lbnVJdGVtQ2xpY2ssIGNvbGxhcHNlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5uYXRpdmVFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgLy8gaGFuZGxlIFVJIGNoYW5nZXNcbiAgICAgIGlmICghaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgLy8gaWYgbWVudSBpcyBpbiBjb2xsYXBzZSBtb2RlLCBjbG9zZSBhbGwgaXRlbXNcbiAgICAgICAgaWYgKGNvbGxhcHNlKSB7XG4gICAgICAgICAgc2VsZi5kZWFjdGl2YXRlVHJlZShpdGVtVHJlZSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZWxmLmFjdGl2ZVBhcmVudFBhdGgoaXRlbSk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe2l0ZW1UcmVlOiBpdGVtVHJlZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gaWYgbWVudSBpcyBpbiBjb2xsYXBzZSBtb2RlLCBjbG9zZSBvbmx5XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgc2VsZi5kZWFjdGl2YXRlVHJlZShpdGVtLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICBzZWxmLmFjdGl2ZVBhcmVudFBhdGgoaXRlbS5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe2l0ZW1UcmVlOiBpdGVtVHJlZX0pO1xuICAgICAgfVxuXG4gICAgICAvL2hhbmRsZSB3aGF0IGhhcHBlbnMgaWYgdGhlIGl0ZW0gaXMgYSBsZWFmIG5vZGVcbiAgICAgIGlmICghaXRlbS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAob25NZW51SXRlbUNsaWNrKSB7XG4gICAgICAgICAgb25NZW51SXRlbUNsaWNrKGl0ZW0udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCMke2l0ZW0udmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlckNoZXZyb24gKGl0ZW0sIHJldmVyc2UpIHtcbiAgICBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChpdGVtLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tZG93blwiPjwvaT4pO1xuICAgICAgfSBlbHNlIGlmIChyZXZlcnNlKSB7XG4gICAgICAgIHJldHVybiAoPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBoYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQgKGl0ZW0pIHtcbiAgICBjb25zdCB7cmVuZGVyTWVudUl0ZW1Db250ZW50LCByZXZlcnNlLCB0aGVtZX0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChyZW5kZXJNZW51SXRlbUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNZW51SXRlbUNvbnRlbnQoaXRlbSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge2l0ZW0uaWNvbiAmJlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtgZmEgJHtpdGVtLmljb259IGl0ZW0taWNvbmB9PiA8L2k+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiByZW5kZXIgYSBzaW1wbGUgbGFiZWwgKi99XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXRlbS1sYWJlbFwiPiB7aXRlbS5sYWJlbH0gPC9zcGFuPlxuICAgICAgICAgIHsvKiByZW5kZXIgZmEgY2hldnJvbnMgZm9yIGRlZmF1bHQgdGhlbWUgKi99XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2hldnJvbihpdGVtLCByZXZlcnNlKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJJdGVtKGl0ZW0sIGxldmVsKSB7XG4gICAgY29uc3Qge29uTWVudUl0ZW1DbGlja30gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGl0ZW0uZGl2aWRlcikge1xuICAgICAgcmV0dXJuICg8ZGl2IGtleT17aXRlbS52YWx1ZX0gY2xhc3NOYW1lPXtgZGl2aWRlciBkaXZpZGVyLWxldmVsLSR7bGV2ZWx9YH0+e2l0ZW0ubGFiZWx9IDwvZGl2Pik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICg8ZGl2XG4gICAgICAgIGtleT17aXRlbS52YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgaXRlbSBpdGVtLWxldmVsLSR7bGV2ZWx9ICR7aXRlbS5hY3RpdmUgPyAnYWN0aXZlJzogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0tdGl0bGVgfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrKGl0ZW0pfT5cbiAgICAgICAgICB7dGhpcy5oYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQoaXRlbSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmVuZGVyIGNoaWxkcmVuICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNoaWxkcmVuICR7aXRlbS5hY3RpdmUgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSd9YH0+XG4gICAgICAgICAge2l0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJdGVtKGNoaWxkLCBsZXZlbCArIDEpXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aXRlbVRyZWUsIGNvbXBvbmVudFN0YXRlVHJlZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHt0aGVtZSwgb25NZW51SXRlbUNsaWNrLCByZXZlcnNlLCByZW5kZXJNZW51SXRlbUNvbnRlbnR9ID0gdGhpcy5wcm9wcztcblxuXG4gICAgaWYgKCF0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICAvLyBzaWRlbWVudSBjb25zdHJ1Y3RlZCBmcm9tIGpzb25cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgU2lkZS1tZW51ICR7dGhlbWUgPyBgU2lkZS1tZW51LSR7dGhlbWV9YCA6ICdTaWRlLW1lbnUtZGVmYXVsdCd9ICR7cmV2ZXJzZSA/ICdyZXZlcnNlJyA6ICcnfSBjaGlsZHJlbiBhY3RpdmVgfT5cbiAgICAgICAgICB7aXRlbVRyZWUgJiYgaXRlbVRyZWUubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJdGVtKGl0ZW0sIDEpXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzaWRlbWVudSBjb25zdHJ1Y3RlZCB3aXRoIHJlYWN0IGNvbXBvbmVudHNcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgU2lkZS1tZW51ICR7dGhlbWUgPyBgU2lkZS1tZW51LSR7dGhlbWV9YCA6ICdTaWRlLW1lbnUtZGVmYXVsdCd9ICR7cmV2ZXJzZSA/ICdyZXZlcnNlJyA6ICcnfSBjaGlsZHJlbiBhY3RpdmVgfT5cbiAgICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVTdGF0ZTogY29tcG9uZW50U3RhdGVUcmVlW2luZGV4XSxcbiAgICAgICAgICAgICAgICBoYW5kbGVDb21wb25lbnRDbGljazogdGhpcy5oYW5kbGVDb21wb25lbnRDbGljay5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIHJlbmRlck1lbnVJdGVtQ29udGVudDogcmVuZGVyTWVudUl0ZW1Db250ZW50LFxuICAgICAgICAgICAgICAgIG9uTWVudUl0ZW1DbGljazogb25NZW51SXRlbUNsaWNrLFxuICAgICAgICAgICAgICAgIHJldmVyc2U6IHJldmVyc2UsXG4gICAgICAgICAgICAgICAgbGV2ZWw6IDFcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG59XG5cblNpZGVNZW51LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29sbGFwc2U6IHRydWUsXG4gIHJldmVyc2U6IGZhbHNlXG59XG5cbmV4cG9ydCBjbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwcm9wVHlwZXMgOiB7XG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlU3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbGV2ZWw6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaWNvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZXZpZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXZlcnNlOiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgb25JdGVtQ2xpY2soKSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDb21wb25lbnRDbGljayh0aGlzLnByb3BzLmFjdGl2ZVN0YXRlKTtcbiAgICBjb25zdCB7b25NZW51SXRlbUNsaWNrLCBjaGlsZHJlbiwgdmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNoaWxkcmVuIHx8IGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKG9uTWVudUl0ZW1DbGljaykge1xuICAgICAgICBvbk1lbnVJdGVtQ2xpY2sodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJDaGV2cm9uIChjaGlsZHJlbiwgYWN0aXZlU3RhdGUsIHJldmVyc2UpIHtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGlmIChhY3RpdmVTdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWRvd25cIj48L2k+KTtcbiAgICAgIH0gZWxzZSBpZiAocmV2ZXJzZSkge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50ICgpIHtcbiAgICBjb25zdCB7cmVuZGVyTWVudUl0ZW1Db250ZW50LCBjaGlsZHJlbiwgdGhlbWUsIHZhbHVlLCBsYWJlbCwgaWNvbiwgYWN0aXZlU3RhdGUsIHJldmVyc2V9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAocmVuZGVyTWVudUl0ZW1Db250ZW50KSB7XG4gICAgICByZXR1cm4gcmVuZGVyTWVudUl0ZW1Db250ZW50KHt0aGVtZTogdGhlbWUsIHZhbHVlOiB2YWx1ZSwgbGFiZWw6IGxhYmVsfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgey8qIHJlbmRlciBpY29uIGlmIHByb3ZpZGVkKi99XG4gICAgICAgICAge2ljb24gJiZcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhICR7aWNvbn0gaXRlbS1pY29uYH0+PC9pPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7LyogcmVuZGVyIGEgc2ltcGxlIGxhYmVsKi99XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXRlbS1sYWJlbFwiPiB7bGFiZWx9IDwvc3Bhbj5cbiAgICAgICAgICB7LyogcmVuZGVyIGZhIGNoZXZyb25zIGZvciBkZWZhdWx0IHRoZW1lICovfVxuICAgICAgICAgIHsgKCF0aGVtZSB8fCB0aGVtZSA9PSAnZGVmYXVsdCcpICYmIHRoaXMucmVuZGVyQ2hldnJvbihjaGlsZHJlbiwgYWN0aXZlU3RhdGUsIHJldmVyc2UpfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bGFiZWwsXG4gICAgICBhY3RpdmVTdGF0ZSxcbiAgICAgIGxldmVsLFxuICAgICAgaWNvbixcbiAgICAgIG9uTWVudUl0ZW1DbGljayxcbiAgICAgIGRpdmlkZXIsXG4gICAgICB0aGVtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICByZXZlcnNlLFxuICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50fSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGl2aWRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BkaXZpZGVyIGRpdmlkZXItbGV2ZWwtJHtsZXZlbH1gfT57bGFiZWx9IDwvZGl2PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0gaXRlbS1sZXZlbC0ke2xldmVsfSAke2FjdGl2ZVN0YXRlLmFjdGl2ZSA/ICdhY3RpdmUnOiAnJ31gfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0tdGl0bGVgfSBvbkNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAge3RoaXMuaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2NoaWxkcmVuICYmXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjaGlsZHJlbiAke2FjdGl2ZVN0YXRlLmFjdGl2ZSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJ31gfT5cbiAgICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgICAgaGFuZGxlQ29tcG9uZW50Q2xpY2s6IHRoaXMucHJvcHMuaGFuZGxlQ29tcG9uZW50Q2xpY2ssXG4gICAgICAgICAgICAgICAgICBhY3RpdmVTdGF0ZTogYWN0aXZlU3RhdGUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50OiByZW5kZXJNZW51SXRlbUNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2s6IG9uTWVudUl0ZW1DbGljayxcbiAgICAgICAgICAgICAgICAgIHJldmVyc2U6IHJldmVyc2UsXG4gICAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwgKyAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuXG4gIH1cblxufVxuIl19
