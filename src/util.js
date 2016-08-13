/**
 * Common variables
 */
let counter = 0;
const toString = {}.toString;
const has = {}.hasOwnProperty;

/**
 * Determine whether an object has the specified
 * property as a direct property of that object
 *
 * @param {Object} obj
 * @param {String} name
 * @return {Boolean}
 * @api public
 */
export function hasOwnProperty(obj, name) {
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
export function merge(obj, ...props) {
    if (Object.assign) {
        return Object.assign(obj, ...props);
    }
    for (let i = 0, len = props.length, item; i < len; i++) {
        item = props[i];
        for (const key in item) {
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
export function uid() {
    return (Date.now().toString(36) + (counter++).toString(36));
}

/**
 * Print a message to the console
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */
export function print(type, msg) {
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
export function formatMessage(obj, msg) {
    return `${obj.getClassName()}(#${obj.id()}): ${msg}`;
}

/**
 * Generate a hash code for an object
 * based on its value/indexed items/properties
 *
 * @param {*} obj
 * @return {Number}
 * @api public
 */
export function hashCode(obj) {
    let hash = 0;
    const type = toString.call(obj).slice(8, -1).toLowerCase();
    switch (type) {
        case 'null':
        case 'undefined':
            return 0;
        case 'array':
            for (let i = 0, len = obj.length; i < len; i++) {
                hash += hashCode(i + hashCode(obj[i]));
            }
            return hash;
        case 'object':
            for (const prop in obj) {
                hash += hashCode(prop + hashCode(obj[prop]));
            }
            return hash;
        default:
            const str = obj.toString();
            for (let i = 0, len = str.length; i < len; i++) {
                hash = (((hash << 5) - hash) + str.charCodeAt(i)) & 0xFFFFFFFF;
            }
            return hash;
    }
}
