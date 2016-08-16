'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapError = exports.extend = exports.addUnderscoreMethods = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a local reference to a common array method we'll want to use later.
const slice = Array.prototype.slice;

// Proxy Backbone class methods to Underscore functions, wrapping the model's
// `attributes` object or collection's `models` array behind the scenes.
//
// collection.filter(function(model) { return model.get('age') > 10 });
// collection.each(this.addView);
//
// `Function#apply` can be slow so we use the method's arg count, if we know it.
var addMethod = function addMethod(length, method, attribute) {
  switch (length) {
    case 1:
      return function () {
        return _underscore2.default[method](this[attribute]);
      };
    case 2:
      return function (value) {
        return _underscore2.default[method](this[attribute], value);
      };
    case 3:
      return function (iteratee, context) {
        return _underscore2.default[method](this[attribute], cb(iteratee, this), context);
      };
    case 4:
      return function (iteratee, defaultVal, context) {
        return _underscore2.default[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
    default:
      return function () {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _underscore2.default[method].apply(_underscore2.default, args);
      };
  }
};

var addUnderscoreMethods = exports.addUnderscoreMethods = function addUnderscoreMethods(Class, methods, attribute) {
  _underscore2.default.each(methods, function (length, method) {
    if (_underscore2.default[method]) Class.prototype[method] = addMethod(length, method, attribute);
  });
};

// Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
var cb = function cb(iteratee, instance) {
  if (_underscore2.default.isFunction(iteratee)) return iteratee;
  if (_underscore2.default.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
  if (_underscore2.default.isString(iteratee)) return function (model) {
    return model.get(iteratee);
  };
  return iteratee;
};
var modelMatcher = function modelMatcher(attrs) {
  var matcher = _underscore2.default.matches(attrs);
  return function (model) {
    return matcher(model.attributes);
  };
};

// Helpers
// -------

// Helper function to correctly set up the prototype chain for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = exports.extend = function extend(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent constructor.
  if (protoProps && _underscore2.default.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function child() {
      return parent.apply(this, arguments);
    };
  }

  // Add static properties to the constructor function, if supplied.
  _underscore2.default.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  child.prototype = _underscore2.default.create(parent.prototype, protoProps);
  child.prototype.constructor = child;

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

// Set up inheritance for the model, collection, router, view and history.
// Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

// Throw an error when a URL is needed, and none is supplied.
// export var urlError = function() {
//   throw new Error('A "url" property or function must be specified');
// };

// Wrap an optional error callback with a fallback error event.
var wrapError = exports.wrapError = function wrapError(model, options) {
  var error = options.error;
  options.error = function (resp) {
    if (error) error.call(options.context, model, resp, options);
    model.trigger('error', model, resp, options);
  };
};