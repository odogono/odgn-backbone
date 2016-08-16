'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = exports.Collection = exports.Model = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = exports.Model = _model2.default;
const Collection = exports.Collection = _collection2.default;
const Events = exports.Events = _events2.default;