/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import BaseObject from '../src/base-object';

// Decalre example class that inherits from `BaseObject`
class ExampleObject extends BaseObject {

    constructor(options) {
        super(options);
    }
}

describe('BaseObject', () => {
    it('should have the characteristics of a class', () => {
        expect(BaseObject).to.be.a('function');
        expect(BaseObject).to.have.property('prototype');
        const base = new BaseObject();
        const example = new ExampleObject();
        expect(base).to.be.instanceof(BaseObject);
        expect(base.constructor).to.equal(BaseObject);
        expect(BaseObject.prototype.isPrototypeOf(example)).to.equal(true);
        expect(example).to.be.instanceof(BaseObject);
    });

    it('should support a configuration object as a parameter for the constructor', () => {
        const example = new ExampleObject({foo: 1, bar: 2});
        expect(example).to.have.ownPropertyDescriptor('foo', { enumerable: true, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('bar', { enumerable: true, configurable: true, writable: true, value: 2});
    });

    it('should support assigning multiple properties', () => {
        const example = new ExampleObject();
        example.defineProperties({foo: 1, bar: 2});
        expect(example).to.have.ownPropertyDescriptor('foo', { enumerable: true, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('bar', { enumerable: true, configurable: true, writable: true, value: 2});
    });

    it('should support assigning properties individually', () => {
        const example = new ExampleObject();
        example.defineProperty('foo', 1);
        example.defineProperty('bar', 2);
        expect(example).to.have.ownPropertyDescriptor('foo', { enumerable: true, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('bar', { enumerable: true, configurable: true, writable: true, value: 2});
    });
});
