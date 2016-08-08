/**
 * Import dependencies
 */
import { hasOwnProperty, merge, uid, print, formatMessage } from './util';

/**
 * Define default property descriptors
 */
const propertyDefaults = {
    enumerable: true,
    configurable: true,
    writable: true
};

/**
 * Name of the `id` property, use Symbol
 * if supported as a means of protection
 */
const id = (() => {
    if (typeof Symbol === 'function' && typeof Symbol() === 'symbol') {
        return Symbol('id');
    }
    return '$id';
})();

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
        this.defineProperty(id, uid(), {
            enumerable: false,
            configurable: false,
            writable: false
        });
        if (options) {
            this.defineProperties(options);
        }
        this.initialize();
    }

    /**
     * Initialize the instance, override this
     * and not the constructor
     *
     * @api public
     */
    initialize() {}

    /**
     * Class destructor to purge references
     *
     * @return {BaseObject}
     * @api public
     */
    destroy() {
        for (const prop in this) {
            if (hasOwnProperty(this, prop)) {
                delete this[prop];
            }
        }
        // Ensure `destroy` can only be called once
        this.destroy = function destroy() {};
        return this;
    }

    /**
     * Return the unique identifier for
     * this instance
     *
     * @return {String}
     * @api public
     */
    id() {
        return this[id];
    }

    /**
     * Define properties for the instance
     *
     * @param {Object} properties
     * @return {BaseObject}
     * @api public
     */
    defineProperties(properties) {
        for (const name in properties) {
            if (hasOwnProperty(properties, name)) {
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
    defineProperty(name, value, descriptor = {}) {
        Object.defineProperty(this, name, merge({value}, propertyDefaults, descriptor));
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
     * @return {BaseObject}
     * @api public
     */
    setProperty(name, value) {
        this[name] = value;
        return this;
    }

    /**
     * Remove an instance property
     *
     * @param {String} name
     * @return {BaseObject}
     * @api public
     */
    removeProperty(name) {
        if (this.hasProperty(name)) {
            delete this[name];
        }
        return this;
    }

    /**
     * Log to the console
     *
     * @param {String} msg
     * @return {BaseObject}
     * @api public
     */
    log(msg) {
        print('log', formatMessage(this, msg));
        return this;
    }

    /**
     * Log a warning to the console
     *
     * @param {String} msg
     * @return {BaseObject}
     * @api public
     */
    warn(msg) {
        print('warn', formatMessage(this, msg));
        return this;
    }

    /**
     * Get the name of the class as a
     * string
     *
     * @return {String}
     * @api public
     */
    getClassName() {
        return this.constructor.name;
    }

    /**
     * Get the instance type
     *
     * @return {String}
     * @api public
     */
    toString() {
        return `[object ${this.getClassName()}]`;
    }
}
