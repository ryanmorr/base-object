/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import BaseObject from '../src/base-object';

// Decalre example class that inherits from `BaseObject`
class ExampleObject extends BaseObject {

    initialize() {

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

    it('should automatically invoke the initialize method on construction', () => {
        const spy = sinon.spy(ExampleObject.prototype, 'initialize');
        // eslint-disable-next-line no-unused-vars
        const example = new ExampleObject();
        expect(spy.calledOnce).to.equal(true);
        spy.restore();
    });

    it('should generate a unique ID for every instance', () => {
        const example = new ExampleObject();
        expect(example.id()).to.be.ok;
        expect(example.id()).to.be.a('string');
        // Check uniqueness
        const objects = [];
        for (let i = 0; i < 1000; i++) {
            const obj = new ExampleObject();
            expect(objects).to.not.include(obj.id());
            objects.push(obj.id());
        }
    });

    it('should support assigning multiple properties', () => {
        const example = new ExampleObject();
        const returnValue = example.defineProperties({foo: 1, bar: 2});
        expect(example).to.have.ownPropertyDescriptor('foo', { enumerable: true, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('bar', { enumerable: true, configurable: true, writable: true, value: 2});
        expect(returnValue).to.equal(example);
    });

    it('should support assigning properties individually', () => {
        const example = new ExampleObject();
        example.defineProperty('foo', 1);
        const returnValue = example.defineProperty('bar', 2);
        expect(example).to.have.ownPropertyDescriptor('foo', { enumerable: true, configurable: true, writable: true, value: 1});
        expect(example).to.have.ownPropertyDescriptor('bar', { enumerable: true, configurable: true, writable: true, value: 2});
        expect(returnValue).to.equal(example);
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
        const returnValue = example.setProperty('foo', 1);
        expect(example.getProperty('foo')).to.equal(1);
        expect(returnValue).to.equal(example);
    });

    it('should support removing an instance property', () => {
        const example = new ExampleObject();
        example.defineProperty('foo', 1);
        expect(example.hasProperty('foo')).to.equal(true);
        const returnValue = example.removeProperty('foo');
        expect(example.hasProperty('foo')).to.equal(false);
        expect(returnValue).to.equal(example);
    });

    it('should support getting the name of the class as a string', () => {
        const example = new ExampleObject();
        expect(example.getClassName()).to.equal('ExampleObject');
    });
});
