/*! base-object v0.1.0 | https://github.com/ryanmorr/base-object */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BaseObject = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Import dependencies
                                                                                                                                                                                                                                                   */


var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define default property descriptors
 */
var propertyDefaults = {
    enumerable: true,
    configurable: true,
    writable: true
};

/**
 * Name of the `id` property, use Symbol
 * if supported as a means of protection
 */
var _id = function () {
    if (typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol') {
        return Symbol('id');
    }
    return '$id';
}();

/**
 * Abstract class to provide additional
 * functionality and helper methods for
 * other classes to inherit
 *
 * @class BaseObject
 * @api public
 */

var BaseObject = function () {

    /**
     * Instantiate the object, optionally provided
     * a key/value map of configuration properties
     *
     * @constructor
     * @param {Object} properties (optional)
     * @api public
     */
    function BaseObject(properties) {
        _classCallCheck(this, BaseObject);

        this.defineProperty(_id, (0, _util.uid)(), {
            enumerable: false,
            configurable: false,
            writable: false
        });
        if (properties) {
            this.defineProperties(properties);
        }
        this.initialize();
    }

    /**
     * Initialize the instance, override this
     * and not the constructor
     *
     * @api public
     */


    _createClass(BaseObject, [{
        key: 'initialize',
        value: function initialize() {}

        /**
         * Class destructor to purge references
         *
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this = this;

            Object.getOwnPropertyNames(this).forEach(this.removeProperty, this);
            // Ensure `destroy` can only be called once
            this.destroy = function () {
                return _this.warn('Instance already destroyed');
            };
            return this;
        }

        /**
         * Return the unique identifier for
         * this instance
         *
         * @return {String}
         * @api public
         */

    }, {
        key: 'id',
        value: function id() {
            return this[_id];
        }

        /**
         * Define properties for the instance
         *
         * @param {Object} properties
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'defineProperties',
        value: function defineProperties(properties) {
            for (var name in properties) {
                if ((0, _util.hasOwnProperty)(properties, name)) {
                    this.defineProperty(name, properties[name]);
                }
            }
            return this;
        }

        /**
         * Define a property for the instance
         * and optionally provide a descriptor
         *
         * @param {String} name
         * @param {*} value
         * @param {Object} descriptor (optional)
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'defineProperty',
        value: function defineProperty(name, value) {
            var descriptor = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            Object.defineProperty(this, name, (0, _util.merge)({ value: value }, propertyDefaults, descriptor));
            return this;
        }

        /**
         * Check the existence of an instance
         * property
         *
         * @param {String} name
         * @return {Boolean}
         * @api public
         */

    }, {
        key: 'hasProperty',
        value: function hasProperty(name) {
            return name in this;
        }

        /**
         * Get the value of an instance property
         *
         * @param {String} name
         * @return {*}
         * @api public
         */

    }, {
        key: 'getProperty',
        value: function getProperty(name) {
            return this.hasProperty(name) ? this[name] : null;
        }

        /**
         * Set the value of an instance property,
         * differs from `defineProperty` by not
         * including descriptor
         *
         * @param {String} name
         * @param {*} value
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'setProperty',
        value: function setProperty(name, value) {
            this[name] = value;
            return this;
        }

        /**
         * Remove an instance property if it exists
         *
         * @param {String} name
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'removeProperty',
        value: function removeProperty(name) {
            if (!this.hasProperty(name)) {
                this.warn('"' + name + '" property does not exist');
            } else {
                delete this[name];
            }
            return this;
        }

        /**
         * Get the instance properties in a
         * key/value hash map
         *
         * @return {Object}
         * @api public
         */

    }, {
        key: 'getProperties',
        value: function getProperties() {
            var map = Object.create(null);
            var obj = this;
            do {
                // eslint-disable-next-line no-loop-func
                Object.getOwnPropertyNames(obj).forEach(function (prop) {
                    if (prop !== _id && !(prop in map)) {
                        map[prop] = obj[prop];
                    }
                });
            } while (obj = Object.getPrototypeOf(obj));
            return map;
        }

        /**
         * Generate a hash code for an instance
         * based on its properties
         *
         * @return {String}
         * @api public
         */

    }, {
        key: 'hashCode',
        value: function hashCode() {
            return (0, _util.hashCode)(this.getProperties());
        }

        /**
         * Log to the console
         *
         * @param {String} msg
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'log',
        value: function log(msg) {
            (0, _util.print)('log', (0, _util.formatMessage)(this, msg));
            return this;
        }

        /**
         * Log a warning to the console
         *
         * @param {String} msg
         * @return {BaseObject}
         * @api public
         */

    }, {
        key: 'warn',
        value: function warn(msg) {
            (0, _util.print)('warn', (0, _util.formatMessage)(this, msg));
            return this;
        }

        /**
         * Throw an error that is identifiable to
         * the originating class and instance
         *
         * @param {String} msg
         * @api public
         */

    }, {
        key: 'error',
        value: function error(msg) {
            throw new Error((0, _util.formatMessage)(this, msg));
        }

        /**
         * Get the name of the class as a
         * string
         *
         * @return {String}
         * @api public
         */

    }, {
        key: 'getClassName',
        value: function getClassName() {
            return this.constructor.name;
        }

        /**
         * Convert a hash map of instance properties
         * (not including functions) into a JSON
         * string
         *
         * @return {String}
         * @api public
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var props = this.getProperties();
            return JSON.stringify(Object.keys(props).reduce(function (map, key) {
                if (typeof props[key] === 'function') {
                    return map;
                }
                map[key] = props[key];
                return map;
            }, {}));
        }

        /**
         * Get the instance type
         *
         * @return {String}
         * @api public
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '[object ' + this.getClassName() + ']';
        }

        /**
         * Return an integer representation when the
         * instance is converted to a primitive
         *
         * @return {Number}
         * @api public
         */

    }, {
        key: 'valueOf',
        value: function valueOf() {
            return this.hashCode();
        }

        /**
         * Add properties to the class prototype
         *
         * @static
         * @param {...Object} mixins
         * @api public
         */

    }], [{
        key: 'mixin',
        value: function mixin() {
            var _this2 = this;

            for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                mixins[_key] = arguments[_key];
            }

            mixins.forEach(function (obj) {
                (0, _util.merge)(_this2.prototype, obj);
            });
        }

        /**
         * Inherit from class
         *
         * @static
         * @param {Function} subclass
         * @return {Function}
         * @api public
         */

    }, {
        key: 'extend',
        value: function extend(subclass) {
            subclass.prototype = Object.create(this.prototype, {
                constructor: {
                    value: subclass
                }
            });
            return subclass;
        }
    }]);

    return BaseObject;
}();

exports.default = BaseObject;
module.exports = exports['default'];

},{"./util":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasOwnProperty = hasOwnProperty;
exports.merge = merge;
exports.uid = uid;
exports.print = print;
exports.formatMessage = formatMessage;
exports.hashCode = hashCode;
/**
 * Common variables
 */
var counter = 0;
var toString = {}.toString;
var has = {}.hasOwnProperty;

/**
 * Determine whether an object has the specified
 * property as a direct property of that object
 *
 * @param {Object} obj
 * @param {String} name
 * @return {Boolean}
 * @api public
 */
function hasOwnProperty(obj, name) {
    return has.call(obj, name);
}

/**
 * Copy properties from one or more objects
 * to a target object
 *
 * @param {Object} obj
 * @param {...Object} properties
 * @return {Object}
 * @api public
 */
function merge(obj) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    if ('assign' in Object) {
        Object.assign.apply(Object, [obj].concat(props));
        return obj;
    }
    for (var i = 0, len = props.length, item; i < len; i++) {
        item = props[i];
        for (var key in item) {
            if (hasOwnProperty(item, key)) {
                obj[key] = item[key];
            }
        }
    }
    return obj;
}

/**
 * Generate a unique ID
 *
 * @return {String}
 * @api public
 */
function uid() {
    return Date.now().toString(36) + (counter++).toString(36);
}

/**
 * Print a message to the console
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */
function print(type, msg) {
    /* eslint-disable no-console */
    if (console && type in console) {
        console[type](msg);
    }
    /* eslint-enable no-console */
}

/**
 * Format a message to be identifiable to
 * the originating class and instance
 *
 * @param {Object} obj
 * @param {String} msg
 * @return {String}
 * @api public
 */
function formatMessage(obj, msg) {
    return obj.getClassName() + '(#' + obj.id() + '): ' + msg;
}

/**
 * Generate a hash code for an object
 * based on its value/indexed items/properties
 *
 * @param {*} obj
 * @return {Number}
 * @api public
 */
function hashCode(obj) {
    var hash = 0;
    var type = toString.call(obj).slice(8, -1).toLowerCase();
    switch (type) {
        case 'null':
        case 'undefined':
            return 0;
        case 'array':
            for (var i = 0, len = obj.length; i < len; i++) {
                hash += hashCode(i + hashCode(obj[i]));
            }
            return hash;
        case 'object':
            for (var prop in obj) {
                hash += hashCode(prop + hashCode(obj[prop]));
            }
            return hash;
        default:
            var str = obj.toString();
            for (var _i = 0, _len2 = str.length; _i < _len2; _i++) {
                hash = (hash << 5) - hash + str.charCodeAt(_i) & 0xFFFFFFFF;
            }
            return hash;
    }
}

},{}]},{},[1])(1)
});

