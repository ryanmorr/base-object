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

    it('should support assigning property descriptors', () => {
        const example = new ExampleObject();
        example.defineProperty('foo1', 1, {enumerable: false});
        example.defineProperty('foo2', 1, {configurable: false});
        example.defineProperty('foo3', 1, {writable: false});
        expect(example).to.have.ownPropertyDescriptor('foo1', { enumerable: false, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('foo2', { enumerable: true, configurable: false, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('foo3', { enumerable: true, configurable: true, writable: false, value: 1});
    });

    it('should support checking the existance of a property', () => {
        const example = new ExampleObject();
        expect(example.hasProperty('foo')).to.equal(false);
        example.defineProperty('foo', 1);
        expect(example.hasProperty('foo')).to.equal(true);
    });

    it('should support getting the value of an instance property', () => {
        const example = new ExampleObject();
        example.defineProperty('foo', 1);
        expect(example.getProperty('foo')).to.equal(1);
    });

    it('should support setting the value of an instance property', () => {
        const example = new ExampleObject();
        example.setProperty('foo', 1);
        expect(example.getProperty('foo')).to.equal(1);
    });

    it('should support removing an instance property', () => {
        const example = new ExampleObject();
        example.defineProperty('foo', 1);
        expect(example.hasProperty('foo')).to.equal(true);
        example.removeProperty('foo');
        expect(example.hasProperty('foo')).to.equal(false);
    });
});
