'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaquiEditor = function (_React$Component) {
  (0, _inherits3.default)(CaquiEditor, _React$Component);

  function CaquiEditor(props) {
    (0, _classCallCheck3.default)(this, CaquiEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = { editorState: _draftJs.EditorState.createEmpty() };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      return _this.setState({ editorState: editorState });
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.onTab = function (e) {
      return _this._onTab(e);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    return _this;
  }

  CaquiEditor.prototype._handleKeyCommand = function _handleKeyCommand(command) {
    var editorState = this.state.editorState;

    var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  CaquiEditor.prototype._onTab = function _onTab(e) {
    var maxDepth = 4;
    this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  CaquiEditor.prototype._toggleBlockType = function _toggleBlockType(blockType) {
    this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  CaquiEditor.prototype._toggleInlineStyle = function _toggleInlineStyle(inlineStyle) {
    this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  CaquiEditor.prototype.render = function render() {
    var editorState = this.state.editorState;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.

    var className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return _react2.default.createElement(
      'div',
      { className: 'RichEditor-root' },
      _react2.default.createElement(BlockStyleControls, {
        editorState: editorState,
        onToggle: this.toggleBlockType
      }),
      _react2.default.createElement(InlineStyleControls, {
        editorState: editorState,
        onToggle: this.toggleInlineStyle
      }),
      _react2.default.createElement(
        'div',
        { className: className, onClick: this.focus },
        _react2.default.createElement(_draftJs.Editor, {
          blockStyleFn: getBlockStyle,
          customStyleMap: styleMap,
          editorState: editorState,
          handleKeyCommand: this.handleKeyCommand,
          onChange: this.onChange,
          onTab: this.onTab,
          ref: 'editor',
          spellCheck: true
        })
      )
    );
  };

  return CaquiEditor;
}(_react2.default.Component);

// Custom overrides for "code" style.


var styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

var StyleButton = function (_React$Component2) {
  (0, _inherits3.default)(StyleButton, _React$Component2);

  function StyleButton() {
    (0, _classCallCheck3.default)(this, StyleButton);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this));

    _this2.onToggle = function (e) {
      e.preventDefault();
      _this2.props.onToggle(_this2.props.style);
    };
    return _this2;
  }

  StyleButton.prototype.render = function render() {
    var className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return _react2.default.createElement(
      'span',
      { className: className, onMouseDown: this.onToggle },
      this.props.label
    );
  };

  return StyleButton;
}(_react2.default.Component);

var BLOCK_TYPES = [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }, { label: 'Code Block', style: 'code-block' }];

var BlockStyleControls = function BlockStyleControls(props) {
  var editorState = props.editorState;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return _react2.default.createElement(
    'div',
    { className: 'RichEditor-controls' },
    BLOCK_TYPES.map(function (type) {
      return _react2.default.createElement(StyleButton, {
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      });
    })
  );
};

var INLINE_STYLES = [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }];

var InlineStyleControls = function InlineStyleControls(props) {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return _react2.default.createElement(
    'div',
    { className: 'RichEditor-controls' },
    INLINE_STYLES.map(function (type) {
      return _react2.default.createElement(StyleButton, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      });
    })
  );
};

exports.default = CaquiEditor;