'use strict';

exports.__esModule = true;

exports.default = function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var data = action.data;
    var type = action.type;


    var index = state.indexOf(data);

    switch (type) {
        case constants.ERROR:
            return [].concat(state, [bindId(data)]);
        case constants.DUMP_ERRORS_FROM_REQUEST:
            return [].concat(state, data.map(bindId));
        case constants.FORGET_ERROR:
            return [].concat(state.slice(0, index), state.slice(index + 1));
        default:
            return state;
    }
};

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = [];

var id = 0;

var bindId = function bindId(_) {
    if (!_.id) _.id = id++;
    return _;
};