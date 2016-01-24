'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//class ModelBase extends React.Component {
//  static NON_NATIVE = true;
//
//  constructor(props) {
//    super(props);
//    this.displayName = 'ModelBase';
//  }
//}

var ModelBase = function (_Base) {
  _inherits(ModelBase, _Base);

  function ModelBase(props) {
    _classCallCheck(this, ModelBase);

    // just to avoid useless re-render;

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.guardedValue = null;
    _this.lastVersion = 0;
    return _this;
  }

  ModelBase.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    _Base.prototype.componentDidMount.call(this);

    if (this.props.model) {
      (function () {
        var _props = _this2.props;
        var model = _props.model;
        var name = _props.name;
        var element = _this2.refs.element;

        var value = model.getValue(name);

        element.setValue(value);

        _this2.guardedValue = value;

        // TODO: um jeito mais simples e mais performatico de verificar mudanças
        // XXX: nem sei se isso é certo.
        _this2.unsubscribe = model.subscribe(function () {
          //console.info("[%s, %s] ModelizeWrapper.subscribe %s %s", name, WrappedElement.name, this.lastVersion, model.getVersion());

          // ???: provavelmente fiz isso para ver se já não ocorreu o setValue antes
          // if (this.lastVersion === model.getVersion()) {
          //   return;
          // }

          _this2.lastVersion = model.getVersion();

          var value = model.getValue(name);
          var element = _this2.refs.element;

          // TODO: shouldComponentUpdate ???
          // XXX: isso é pra evitar que o elemento renderize caso o valor não mude
          // XXX: e também para que não renderize caso o valor não mude na hora de fazer undo ou redo :)
          // XXX: é uma gambiarra quente

          if (value != _this2.guardedValue) {
            //console.info("[willUpdated][%s, %s] ModelizeWrapper.subscribe %s %s", name, WrappedElement.name, this.lastVersion, model.getVersion());

            _this2.guardedValue = value;
            element.setValue(value);
          }
        });
      })();
    }
  };

  ModelBase.prototype.componentWillUnmount = function componentWillUnmount() {
    _Base.prototype.componentWillUnmount.call(this);

    this.unsubscribe && this.unsubscribe();
  };

  ModelBase.prototype.onChange = function onChange(before) {
    var _props2 = this.props;
    var name = _props2.name;
    var model = _props2.model;

    return function (_ref) {
      var event = _ref.event;
      var target = _ref.target;
      var data = _ref.data;

      if (model && name) {
        model.setValue(name, data);
      }
    };
  };

  ModelBase.prototype.setValue = function setValue(value) {
    var _props3 = this.props;
    var name = _props3.name;
    var model = _props3.model;

    if (model) {
      model.setValue(name, value);
    } else {
      this.refs.element.setValue(value);
    }
  };

  ModelBase.prototype.getValue = function getValue() {
    var _props4 = this.props;
    var name = _props4.name;
    var model = _props4.model;

    if (model) {
      return model.getValue(name);
    } else {
      return this.refs.element.getValue();
    }
  };

  ModelBase.prototype.render = function render() {
    var newProps = _extends({}, this.props);

    newProps.onChange = this.onChange(newProps.onChange);

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(WrappedElement, _extends({}, newProps, { ref: 'element' }))
    );
  };

  return ModelBase;
}(_base2.default);

ModelBase.__ignoreChildren = WrappedElement.__ignoreChildren || false;
exports.default = ModelBase;