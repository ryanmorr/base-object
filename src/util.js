/**
 * Common variables
 */
let counter = 0;
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
 * @api private
 */
export function merge(obj, ...props) {
    if ('assign' in Object) {
        Object.assign(obj, ...props);
        return obj;
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
