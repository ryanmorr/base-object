# BaseObject

[![GitHub version](https://badge.fury.io/gh/ryanmorr%2Fbase-object.svg)](https://badge.fury.io/gh/ryanmorr%2Fbase-object) [![Build Status](https://travis-ci.org/ryanmorr/base-object.svg)](https://travis-ci.org/ryanmorr/base-object) ![Size](https://badge-size.herokuapp.com/ryanmorr/base-object/master/dist/base-object.min.js.svg?color=blue&label=file%20size)

> Abstract class providing base-level utilities and helper methods for all classes to extend from.

## Usage

Extend the class to inherit its properties and methods:

``` javascript
import BaseObject from 'base-object';

class Foo extends BaseObject {

    initialize() {
        // Use this method and not the constructor to initialize the instance
    }
}
```

Instantiate the class providing an optional configuration object that will be used to define instance properties:

``` javascript
const foo = new Foo({a: 1, b: 2});
foo.a; // 1
foo.b; // 2
```

### Instance Methods

Get the unique ID for the instance that is automatically generated:

``` javascript
const foo = new Foo();
foo.id(); // irpnudcd0
```

Define multiple properties:

``` javascript
const foo = new Foo();
foo.defineProperties({
    aaa: 123,
    bbb: 456,
    ccc: 789
});
```

Define a property with an optional descriptor:

``` javascript
const foo = new Foo();
foo.defineProperty('aaa', 123, {
    enumerable: true,
    configurable: false,
    writable: true
});
```

Set a property (supports method chaining):
``` javascript
const foo = new Foo();
foo.setProperty('aaa', 123).setProperty('bbb', 456);
```

Check if a property exists:
``` javascript
const foo = new Foo({aaa: 123});
foo.hasProperty('aaa'); // true
```

Get a property value (returns null if it does not exist):
``` javascript
const foo = new Foo({aaa: 123});
foo.getProperty('aaa'); // 123
foo.getProperty('bbb'); // null
```

Remove a property from the instance:
``` javascript
const foo = new Foo({aaa: 123});
foo.hasProperty('aaa'); // true
foo.removeProperty('aaa');
foo.hasProperty('aaa'); // false
```

Generate an integer representation of the instance based on its properties:

``` javascript
const foo = new Foo({aaa: 123, bbb: 456});
foo.hashCode(); // 186086595
```

Log a message to the console unique to the instance:

``` javascript
const foo = new Foo();
foo.log('Beacon!'); // "Foo(#irpmhhuk0): Beacon!"
foo.warn('Method is deprecated'); // "Foo(#irpmhhuk0): Method is deprecated"
```

Throw an error that is identifiable to the originating class and instance:

``` javascript
const foo = new Foo();
foo.error('Something went wrong!'); // "Foo(#irpmhhuk0): Something went wrong!"
```

Convert an instance to JSON (serializes all properties of the prototype chain except functions):

``` javascript
const foo = new Foo({aaa: 123, bbb: 456});
foo.toJSON(); // '{"aaa":123,"bbb":456}'
JSON.stringify(foo); // "{\"aaa\":123,\"bbb\":456}"
```

Get the class of an instance:

``` javascript
const foo = new Foo();
foo.getClass(); // Foo
```

Get the class name:

``` javascript
const foo = new Foo();
foo.getClassName(); // "Foo"
```

Get a string representation:

``` javascript
const foo = new Foo();
foo.toString(); // "[object Foo]""
```

Coerce the instance into a primitive value (returns same as `hashCode`):

``` javascript
const foo = new Foo();
foo.valueOf(); // 190755
console.log(foo + 10); // 190765
```

Destroy an instance (purges own instance properties):

``` javascript
const foo = new Foo({aaa: 123});
foo.hasProperty('aaa'); // true
foo.destroy();
foo.hasProperty('aaa'); // false
```

### Static Methods

Add properties/methods to the class prototype:

``` javascript
Foo.mixin({
    shout(msg) {
        alert(msg);
    }
});

const foo = new Foo();
foo.shout('Attention!');
```

Use the factory pattern to create a new instance:

``` javascript
const foo = Foo.factory();
foo instanceof Foo; // true
```

Extend the class:

``` javascript
const Bar = Foo.extend(function Bar() {
    // `Bar` constructor
});

const bar = new Bar();
bar instanceof Foo; // true
```

## Installation

BaseObject is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/base-object/raw/master/dist/base-object.js) or [minified](http://github.com/ryanmorr/base-object/raw/master/dist/base-object.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/base-object

bower install ryanmorr/base-object
```

## Tests

Run unit tests by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).