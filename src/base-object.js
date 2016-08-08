/**
 * Import dependencies
 */
import { hasOwnProperty, merge } from './util';

/**
 * Define default property descriptors
 */
const propertyDefaults = {
    enumerable: true,
    configurable: true,
    writable: true
};

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
            this.defineProperties(options);
        }
    }

    /**
     * Define properties for the instance
     *
     * @param {Object} properties
     * @api public
     */
    defineProperties(properties) {
        for (const name in properties) {
            if (hasOwnProperty(properties, name)) {
                this.defineProperty(name, properties[name]);
            }
        }
    }

    /**
     * Define a property for the instance
     * and optionally provide a descriptor
     *
     * @param {String} name
     * @param {*} value
     * @param {Object} descriptor (optional)
     * @api public
     */
    defineProperty(name, value, descriptor = {}) {
        Object.defineProperty(this, name, merge({value}, propertyDefaults, descriptor));
    }

    /**
     * Check the existence of an instance
     * property
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */
    hasProperty(name) {
        return hasOwnProperty(this, name);
    }

    /**
     * Get the value of an instance property
     *
     * @param {String} name
     * @return {*}
     * @api public
     */
    getProperty(name) {
        return this[name];
    }

    /**
     * Set the value of an instance property,
     * differs from `defineProperty` by not
     * including descriptor
     *
     * @param {String} name
     * @param {*} value
     * @api public
     */
    setProperty(name, value) {
        this[name] = value;
    }

    /**
     * Remove an instance property
     *
     * @param {String} name
     * @api public
     */
    removeProperty(name) {
        if (this.hasProperty(name)) {
            delete this[name];
        }
    }
}
