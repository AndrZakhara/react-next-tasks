# Closures, Hoisting, and Scopes in JavaScript

## Table of Contents

- [Scopes](#scopes)
- [Hoisting](#hoisting)
- [Closures](#closures)
- [Mastery Checklist](#mastery-checklist)
- [Resources](#resources)

---

## Scopes

### What is Scope?

Scope determines the accessibility (visibility) of variables in different parts of your code. It defines where variables can be accessed or referenced.

### Types of Scope

#### 1. **Global Scope**

Variables declared outside any function or block are in the global scope.

```javascript
let globalVar = "I'm global";

function test() {
  console.log(globalVar); // Accessible
}

test(); // "I'm global"
console.log(globalVar); // "I'm global"
```

**Characteristics**:

- Accessible everywhere in the code
- In browsers: attached to the `window` object
- In Node.js: attached to the `global` object
- Can lead to naming conflicts and bugs if overused

#### 2. **Function Scope**

Variables declared with `var` inside a function are function-scoped.

```javascript
function myFunction() {
  var functionScoped = "Only inside function";
  console.log(functionScoped); // Works
}

myFunction();
console.log(functionScoped); // ReferenceError
```

**Characteristics**:

- Only accessible within the function
- Not accessible in nested blocks (but accessible in nested functions)
- Created by `var`, function parameters, and function declarations

#### 3. **Block Scope**

Variables declared with `let` and `const` inside a block `{}` are block-scoped.

```javascript
if (true) {
  let blockScoped = "Only in this block";
  const alsoBlockScoped = "Me too";
  var notBlockScoped = "I escape!";

  console.log(blockScoped); // Works
}

console.log(notBlockScoped); // Works (var is not block-scoped)
console.log(blockScoped); // ReferenceError
```

**Characteristics**:

- Created by `let` and `const`
- Exists within `{}` blocks (if, for, while, etc.)
- Helps prevent bugs and naming conflicts

#### 4. **Lexical Scope (Static Scope)**

JavaScript uses lexical scoping, meaning a function's scope is determined by where it's written in the code, not where it's called.

```javascript
let outerVar = "outer";

function outer() {
  let middleVar = "middle";

  function inner() {
    let innerVar = "inner";
    console.log(outerVar); // Can access
    console.log(middleVar); // Can access
    console.log(innerVar); // Can access
  }

  inner();
}

outer();
```

### Scope Chain

When JavaScript looks for a variable, it searches:

1. Current scope
2. Outer scope
3. Next outer scope
4. ... continues until global scope
5. If not found: `ReferenceError`

```javascript
let level1 = "L1";

function first() {
  let level2 = "L2";

  function second() {
    let level3 = "L3";

    console.log(level1); // Searches: level3 → level2 → level1 ✓
    console.log(level2); // Searches: level3 → level2 ✓
    console.log(level3); // Searches: level3 ✓
  }

  second();
}

first();
```

### Variable Shadowing

When an inner scope declares a variable with the same name as an outer scope variable.

```javascript
let name = "Global";

function test() {
  let name = "Local"; // Shadows global 'name'
  console.log(name); // "Local"
}

test();
console.log(name); // "Global"
```

---

## Hoisting

### What is Hoisting?

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase, before code execution.

**Important**: Only declarations are hoisted, not initializations.

### Function Hoisting

Function declarations are fully hoisted.

```javascript
sayHello(); // Works! Outputs: "Hello"

function sayHello() {
  console.log("Hello");
}
```

**What actually happens**:

```javascript
// JavaScript interprets it as:
function sayHello() {
  console.log("Hello");
}

sayHello();
```

### Variable Hoisting

#### `var` Hoisting

Variables declared with `var` are hoisted and initialized with `undefined`.

```javascript
console.log(myVar); // undefined (not ReferenceError!)
var myVar = 5;
console.log(myVar); // 5
```

**What actually happens**:

```javascript
var myVar; // Declaration hoisted
console.log(myVar); // undefined
myVar = 5; // Assignment stays in place
console.log(myVar); // 5
```

#### `let` and `const` Hoisting

`let` and `const` are hoisted but NOT initialized, creating a "Temporal Dead Zone" (TDZ).

```javascript
console.log(myLet); // ReferenceError: Cannot access before initialization
let myLet = 5;
```

**Temporal Dead Zone (TDZ)**:

```javascript
// TDZ starts
let myVar; // TDZ ends, myVar is now accessible
myVar = 10;

if (true) {
  // TDZ starts for blockVar
  console.log(blockVar); // ReferenceError
  let blockVar = 5; // TDZ ends
  console.log(blockVar); // 5
}
```

### Function Expression Hoisting

Function expressions are NOT fully hoisted like function declarations.

```javascript
// Function declaration - WORKS
sayHello();
function sayHello() {
  console.log("Hello");
}

// Function expression - DOESN'T WORK
sayGoodbye(); // TypeError: sayGoodbye is not a function
var sayGoodbye = function () {
  console.log("Goodbye");
};
```

**What actually happens**:

```javascript
var sayGoodbye; // Only declaration hoisted
sayGoodbye(); // sayGoodbye is undefined, not a function
sayGoodbye = function () {
  console.log("Goodbye");
};
```

### Class Hoisting

Classes are hoisted but remain in the TDZ until declaration.

```javascript
const instance = new MyClass(); // ReferenceError

class MyClass {
  constructor() {
    this.name = "Class";
  }
}
```

### Hoisting in Practice

```javascript
// Complex example
var x = 1;

function test() {
  console.log(x); // undefined (not 1!)
  var x = 2;
  console.log(x); // 2
}

test();
```

**Why?** The local `var x` is hoisted to the top of the function:

```javascript
function test() {
  var x; // Hoisted
  console.log(x); // undefined
  x = 2;
  console.log(x); // 2
}
```

---

## Closures

### What is a Closure?

A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

**Every function in JavaScript forms a closure.**

### Basic Closure Example

```javascript
function outer() {
  let count = 0; // Outer variable

  function inner() {
    count++; // Accesses outer variable
    console.log(count);
  }

  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

**Key Point**: The `inner` function "remembers" the `count` variable even after `outer()` has finished executing.

### How Closures Work

When a function is created, it maintains a reference to its lexical environment (the scope in which it was created).

```javascript
function makeAdder(x) {
  // x is captured in closure
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7 (5 + 2)
console.log(add10(2)); // 12 (10 + 2)
```

Each closure has its own independent environment.

### Practical Use Cases

#### 1. **Data Privacy / Encapsulation**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
account.deposit(50); // 150
account.withdraw(30); // 120
console.log(account.balance); // undefined (private!)
```

#### 2. **Function Factories**

```javascript
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 3. **Event Handlers**

```javascript
function attachEventListener(elementId) {
  let count = 0;

  document.getElementById(elementId).addEventListener("click", function () {
    count++;
    console.log(`Clicked ${count} times`);
  });
}

attachEventListener("myButton");
```

#### 4. **Callbacks and Async Operations**

```javascript
function fetchUserData(userId) {
  let cache = {};

  return function () {
    if (cache[userId]) {
      console.log("From cache:", cache[userId]);
      return cache[userId];
    }

    // Simulate API call
    const data = `Data for user ${userId}`;
    cache[userId] = data;
    return data;
  };
}

const getUser = fetchUserData(123);
getUser(); // Fetches data
getUser(); // From cache
```

#### 5. **Module Pattern**

```javascript
const calculator = (function () {
  let result = 0; // Private

  return {
    add(x) {
      result += x;
      return this;
    },
    subtract(x) {
      result -= x;
      return this;
    },
    multiply(x) {
      result *= x;
      return this;
    },
    getResult() {
      return result;
    },
    reset() {
      result = 0;
      return this;
    },
  };
})();

calculator.add(10).multiply(2).subtract(5).getResult(); // 15
```

### Common Closure Pitfalls

#### Problem: Loop with `var`

```javascript
// WRONG
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 (not 0, 1, 2!)
  }, 100);
}
```

**Why?** All timeouts share the same `i` variable, which becomes 3 after the loop.

**Solution 1: Use `let`** (block-scoped)

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2 ✓
  }, 100);
}
```

**Solution 2: IIFE** (Immediately Invoked Function Expression)

```javascript
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2 ✓
    }, 100);
  })(i);
}
```

#### Problem: Memory Leaks

Closures can prevent garbage collection if not managed properly.

```javascript
// Potential memory leak
function createHugeClosure() {
  const hugeArray = new Array(1000000).fill("data");

  return function () {
    console.log("Using closure");
    // hugeArray remains in memory even if not used
  };
}
```

**Solution**: Only capture what you need

```javascript
function createOptimizedClosure() {
  const hugeArray = new Array(1000000).fill("data");
  const needed = hugeArray[0]; // Extract only what's needed

  return function () {
    console.log(needed); // Only 'needed' is captured
  };
}
```

---

## Combining Concepts

### Example: Scope + Hoisting + Closure

```javascript
var globalVar = "global";

function outer() {
  console.log(globalVar); // "global" (scope chain)
  console.log(outerVar); // undefined (hoisting)

  var outerVar = "outer";

  function inner() {
    console.log(outerVar); // "outer" (closure)
    console.log(innerVar); // undefined (hoisting)

    var innerVar = "inner";
    console.log(innerVar); // "inner"
  }

  return inner;
}

const closureFunc = outer();
closureFunc();
```

### Real-World Example: Counter with Scope Protection

```javascript
const counterModule = (function () {
  // Private variables (closure)
  let count = 0;
  const maxCount = 10;

  // Private function (not hoisted outside IIFE)
  function validateCount(value) {
    return value >= 0 && value <= maxCount;
  }

  // Public API
  return {
    increment() {
      if (count < maxCount) {
        count++;
      }
      return count;
    },
    decrement() {
      if (count > 0) {
        count--;
      }
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
    getCount() {
      return count;
    },
  };
})();

console.log(counterModule.increment()); // 1
console.log(counterModule.increment()); // 2
console.log(counterModule.count); // undefined (private!)
```

---

## Mastery Checklist

### Scopes

- [ ] I understand the difference between global, function, and block scope
- [ ] I know that `var` is function-scoped and `let`/`const` are block-scoped
- [ ] I can explain lexical scoping (static scope)
- [ ] I understand the scope chain and how variable lookup works
- [ ] I know what variable shadowing is and can identify it
- [ ] I understand the difference between scope and context (`this`)
- [ ] I can predict variable accessibility in nested functions
- [ ] I know how closures relate to scope

### Hoisting

- [ ] I can explain what hoisting is in my own words
- [ ] I understand that only declarations are hoisted, not initializations
- [ ] I know the difference between `var`, `let`, and `const` hoisting
- [ ] I understand the Temporal Dead Zone (TDZ)
- [ ] I can explain why `console.log(x); var x = 5;` outputs `undefined`
- [ ] I know that function declarations are fully hoisted
- [ ] I understand that function expressions are not fully hoisted
- [ ] I can predict the output of code with hoisting behavior
- [ ] I know that `class` declarations are hoisted but in the TDZ

### Closures

- [ ] I can explain what a closure is in simple terms
- [ ] I understand that closures maintain references to outer variables
- [ ] I know how to create private variables using closures
- [ ] I can identify where closures are being used in code
- [ ] I understand the common loop + closure pitfall with `var`
- [ ] I know how to fix closure issues in loops
- [ ] I can use closures for function factories
- [ ] I understand how closures can cause memory leaks
- [ ] I know practical use cases for closures (data privacy, callbacks, etc.)
- [ ] I can use the module pattern with closures

### Combined Understanding

- [ ] I can explain how scope, hoisting, and closures interact
- [ ] I can debug issues involving all three concepts
- [ ] I understand execution context and how it relates to these concepts
- [ ] I can write code that effectively uses these concepts together
- [ ] I know when to use `var`, `let`, or `const`
- [ ] I can refactor code to avoid common pitfalls

### Testing Your Knowledge

**Challenge 1**: Predict the output

```javascript
var x = 10;

function test() {
  console.log(x);
  var x = 20;
  console.log(x);
}

test();
console.log(x);
```

<details>
<summary>Click to see the answer</summary>

```
undefined
20
10
```

**Explanation**: The local `var x` is hoisted to the top of `test()`, shadowing the global `x`. It's `undefined` until assigned.

</details>

**Challenge 2**: Fix this closure bug

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// Currently outputs: 3, 3, 3
// Expected: 0, 1, 2
```

<details>
<summary>Click to see the solution</summary>

**Solution 1 (Recommended)**: Use `let`

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

**Solution 2**: Use IIFE

```javascript
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
```

**Solution 3**: Use `bind`

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(console, i), 1000);
}
```

</details>

**Challenge 3**: What's the output?

```javascript
function create() {
  let count = 0;

  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter1 = create();
const counter2 = create();

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.getCount());
console.log(counter2.getCount());
```

<details>
<summary>Click to see the answer</summary>

```
2
1
```

**Explanation**: Each call to `create()` creates a new closure with its own independent `count` variable.

</details>

---

## Resources

### Official Documentation

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [MDN: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

### In-Depth Articles

- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)
- [JavaScript.info: Variable Scope, Closure](https://javascript.info/closure)
- [JavaScript.info: The Old "var"](https://javascript.info/var)

### Videos

- [JavaScript Visualized: Scope (Chain)](https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd)
- [JavaScript Visualized: Hoisting](https://dev.to/lydiahallie/javascript-visualized-hoisting-478h)

### Interactive Learning

- [JavaScript Tutor Visualizer](http://pythontutor.com/javascript.html) - Visualize code execution
- [JSBin](https://jsbin.com/) - Practice and experiment with code

---

**Last Updated**: January 2025
