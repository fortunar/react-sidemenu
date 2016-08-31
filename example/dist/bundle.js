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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdXJiYW5tYXJvdnQvRG9jdW1lbnRzL1dvcmsvQmFub3N0dWRpb3MvcmVhY3Qtc2lkZW1lbnUvc3JjL1NpZGVNZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0EwQyxPQUFPOzs7O0lBRXBDLFFBQVE7WUFBUixRQUFROztBQVdSLFdBWEEsUUFBUSxDQVdQLEtBQUssRUFBRSxZQUFZLEVBQUU7MEJBWHRCLFFBQVE7O0FBWWxCLCtCQVpVLFFBQVEsNkNBWVosS0FBSyxFQUFFLFlBQVksRUFBRTtBQUMzQixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUMsQ0FBQztHQUNqRDs7Ozs7O2VBZFUsUUFBUTs7V0FvQkQsOEJBQUc7QUFDbkIsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUN2QixZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztPQUM5RjtLQUNGOzs7V0FFc0IsaUNBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRTs7O0FBQ3hDLGFBQU8sbUJBQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDN0MsWUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLFlBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixZQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3hCLGlCQUFPLEdBQUcsTUFBSyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN4RTtBQUNELGdC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O0FBQy9CLG9DQUFvQixFQUFFLE9BQUssS0FBSyxDQUFDLG9CQUFvQjtBQUNyRCwyQkFBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3hDLHFDQUFxQixFQUFFLHFCQUFxQjtBQUM1QywrQkFBZSxFQUFFLGVBQWU7QUFDaEMsbUJBQUcsRUFBRSxHQUFHO0FBQ1IscUJBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQztlQUNqQixDQUFDLENBQUE7YUFDTCxDQUFDO1dBQ0U7U0FDRixDQUNQO09BQ0Y7S0FFRjs7O1NBaEdVLElBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNsYXNzIFNpZGVNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBpdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICAgIG9uTWVudUl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVuZGVyTWVudUl0ZW1Db250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2xsYXBzZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgcnRsOiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMsIGRlZmF1bHRQcm9wcykge1xuICAgc3VwZXIocHJvcHMsIGRlZmF1bHRQcm9wcyk7XG4gICB0aGlzLnN0YXRlID0ge2l0ZW1zOiBbXSwgY29tcG9uZW50U3RhdGVUcmVlOiBbXX07XG4gIH1cblxuICAvL1xuICAvLyBtZXRob2RzIGZvciBDT01QT05FTlQgc3RydWN0dXJlXG4gIC8vXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjb21wb25lbnRTdGF0ZVRyZWU6IHRoaXMuYnVpbGRDb21wb25lbnRTdGF0ZVRyZWUodGhpcy5wcm9wcy5jaGlsZHJlbiwgbnVsbCl9KTtcbiAgICB9XG4gIH1cblxuICBidWlsZENvbXBvbmVudFN0YXRlVHJlZShjaGlsZHJlbiwgcGFyZW50KSB7XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICBsZXQgbmV3Q2hpbGQgPSB7fVxuICAgICAgbGV0IHN1YlRyZWUgPSBbXTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgICBzdWJUcmVlID0gdGhpcy5idWlsZENvbXBvbmVudFN0YXRlVHJlZShjaGlsZC5wcm9wcy5jaGlsZHJlbiwgbmV3Q2hpbGQpO1xuICAgICAgfVxuICAgICAgbmV3Q2hpbGQuY2hpbGRyZW4gPSBzdWJUcmVlO1xuICAgICAgbmV3Q2hpbGQuYWN0aXZlID0gZmFsc2U7XG4gICAgICBuZXdDaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgIHJldHVybiBuZXdDaGlsZDtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNvbXBvbmVudENsaWNrKGl0ZW0pIHtcbiAgICBjb25zdCB7Y29sbGFwc2V9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y29tcG9uZW50U3RhdGVUcmVlfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgYWN0aXZlQmVmb3JlID0gaXRlbS5hY3RpdmU7XG5cbiAgICAvLyBjb2xsYXBzZVxuICAgIGlmIChjb2xsYXBzZSkge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlQ29tcG9uZW50VHJlZShjb21wb25lbnRTdGF0ZVRyZWUpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2YXRlUGFyZW50c0NvbXBvbmVudFRyZWUoaXRlbSwgYWN0aXZlQmVmb3JlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjb21wb25lbnRTdGF0ZVRyZWU6IGNvbXBvbmVudFN0YXRlVHJlZX0pO1xuICB9XG5cbiAgYWN0aXZhdGVQYXJlbnRzQ29tcG9uZW50VHJlZShpdGVtLCBhY3RpdmVCZWZvcmUpIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5hY3RpdmUgPSAhYWN0aXZlQmVmb3JlO1xuICAgICAgdGhpcy5hY3RpdmF0ZVBhcmVudHNDb21wb25lbnRUcmVlKGl0ZW0ucGFyZW50KTtcbiAgICB9XG4gIH1cblxuICBkZWFjdGl2YXRlQ29tcG9uZW50VHJlZShjb21wb25lbnRTdGF0ZVRyZWUpIHtcbiAgICByZXR1cm4gY29tcG9uZW50U3RhdGVUcmVlLm1hcCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuKSB7XG4gICAgICAgIGNoaWxkLmNoaWxkcmVuID0gdGhpcy5kZWFjdGl2YXRlQ29tcG9uZW50VHJlZShjaGlsZC5jaGlsZHJlbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIG1ldGhvZHMgZm9yIEpTT04gc3RydWN0dXJlXG4gIC8vXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge2l0ZW1zfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoaXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1UcmVlOiB0aGlzLmJ1aWxkVHJlZShpdGVtcywgbnVsbCl9KTtcbiAgICB9XG4gIH1cblxuICBidWlsZFRyZWUoY2hpbGRyZW4sIHBhcmVudCkge1xuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICBsZXQgbmV3Q2hpbGQgPSB7Li4uY2hpbGR9XG4gICAgICBsZXQgc3ViVHJlZSA9IFtdO1xuICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuKSB7XG4gICAgICAgIHN1YlRyZWUgPSB0aGlzLmJ1aWxkVHJlZShjaGlsZC5jaGlsZHJlbiwgbmV3Q2hpbGQpO1xuICAgICAgfVxuICAgICAgbmV3Q2hpbGQuY2hpbGRyZW4gPSBzdWJUcmVlO1xuICAgICAgbmV3Q2hpbGQucGFyZW50ID0gcGFyZW50O1xuICAgICAgbmV3Q2hpbGQuYWN0aXZlID0gZmFsc2U7XG4gICAgICByZXR1cm4gbmV3Q2hpbGQ7XG4gICAgfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlVHJlZShpdGVtVHJlZSkge1xuICAgIGl0ZW1UcmVlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGVUcmVlKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZlUGFyZW50UGF0aChpdGVtKSB7XG4gICAgbGV0IGN1ckl0ZW0gPSBpdGVtO1xuICAgIHdoaWxlIChjdXJJdGVtICE9PSBudWxsKSB7XG4gICAgICBjdXJJdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICBjdXJJdGVtID0gY3VySXRlbS5wYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgb25JdGVtQ2xpY2sgKGl0ZW0pIHtcbiAgICBjb25zdCB7aXRlbVRyZWV9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7b25NZW51SXRlbUNsaWNrLCBjb2xsYXBzZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUubmF0aXZlRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIC8vIGhhbmRsZSBVSSBjaGFuZ2VzXG4gICAgICBpZiAoIWl0ZW0uYWN0aXZlKSB7XG4gICAgICAgIC8vIGlmIG1lbnUgaXMgaW4gY29sbGFwc2UgbW9kZSwgY2xvc2UgYWxsIGl0ZW1zXG4gICAgICAgIGlmIChjb2xsYXBzZSkge1xuICAgICAgICAgIHNlbGYuZGVhY3RpdmF0ZVRyZWUoaXRlbVRyZWUpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5hY3RpdmVQYXJlbnRQYXRoKGl0ZW0pO1xuICAgICAgICBzZWxmLnNldFN0YXRlKHtpdGVtVHJlZTogaXRlbVRyZWV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIGlmIG1lbnUgaXMgaW4gY29sbGFwc2UgbW9kZSwgY2xvc2Ugb25seVxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgIHNlbGYuZGVhY3RpdmF0ZVRyZWUoaXRlbS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ucGFyZW50KSB7XG4gICAgICAgICAgc2VsZi5hY3RpdmVQYXJlbnRQYXRoKGl0ZW0ucGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNldFN0YXRlKHtpdGVtVHJlZTogaXRlbVRyZWV9KTtcbiAgICAgIH1cblxuICAgICAgLy9oYW5kbGUgd2hhdCBoYXBwZW5zIGlmIHRoZSBpdGVtIGlzIGEgbGVhZiBub2RlXG4gICAgICBpZiAoIWl0ZW0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKG9uTWVudUl0ZW1DbGljaykge1xuICAgICAgICAgIG9uTWVudUl0ZW1DbGljayhpdGVtLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAjJHtpdGVtLnZhbHVlfWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJDaGV2cm9uIChpdGVtLCBydGwpIHtcbiAgICBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChpdGVtLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tZG93blwiPjwvaT4pO1xuICAgICAgfSBlbHNlIGlmIChydGwpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGhhbmRsZVJlbmRlck1lbnVJdGVtQ29udGVudCAoaXRlbSkge1xuICAgIGNvbnN0IHtyZW5kZXJNZW51SXRlbUNvbnRlbnQsIHJ0bH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChyZW5kZXJNZW51SXRlbUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNZW51SXRlbUNvbnRlbnQoaXRlbSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge2l0ZW0uaWNvbiAmJlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtgZmEgJHtpdGVtLmljb259IGl0ZW0taWNvbmB9PiA8L2k+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiByZW5kZXIgYSBzaW1wbGUgbGFiZWwgKi99XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXRlbS1sYWJlbFwiPiB7aXRlbS5sYWJlbH0gPC9zcGFuPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNoZXZyb24oaXRlbSwgcnRsKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJJdGVtKGl0ZW0sIGxldmVsKSB7XG4gICAgY29uc3Qge29uTWVudUl0ZW1DbGlja30gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGl0ZW0uZGl2aWRlcikge1xuICAgICAgcmV0dXJuICg8ZGl2IGtleT17aXRlbS52YWx1ZX0gY2xhc3NOYW1lPXtgZGl2aWRlciBkaXZpZGVyLWxldmVsLSR7bGV2ZWx9YH0+e2l0ZW0ubGFiZWx9IDwvZGl2Pik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICg8ZGl2XG4gICAgICAgIGtleT17aXRlbS52YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgaXRlbSBpdGVtLWxldmVsLSR7bGV2ZWx9ICR7aXRlbS5hY3RpdmUgPyAnYWN0aXZlJzogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0tdGl0bGVgfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrKGl0ZW0pfT5cbiAgICAgICAgICB7dGhpcy5oYW5kbGVSZW5kZXJNZW51SXRlbUNvbnRlbnQoaXRlbSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmVuZGVyIGNoaWxkcmVuICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNoaWxkcmVuICR7aXRlbS5hY3RpdmUgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSd9YH0+XG4gICAgICAgICAge2l0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJdGVtKGNoaWxkLCBsZXZlbCArIDEpXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aXRlbVRyZWUsIGNvbXBvbmVudFN0YXRlVHJlZX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHt0aGVtZSwgb25NZW51SXRlbUNsaWNrLCBydGwsIHJlbmRlck1lbnVJdGVtQ29udGVudH0gPSB0aGlzLnByb3BzO1xuXG5cbiAgICBpZiAoIXRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIC8vIHNpZGVtZW51IGNvbnN0cnVjdGVkIGZyb20ganNvblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BTaWRlLW1lbnUgU2lkZS1tZW51LSR7dGhlbWV9ICR7cnRsID8gJ3J0bCcgOiAnJ30gY2hpbGRyZW4gYWN0aXZlYH0+XG4gICAgICAgICAge2l0ZW1UcmVlICYmIGl0ZW1UcmVlLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIHRoaXMucmVuZGVySXRlbShpdGVtLCAxKVxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2lkZW1lbnUgY29uc3RydWN0ZWQgd2l0aCByZWFjdCBjb21wb25lbnRzXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YFNpZGUtbWVudSAgU2lkZS1tZW51LSR7dGhlbWV9ICR7cnRsID8gJ3J0bCcgOiAnJ30gY2hpbGRyZW4gYWN0aXZlYH0+XG4gICAgICAgICAgeyBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU3RhdGU6IGNvbXBvbmVudFN0YXRlVHJlZVtpbmRleF0sXG4gICAgICAgICAgICAgICAgaGFuZGxlQ29tcG9uZW50Q2xpY2s6IHRoaXMuaGFuZGxlQ29tcG9uZW50Q2xpY2suYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICByZW5kZXJNZW51SXRlbUNvbnRlbnQ6IHJlbmRlck1lbnVJdGVtQ29udGVudCxcbiAgICAgICAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2s6IG9uTWVudUl0ZW1DbGljayxcbiAgICAgICAgICAgICAgICBydGw6IHJ0bCxcbiAgICAgICAgICAgICAgICBsZXZlbDogMVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuU2lkZU1lbnUuZGVmYXVsdFByb3BzID0ge1xuICBjb2xsYXBzZTogdHJ1ZSxcbiAgcnRsOiBmYWxzZSxcbiAgdGhlbWU6ICdkZWZhdWx0J1xufVxuXG5leHBvcnQgY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHJvcFR5cGVzIDoge1xuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZVN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxldmVsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGV2aWRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcnRsOiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgb25JdGVtQ2xpY2soKSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDb21wb25lbnRDbGljayh0aGlzLnByb3BzLmFjdGl2ZVN0YXRlKTtcbiAgICBjb25zdCB7b25NZW51SXRlbUNsaWNrLCBjaGlsZHJlbiwgdmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNoaWxkcmVuIHx8IGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKG9uTWVudUl0ZW1DbGljaykge1xuICAgICAgICBvbk1lbnVJdGVtQ2xpY2sodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgIyR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJDaGV2cm9uIChjaGlsZHJlbiwgYWN0aXZlU3RhdGUsIHJ0bCkge1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgaWYgKGFjdGl2ZVN0YXRlLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tZG93blwiPjwvaT4pO1xuICAgICAgfSBlbHNlIGlmIChydGwpIHtcbiAgICAgICAgcmV0dXJuICg8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGhhbmRsZVJlbmRlck1lbnVJdGVtQ29udGVudCAoKSB7XG4gICAgY29uc3Qge3JlbmRlck1lbnVJdGVtQ29udGVudCwgY2hpbGRyZW4sIHZhbHVlLCBsYWJlbCwgaWNvbiwgYWN0aXZlU3RhdGUsIHJ0bH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChyZW5kZXJNZW51SXRlbUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiByZW5kZXJNZW51SXRlbUNvbnRlbnQoe2ljb246IGljb24sIHZhbHVlOiB2YWx1ZSwgbGFiZWw6IGxhYmVsfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgey8qIHJlbmRlciBpY29uIGlmIHByb3ZpZGVkKi99XG4gICAgICAgICAge2ljb24gJiZcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhICR7aWNvbn0gaXRlbS1pY29uYH0+PC9pPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7LyogcmVuZGVyIGEgc2ltcGxlIGxhYmVsKi99XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXRlbS1sYWJlbFwiPiB7bGFiZWx9IDwvc3Bhbj5cbiAgICAgICAgICB7IHRoaXMucmVuZGVyQ2hldnJvbihjaGlsZHJlbiwgYWN0aXZlU3RhdGUsIHJ0bCkgfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bGFiZWwsXG4gICAgICBhY3RpdmVTdGF0ZSxcbiAgICAgIGxldmVsLFxuICAgICAgaWNvbixcbiAgICAgIG9uTWVudUl0ZW1DbGljayxcbiAgICAgIGRpdmlkZXIsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcnRsLFxuICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50fSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGl2aWRlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BkaXZpZGVyIGRpdmlkZXItbGV2ZWwtJHtsZXZlbH1gfT57bGFiZWx9IDwvZGl2PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0gaXRlbS1sZXZlbC0ke2xldmVsfSAke2FjdGl2ZVN0YXRlLmFjdGl2ZSA/ICdhY3RpdmUnOiAnJ31gfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGl0ZW0tdGl0bGVgfSBvbkNsaWNrPXt0aGlzLm9uSXRlbUNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAge3RoaXMuaGFuZGxlUmVuZGVyTWVudUl0ZW1Db250ZW50KCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2NoaWxkcmVuICYmXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjaGlsZHJlbiAke2FjdGl2ZVN0YXRlLmFjdGl2ZSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJ31gfT5cbiAgICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgICAgaGFuZGxlQ29tcG9uZW50Q2xpY2s6IHRoaXMucHJvcHMuaGFuZGxlQ29tcG9uZW50Q2xpY2ssXG4gICAgICAgICAgICAgICAgICBhY3RpdmVTdGF0ZTogYWN0aXZlU3RhdGUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgcmVuZGVyTWVudUl0ZW1Db250ZW50OiByZW5kZXJNZW51SXRlbUNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2s6IG9uTWVudUl0ZW1DbGljayxcbiAgICAgICAgICAgICAgICAgIHJ0bDogcnRsLFxuICAgICAgICAgICAgICAgICAgbGV2ZWw6IGxldmVsICsgMVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==
