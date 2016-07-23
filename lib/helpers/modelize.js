'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('../components/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

exports.default = function (WrappedElement) {
  var ModelizeWrapper = function (_Base) {
    (0, _inherits3.default)(ModelizeWrapper, _Base);

    function ModelizeWrapper(props) {
      (0, _classCallCheck3.default)(this, ModelizeWrapper);

      var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

      _this.displayName = 'ModelizeWrapper';

      // just to avoid useless re-render
      _this.guardedValue = null;
      return _this;
    }

    ModelizeWrapper.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      var caquiModel = this.context.caquiModel;


      if (caquiModel) {
        (function () {
          var _model$name = {
            model: caquiModel,
            name: _this2.props.name
          };
          var model = _model$name.model;
          var name = _model$name.name;
          var element = _this2.refs.element;


          var value = model.getValue(name);

          element.setValue(value);

          _this2.guardedValue = value;

          // TODO: um jeito mais simples e mais performatico de verificar mudanças
          // XXX: nem sei se isso é certo.
          _this2.unsubscribe = model.subscribe(function () {
            var value = model.getValue(name);
            var element = _this2.refs.element;

            // TODO: shouldComponentUpdate ???
            // XXX: isso é pra evitar que o elemento renderize caso o valor não mude
            // XXX: e também para que não renderize caso o valor não mude na hora de fazer undo ou redo :)
            // XXX: é uma gambiarra quente

            if (value != _this2.guardedValue) {
              _this2.guardedValue = value;
              element.setValue(value);
            }
          });
        })();
      }
    };

    ModelizeWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    };

    ModelizeWrapper.prototype.onChange = function onChange(before) {
      var caquiModel = this.context.caquiModel;
      var _model$name2 = {
        model: caquiModel,
        name: this.props.name
      };
      var name = _model$name2.name;
      var model = _model$name2.model;


      return function (_ref) {
        var event = _ref.event;
        var data = _ref.data;

        if (model && name) {
          model.setValue(name, data);
        }

        if (before) {
          before(event, data);
        }
      };
    };

    ModelizeWrapper.prototype.setValue = function setValue(value) {
      var caquiModel = this.context.caquiModel;
      var _model$name3 = {
        model: caquiModel,
        name: this.props.name
      };
      var name = _model$name3.name;
      var model = _model$name3.model;


      if (model) {
        model.setValue(name, value);
      } else {
        this.refs.element.setValue(value);
      }
    };

    ModelizeWrapper.prototype.getValue = function getValue() {
      var caquiModel = this.context.caquiModel;
      var _model$name4 = {
        model: caquiModel,
        name: this.props.name
      };
      var name = _model$name4.name;
      var model = _model$name4.model;


      if (model) {
        return model.getValue(name);
      } else {
        return this.refs.element.getValue();
      }
    };

    ModelizeWrapper.prototype.dispatch = function dispatch(method) {
      // sorry, world
      if (WrappedElement.prototype.hasOwnProperty(method)) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        this.refs.element[method].apply(this.refs.element, args);
      } else {
        throw new ReferenceError(method + ' is not defined on ' + getDisplayName(WrappedElement));
      }
    };

    ModelizeWrapper.prototype.render = function render() {
      var newProps = (0, _extends3.default)({}, this.props);

      newProps.onChange = this.onChange(newProps.onChange);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(WrappedElement, (0, _extends3.default)({}, newProps, {
          ref: 'element' }))
      );
    };

    return ModelizeWrapper;
  }(_base2.default);

  ModelizeWrapper.propTypes = WrappedElement.propTypes;
  ModelizeWrapper.__ignoreChildren = WrappedElement.__ignoreChildren || false;
  ModelizeWrapper.contextTypes = {
    caquiRelatedForm: _react2.default.PropTypes.string,
    caquiModel: _react2.default.PropTypes.any
  };


  return ModelizeWrapper;
};