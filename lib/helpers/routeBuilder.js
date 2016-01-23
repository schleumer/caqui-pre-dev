'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _system = require('../system');

var system = _interopRequireWildcard(_system);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import * as actions from '../actions';

function test(level, route) {
  return function (a, b, c) {
    var back = null;

    if (a && a.location && a.location.pathname) {
      back = a.location.pathname;
    }

    var state = system.store.getState();
    if (state.auth.authenticated) {
      c();
    } else {
      c(b(null, '/login', {
        back: back
      }));
    }
    //c();
  };
}

function routeBuilder(routes) {
  return routes.reduce(function (a, b) {
    if (b.hasOwnProperty('children')) {
      if (b.path && b.component) {
        a.push(_react2.default.createElement(
          _reactRouter.Route,
          { key: b.path, component: b.component },
          routeBuilder(b.children)
        ));
      } else {
        a = a.concat(routeBuilder(b.children));
      }
    } else {
      var component = b.component;
      var path = b.path;
      var free = b.free;

      var props = {
        component: component,
        path: path
      };

      if (!free) {
        props.onEnter = test('user', b);
      }

      a.push(_react2.default.createElement(_reactRouter.Route, _extends({ key: path }, props)));
    }
    return a;
  }, []);
}

exports.default = routeBuilder;