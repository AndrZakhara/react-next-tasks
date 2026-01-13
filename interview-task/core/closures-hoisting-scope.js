// ================================
// Closures, Hoisting, Scopes
// ================================

// Task: 0, Function name vs variable mutation
// Expected:
// 1) Predict output
// 2) Explain why function name does NOT affect variable `a`
// 3) Explain what happens if `foo` is renamed to `a`
a = 10;

function foo() {
  a = a + 2;
}

console.log(a);
foo();
console.log(a);

// Follow-up (rename foo -> a)
// Expected:
// 1) Predict output or error
// 2) Explain name binding, hoisting, and reassignment
a = 10;

function a() {
  a = a + 2;
}

console.log(a);
a();
console.log(a);

// Task: 1, Variable hoisting (var)
// Expected: Predict output and explain hoisting and initialization
console.log(a);
var a = 10;
console.log(a);

// Task: 2, Temporal Dead Zone (let)
// Expected: Explain why this throws and what TDZ is
console.log(b);
let b = 20;

// Task: 3, Function declaration hoisting
// Expected: Predict behavior and explain why it works
sayHello();

function sayHello() {
  console.log("hello");
}

// Task: 4, Function expression hoisting
// Expected: Explain why this fails and difference from function declaration
sayHi();

var sayHi = function () {
  console.log("hi");
};

// Task: 5, Block scope vs function scope
// Expected: Predict output and explain var vs let scoping
if (true) {
  var x = 1;
  let y = 2;
}
console.log(x);
console.log(y);

// Task: 6, Closure basic
// Expected: Predict output and explain how closure captures variables
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const inc = counter();
inc();
inc();

// Task: 7, Closure in loop (var)
// Expected: Predict output and explain common interview pitfall
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Task: 8, Closure in loop (let)
// Expected: Predict output and explain why behavior changes
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Task: 9, IIFE scope
// Expected: Explain purpose of IIFE and predict output
(function () {
  var a = 1;
})();
console.log(a);

// Task: 10, Shadowing
// Expected: Predict output and explain variable shadowing
let value = 10;

function test() {
  let value = 20;
  console.log(value);
}

test();
console.log(value);

// Task: 11, Scope chain
// Expected: Explain lookup order and predict output
let a = 1;

function outer() {
  let b = 2;

  function inner() {
    console.log(a, b);
  }

  inner();
}

outer();

// Task: 12, Closure memory leak
// Expected: Explain potential memory issue and how to fix it
function heavy() {
  const bigData = new Array(1000000).fill("*");
  return function () {
    console.log(bigData.length);
  };
}

const fn = heavy();

// Task: 13, Hoisting inside block
// Expected: Explain behavior in non-strict vs strict mode
if (true) {
  function foo() {
    console.log("foo");
  }
}
foo();

// Task: 14, Re-declaration rules
// Expected: Explain which lines throw and why
var a = 1;
let a = 2;

// Task: 15, Global scope pollution
// Expected: Explain how this variable is created and why it is dangerous
function leak() {
  x = 10;
}
leak();
console.log(x);

// Task: 16, Closure with parameter mutation
// Expected: Predict output and explain reference behavior
function wrapper(obj) {
  return function () {
    obj.value++;
    console.log(obj.value);
  };
}

const obj = { value: 0 };
const fn1 = wrapper(obj);
fn1();
fn1();

// Task: 17, this vs lexical scope
// Expected: Explain why closure does NOT affect `this`
const obj2 = {
  value: 42,
  getValue() {
    return function () {
      console.log(this.value);
    };
  },
};

obj2.getValue()();

// Task: 18, Fixing this with closure
// Expected: Refactor to preserve correct `this`
const obj3 = {
  value: 42,
  getValue() {
    return function () {
      console.log(this.value);
    };
  },
};

const fn2 = obj3.getValue();
fn2();

// Task: 19, Module scope
// Expected: Explain how ES modules create their own scope
// file: module.js
export const value = 10;

// file: main.js
import { value } from "./module.js";
console.log(value);

// Task: 20, Interview design question
// Expected: Explain how closures enable data encapsulation
function createStore() {
  let state = {};

  return {
    get(key) {
      return state[key];
    },
    set(key, value) {
      state[key] = value;
    },
  };
}
