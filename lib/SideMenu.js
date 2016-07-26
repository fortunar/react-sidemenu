'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SideMenu = (function (_Component) {
  _inherits(SideMenu, _Component);

  function SideMenu(props) {
    _classCallCheck(this, SideMenu);

    _get(Object.getPrototypeOf(SideMenu.prototype), 'constructor', this).call(this, props);
    this.state = { items: [] };
  }

  _createClass(SideMenu, [{
    key: 'buildTree',
    value: function buildTree(children, parent) {
      var _this = this;

      return children.map(function (child) {
        var newChild = _extends({}, child);
        var subTree = [];
        if (child.children) {
          subTree = _this.buildTree(child.children, newChild);
        }
        newChild.children = subTree;
        newChild.parent = parent;
        newChild.active = false;
        return newChild;
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('DID MOUNT');
      var items = this.props.items;

      console.log(this.buildTree(items, null));
      this.setState({ itemTree: this.buildTree(items, null) });
      console.log(this.state);
      // items.forEach((item) => this.setInactiveState(item));
    }
  }, {
    key: 'activateItem',
    value: function activateItem(item) {
      var _this2 = this;

      var itemTree = this.state.itemTree;

      var self = this;
      return function (e) {
        item.active = true;
        console.log('ACTIVATE ITEM');
        console.log(item);
        console.log(items);
        console.log(e);
        _this2.setState({ items: items });
      };
    }
  }, {
    key: 'deactivateTree',
    value: (function (_deactivateTree) {
      function deactivateTree(_x) {
        return _deactivateTree.apply(this, arguments);
      }

      deactivateTree.toString = function () {
        return _deactivateTree.toString();
      };

      return deactivateTree;
    })(function (itemTree) {
      itemTree.forEach(function (item) {
        item.active = false;
        if (item.children) {
          deactivateTree(item.children);
        }
      });
    })
  }, {
    key: 'activeParentPath',
    value: function activeParentPath(item) {
      var curItem = item;
      while (curItem !== null) {
        curItem.active = true;
        curItem = curItem.parent;
      }
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(item) {
      var itemTree = this.state.itemTree;

      var self = this;
      return function (e) {
        item.active = true;
        self.deactivateTree(itemTree);
        self.activeParentPath(item);
        self.setState({ items: items });
      };
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item) {
      var _this3 = this;

      return _react2['default'].createElement(
        'div',
        { key: item.value,
          onClick: this.onItemClick(item) },
        _react2['default'].createElement(
          'span',
          null,
          ' ',
          item.label,
          ' '
        ),
        _react2['default'].createElement(
          'div',
          { className: 'children ' + (item.active ? 'active' : 'inactive') },
          item.children && item.children.map(function (child) {
            return _this3.renderItem(child);
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      console.log(this.state);
      var itemTree = this.state.itemTree;

      return _react2['default'].createElement(
        'div',
        { className: 'Side-menu' },
        itemTree && itemTree.map(function (item) {
          return _this4.renderItem(item);
        })
      );
    }
  }]);

  return SideMenu;
})(_react.Component);

exports['default'] = SideMenu;
module.exports = exports['default'];