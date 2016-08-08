/**
 * Common variables
 */
const has = {}.hasOwnProperty;

/**
 * Define default property descriptors
 */
const propertyDefaults = {
    enumerable: true,
    configurable: true,
    writable: true
};

/**
 * Copy properties from one or more objects
 * to a target object
 *
 * @param {Object} obj
 * @param {...Object} properties
 * @return {Object}
 * @api private
 */
function merge(obj, ...props) {
    if ('assign' in Object) {
        Object.assign(obj, ...props);
        return obj;
    }
    for (let i = 0, len = props.length, item; i < len; i++) {
        item = props[i];
        for (const key in item) {
            if (has.call(item, key)) {
                obj[key] = item[key];
            }
        }
    }
    return obj;
}

/**
 * Abstract class to provide additional
 * functionality and helper methods for
 * other classes to inerhit
 *
 * @class BaseObject
 * @api public
 */
export default class BaseObject {

    /**
     * Instaniate the object, optionally provided
     * a key/value map of configuration options
     *
     * @constructor
     * @param {Object} options (optional)
     * @api public
     */
    constructor(options) {
        if (options) {
            for (const name in options) {
                if (has.call(options, name)) {
                    this.defineProperty(name, options[name]);
                }
            }
        }
    }

    /**
     * Define a property for the instance
     *
     * @param {String} name
     * @param {*} value
     * @api public
     */
    defineProperty(name, value) {
        Object.defineProperty(this, name, merge({value}, propertyDefaults));
    }
}
