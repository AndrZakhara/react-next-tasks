# Prototypes, Prototype Chain, and Classes in JavaScript

## Table of Contents

- [Understanding Prototypes](#understanding-prototypes)
- [Prototype Chain](#prototype-chain)
- [Constructor Functions](#constructor-functions)
- [Object Creation Patterns](#object-creation-patterns)
- [ES6 Classes](#es6-classes)
- [Inheritance](#inheritance)
- [Mastery Checklist](#mastery-checklist)
- [Resources](#resources)

---

## Understanding Prototypes

### What is a Prototype?

Every JavaScript object has an internal property called `[[Prototype]]` (accessed via `__proto__` or `Object.getPrototypeOf()`). This prototype is a reference to another object from which the current object can inherit properties and methods.

**Key Concept**: JavaScript uses **prototypal inheritance** - objects inherit directly from other objects.

### Accessing Prototypes

```javascript
const obj = { name: "Alice" };

// Three ways to access prototype:
console.log(obj.__proto__); // Not recommended (legacy)
console.log(Object.getPrototypeOf(obj)); // ✅ Recommended
console.log(obj.constructor.prototype); // Via constructor

// Setting prototype
Object.setPrototypeOf(obj, newPrototype); // ⚠️ Slow, avoid in production
```

### The `prototype` Property

**Important distinction**:

- `[[Prototype]]` (internal) - the actual prototype object
- `prototype` property - only exists on **functions** (constructors)

```javascript
function Person(name) {
  this.name = name;
}

// Person.prototype is an object that instances will inherit from
Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person("Alice");

// alice's [[Prototype]] points to Person.prototype
console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
```

### How Prototypes Work

```javascript
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
};

// Set rabbit's prototype to animal
Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.jumps); // true (own property)
console.log(rabbit.eats); // true (inherited from animal)
rabbit.walk(); // "Animal walks" (inherited method)

// Check where property comes from
console.log(rabbit.hasOwnProperty("jumps")); // true
console.log(rabbit.hasOwnProperty("eats")); // false (inherited)
```

### Property Lookup

When you access a property:

1. JavaScript first looks at the object itself
2. If not found, looks at the object's prototype
3. Continues up the prototype chain
4. If not found anywhere: returns `undefined`

```javascript
const obj = {
  a: 1,
};

Object.setPrototypeOf(obj, {
  b: 2,
  c: 3,
});

console.log(obj.a); // 1 (own property)
console.log(obj.b); // 2 (from prototype)
console.log(obj.d); // undefined (not found anywhere)
```

### Writing to Properties

Writing always creates/updates properties on the object itself, never on the prototype.

```javascript
const parent = {
  value: 10,
};

const child = Object.create(parent);

console.log(child.value); // 10 (inherited)

child.value = 20; // Creates new property on child

console.log(child.value); // 20 (own property)
console.log(parent.value); // 10 (unchanged)
console.log(child.hasOwnProperty("value")); // true
```

---

## Prototype Chain

### What is the Prototype Chain?

The prototype chain is a series of links between objects through their `[[Prototype]]` references. This is how JavaScript implements inheritance.

```javascript
const grandparent = {
  surname: "Smith",
};

const parent = Object.create(grandparent);
parent.firstName = "John";

const child = Object.create(parent);
child.age = 10;

// Prototype chain: child → parent → grandparent → Object.prototype → null
console.log(child.age); // 10 (own)
console.log(child.firstName); // "John" (from parent)
console.log(child.surname); // "Smith" (from grandparent)
console.log(child.toString()); // [object Object] (from Object.prototype)
```

### Visualizing the Chain

```
child
  ↓ [[Prototype]]
parent { firstName: 'John' }
  ↓ [[Prototype]]
grandparent { surname: 'Smith' }
  ↓ [[Prototype]]
Object.prototype { toString, hasOwnProperty, etc. }
  ↓ [[Prototype]]
null
```

### The Root: Object.prototype

Almost all objects eventually link to `Object.prototype`, which provides common methods:

```javascript
const obj = {};

// These methods come from Object.prototype:
obj.toString(); // "[object Object]"
obj.hasOwnProperty("name"); // false
obj.valueOf(); // {}

// Object.prototype's prototype is null (end of chain)
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

### Creating Objects with Different Prototypes

```javascript
// 1. Object literal - prototype is Object.prototype
const obj1 = {};
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

// 2. Object.create() - specify prototype
const obj2 = Object.create({ custom: true });
console.log(Object.getPrototypeOf(obj2)); // { custom: true }

// 3. Object.create(null) - no prototype!
const obj3 = Object.create(null);
console.log(Object.getPrototypeOf(obj3)); // null
// obj3.toString(); // ERROR: no inherited methods

// 4. Constructor function
function MyConstructor() {}
const obj4 = new MyConstructor();
console.log(Object.getPrototypeOf(obj4) === MyConstructor.prototype); // true
```

### Prototype Chain with Arrays and Functions

```javascript
const arr = [1, 2, 3];

// Array prototype chain:
// arr → Array.prototype → Object.prototype → null

console.log(arr.push); // from Array.prototype
console.log(arr.toString); // from Object.prototype (overridden by Array)

// Check the chain
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
```

```javascript
function myFunc() {}

// Function prototype chain:
// myFunc → Function.prototype → Object.prototype → null

console.log(myFunc.call); // from Function.prototype
console.log(myFunc.toString); // from Object.prototype (overridden)

console.log(Object.getPrototypeOf(myFunc) === Function.prototype); // true
```

### Performance Considerations

```javascript
// Property lookup travels up the chain
const obj = Object.create(
  Object.create(Object.create(Object.create({ deepProperty: "value" })))
);

// This requires 4 prototype lookups!
console.log(obj.deepProperty); // Slower than direct property

// For frequently accessed properties, cache them:
obj.cachedProperty = obj.deepProperty; // Now it's fast
```

### Checking the Prototype Chain

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);

// instanceof - checks if prototype is in chain
console.log(rabbit instanceof Object); // true

// isPrototypeOf - checks if object is in another's chain
console.log(animal.isPrototypeOf(rabbit)); // true
console.log(Object.prototype.isPrototypeOf(rabbit)); // true

// in operator - checks own properties AND prototype chain
console.log("eats" in rabbit); // true
console.log("toString" in rabbit); // true

// hasOwnProperty - checks ONLY own properties
console.log(rabbit.hasOwnProperty("eats")); // false
```

### Shadowing Properties

When you create a property that exists in the prototype chain:

```javascript
const parent = {
  name: "Parent",
  greet() {
    console.log(`Hello from ${this.name}`);
  },
};

const child = Object.create(parent);
child.name = "Child"; // Shadows parent.name

console.log(child.name); // "Child" (own property)
console.log(parent.name); // "Parent" (unchanged)

child.greet(); // "Hello from Child" (method inherited, but 'this' refers to child)
```

---

## Constructor Functions

### What are Constructor Functions?

Before ES6 classes, constructor functions were the primary way to create objects with shared behavior.

```javascript
function Person(name, age) {
  // 'this' refers to the new object being created
  this.name = name;
  this.age = age;
}

// Methods go on the prototype (shared by all instances)
Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

Person.prototype.getAge = function () {
  return this.age;
};

// Create instances with 'new'
const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

alice.greet(); // "Hello, I'm Alice"
console.log(bob.getAge()); // 25
```

### What Happens with `new`

When you call a function with `new`:

```javascript
function Person(name) {
  // 1. A new empty object is created
  // 2. The new object's [[Prototype]] is set to Person.prototype
  // 3. 'this' is bound to the new object
  this.name = name;
  // 4. The new object is returned (unless you explicitly return an object)
}

const person = new Person("Alice");
```

**Equivalent to**:

```javascript
function Person(name) {
  // const this = Object.create(Person.prototype); // Step 1-2
  this.name = name;
  // return this; // Step 4
}
```

### The `constructor` Property

Every prototype has a `constructor` property that points back to the constructor function:

```javascript
function Person(name) {
  this.name = name;
}

console.log(Person.prototype.constructor === Person); // true

const alice = new Person("Alice");
console.log(alice.constructor === Person); // true (inherited)

// You can use constructor to create new instances
const bob = new alice.constructor("Bob");
console.log(bob.name); // "Bob"
```

### Instance vs Prototype Properties

```javascript
function Dog(name) {
  this.name = name; // Instance property (unique to each instance)
  this.bark = function () {
    // ❌ BAD: Creates new function for each instance
    console.log("Woof!");
  };
}

Dog.prototype.species = "Canine"; // Prototype property (shared)
Dog.prototype.eat = function () {
  // ✅ GOOD: Shared method
  console.log(`${this.name} is eating`);
};

const dog1 = new Dog("Rex");
const dog2 = new Dog("Max");

console.log(dog1.name === dog2.name); // false (different values)
console.log(dog1.species === dog2.species); // true (same reference)
console.log(dog1.eat === dog2.eat); // true (same function reference)
console.log(dog1.bark === dog2.bark); // false (different function instances)
```

### Prototype Replacement Warning

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hello");
};

const alice = new Person("Alice");

// ❌ WRONG: Completely replacing prototype
Person.prototype = {
  newMethod() {
    console.log("New method");
  },
};

alice.greet(); // Still works (alice still points to old prototype)

const bob = new Person("Bob");
bob.newMethod(); // Works
bob.greet(); // ERROR: greet doesn't exist on new prototype

// ✅ CORRECT: Maintain constructor reference
Person.prototype = {
  constructor: Person,
  newMethod() {
    console.log("New method");
  },
};
```

### Built-in Constructor Functions

```javascript
// String constructor
const str1 = "hello";
const str2 = new String("hello");

console.log(typeof str1); // "string" (primitive)
console.log(typeof str2); // "object" (wrapper object)

// They share the same prototype
console.log(Object.getPrototypeOf(str1) === String.prototype); // true
console.log(Object.getPrototypeOf(str2) === String.prototype); // true

// Primitives can access prototype methods via auto-boxing
console.log("hello".toUpperCase()); // "HELLO"

// Other built-in constructors
new Array(); // []
new Object(); // {}
new Function(); // function() {}
new Date(); // current date
new RegExp("pattern"); // /pattern/
```

---

## Object Creation Patterns

### 1. Object Literal

```javascript
const person = {
  name: "Alice",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

// Simple, but no way to create multiple similar objects
```

### 2. Factory Pattern

```javascript
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet() {
      console.log(`Hello, I'm ${this.name}`);
    },
  };
}

const alice = createPerson("Alice", 30);
const bob = createPerson("Bob", 25);

// ❌ Problem: Methods are duplicated for each object
console.log(alice.greet === bob.greet); // false
```

### 3. Constructor Pattern

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

// ✅ Methods are shared
console.log(alice.greet === bob.greet); // true
```

### 4. Object.create() Pattern

```javascript
const personPrototype = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

function createPerson(name, age) {
  const person = Object.create(personPrototype);
  person.name = name;
  person.age = age;
  return person;
}

const alice = createPerson("Alice", 30);
alice.greet(); // "Hello, I'm Alice"
```

### 5. OLOO (Objects Linked to Other Objects)

```javascript
const PersonProto = {
  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

const alice = Object.create(PersonProto).init("Alice", 30);
const bob = Object.create(PersonProto).init("Bob", 25);

alice.greet(); // "Hello, I'm Alice"
```

### Comparison

| Pattern             | Pros                           | Cons                                 |
| ------------------- | ------------------------------ | ------------------------------------ |
| **Object Literal**  | Simple, readable               | Not reusable                         |
| **Factory**         | Easy to understand             | Methods duplicated, no `instanceof`  |
| **Constructor**     | True instances, shared methods | Verbose syntax                       |
| **Object.create()** | Flexible, clear prototype      | No automatic initialization          |
| **OLOO**            | Clean, no `new` keyword        | Different from class-based languages |

---

## ES6 Classes

### Why Classes Were Introduced

Classes provide a cleaner, more intuitive syntax for creating constructor functions and setting up inheritance. **They are syntactic sugar over prototypes.**

### Basic Class Syntax

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }

  getAge() {
    return this.age;
  }
}

const alice = new Person("Alice", 30);
alice.greet(); // "Hello, I'm Alice"
```

**Under the hood**, this is equivalent to:

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

Person.prototype.getAge = function () {
  return this.age;
};
```

### Classes ARE Functions

```javascript
class Person {}

console.log(typeof Person); // "function"
console.log(Person.prototype.constructor === Person); // true

// Can still add to prototype
Person.prototype.newMethod = function () {
  console.log("New method");
};
```

### Class Features

#### 1. Constructor

```javascript
class Person {
  constructor(name) {
    this.name = name;
    console.log("Person created");
  }
}

const alice = new Person("Alice"); // "Person created"
```

#### 2. Methods (on prototype)

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }
}

const calc = new Calculator();
console.log(calc.add === Calculator.prototype.add); // true (shared)
```

#### 3. Getters and Setters

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value < 0) {
      throw new Error("Radius cannot be negative");
    }
    this._radius = value;
  }

  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
circle.radius = 10;
console.log(circle.area); // 314.159...
```

**Prototype equivalent**:

```javascript
Object.defineProperty(Circle.prototype, "area", {
  get() {
    return Math.PI * this._radius ** 2;
  },
});
```

#### 4. Static Methods

Static methods belong to the class itself, not instances.

```javascript
class MathUtil {
  static add(a, b) {
    return a + b;
  }

  static PI = 3.14159;
}

console.log(MathUtil.add(5, 3)); // 8
console.log(MathUtil.PI); // 3.14159

const util = new MathUtil();
// util.add(); // ERROR: not available on instances
```

**Prototype equivalent**:

```javascript
function MathUtil() {}

MathUtil.add = function (a, b) {
  return a + b;
};
```

#### 5. Private Fields and Methods (ES2022)

```javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  #validate(amount) {
    // Private method
    return amount > 0 && amount <= this.#balance;
  }

  withdraw(amount) {
    if (this.#validate(amount)) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.withdraw(100);
console.log(account.balance); // 900
// console.log(account.#balance); // SyntaxError
```

#### 6. Class Fields (ES2022)

```javascript
class Counter {
  // Public field
  count = 0;

  // Public method
  increment() {
    this.count++;
  }
}

const counter = new Counter();
console.log(counter.count); // 0
```

**Difference from constructor**:

```javascript
class Example {
  // Field - created for EACH instance BEFORE constructor
  value = 10;

  constructor() {
    console.log(this.value); // 10
  }
}
```

### Class Expressions

```javascript
// Named
const Person = class PersonClass {
  constructor(name) {
    this.name = name;
  }
};

// Anonymous
const Animal = class {
  constructor(type) {
    this.type = type;
  }
};

// Immediately invoked
const instance = new (class {
  constructor() {
    this.created = true;
  }
})();
```

### Class vs Constructor Function: Key Differences

| Feature                   | Constructor Function    | ES6 Class         |
| ------------------------- | ----------------------- | ----------------- |
| **Syntax**                | function Person() {}    | class Person {}   |
| **Calling without `new`** | Works (but problematic) | TypeError         |
| **Method enumeration**    | Enumerable              | Non-enumerable    |
| **Strict mode**           | Optional                | Always strict     |
| **Hoisting**              | Hoisted                 | Not hoisted (TDZ) |
| **typeof**                | "function"              | "function"        |

```javascript
// Constructor can be called without 'new' (bad)
function Person(name) {
  this.name = name;
}
Person("Alice"); // Works (pollutes global)

// Class must be called with 'new'
class Animal {
  constructor(type) {
    this.type = type;
  }
}
Animal("Dog"); // TypeError: Class constructor Animal cannot be invoked without 'new'
```

---

## Inheritance

### Prototypal Inheritance (Pre-ES6)

```javascript
// Parent constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(`${this.name} is eating`);
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add child-specific methods
Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Rex", "Labrador");
dog.eat(); // "Rex is eating" (inherited)
dog.bark(); // "Rex barks" (own method)
```

**Prototype chain**:

```
dog → Dog.prototype → Animal.prototype → Object.prototype → null
```

### Class Inheritance with `extends`

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Must call parent constructor first
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Rex", "Labrador");
dog.eat(); // "Rex is eating"
dog.bark(); // "Rex barks"
```

### The `super` Keyword

#### In Constructor

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // super() MUST be called before accessing 'this'
    // super(name); // If this line is commented, next line throws error
    super(name);
    this.breed = breed;
  }
}
```

#### In Methods

```javascript
class Animal {
  speak() {
    return "Some sound";
  }
}

class Dog extends Animal {
  speak() {
    const parentSound = super.speak(); // Call parent method
    return `${parentSound} and barks`;
  }
}

const dog = new Dog();
console.log(dog.speak()); // "Some sound and barks"
```

#### In Static Methods

```javascript
class Parent {
  static greet() {
    return "Hello from Parent";
  }
}

class Child extends Parent {
  static greet() {
    return super.greet() + " and Child";
  }
}

console.log(Child.greet()); // "Hello from Parent and Child"
```

### Multiple Levels of Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} moves`);
  }
}

class Mammal extends Animal {
  constructor(name, hasFur) {
    super(name);
    this.hasFur = hasFur;
  }

  feedMilk() {
    console.log(`${this.name} feeds milk`);
  }
}

class Dog extends Mammal {
  constructor(name, breed) {
    super(name, true);
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Rex", "Labrador");
dog.move(); // From Animal
dog.feedMilk(); // From Mammal
dog.bark(); // From Dog
```

**Prototype chain**:

```
dog → Dog.prototype → Mammal.prototype → Animal.prototype → Object.prototype → null
```

### Method Overriding

```javascript
class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak() {
    super.speak(); // Call parent method
    console.log("Cat meows");
  }
}

const dog = new Dog();
dog.speak(); // "Dog barks"

const cat = new Cat();
cat.speak();
// "Animal makes a sound"
// "Cat meows"
```

### Checking Inheritance

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

// instanceof - checks prototype chain
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true

// isPrototypeOf
console.log(Dog.prototype.isPrototypeOf(dog)); // true
console.log(Animal.prototype.isPrototypeOf(dog)); // true

// Check if class extends another
console.log(Object.getPrototypeOf(Dog) === Animal); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
```

### Inheriting from Built-in Types

```javascript
class MyArray extends Array {
  first() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }
}

const arr = new MyArray(1, 2, 3);
console.log(arr.first()); // 1
console.log(arr.last()); // 3
arr.push(4);
console.log(arr); // MyArray [1, 2, 3, 4]
```

### Mixins (Multiple Inheritance Pattern)

JavaScript doesn't support multiple inheritance, but you can use mixins:

```javascript
// Mixin objects
const canEat = {
  eat() {
    console.log(`${this.name} is eating`);
  },
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  },
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming`);
  },
};

// Apply mixins to a class
class Person {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Person.prototype, canEat, canWalk);

const person = new Person("Alice");
person.eat(); // "Alice is eating"
person.walk(); // "Alice is walking"

// Mixin function
function mixin(target, ...sources) {
  Object.assign(target.prototype, ...sources);
}

class Duck {
  constructor(name) {
    this.name = name;
  }
}

mixin(Duck, canWalk, canSwim);

const duck = new Duck("Donald");
duck.walk(); // "Donald is walking"
duck.swim(); // "Donald is swimming"
```

### Composition over Inheritance

```javascript
// Instead of complex inheritance hierarchies,
// use composition:

class Engine {
  start() {
    console.log("Engine started");
  }
}

class Wheels {
  roll() {
    console.log("Wheels rolling");
  }
}

class Car {
  constructor() {
    this.engine = new Engine();
    this.wheels = new Wheels();
  }

  drive() {
    this.engine.start();
    this.wheels.roll();
  }
}

const car = new Car();
car.drive();
// "Engine started"
// "Wheels rolling"
```

---

## Mastery Checklist

### Understanding Prototypes

- [ ] I can explain what a prototype is
- [ ] I understand the difference between `[[Prototype]]` and `prototype` property
- [ ] I know how to access an object's prototype (getPrototypeOf)
- [ ] I can set an object's prototype (setPrototypeOf, Object.create)
- [ ] I understand how property lookup works with prototypes
- [ ] I know that writing to properties never affects the prototype
- [ ] I can explain why methods should be on the prototype
- [ ] I understand that almost all objects inherit from Object.prototype

### Prototype Chain

- [ ] I can explain what the prototype chain is
- [ ] I can visualize the prototype chain for any object
- [ ] I understand how inheritance is implemented via the chain
- [ ] I know that the chain ends with null
- [ ] I can trace property lookups through the chain
- [ ] I understand shadowing and how properties override prototype properties
- [ ] I know how to check if a property is own or inherited (hasOwnProperty)
- [ ] I can use `in`, `hasOwnProperty`, and `isPrototypeOf` correctly
- [ ] I understand the performance implications of deep chains

### Constructor Functions

- [ ] I can create constructor functions correctly
- [ ] I understand what happens when using the `new` keyword
- [ ] I know where to put shared methods (on prototype)
- [ ] I understand the `constructor` property
- [ ] I can explain instance vs prototype properties
- [ ] I know the dangers of replacing the prototype object
- [ ] I understand built-in constructor functions
- [ ] I can implement inheritance with constructor functions

### ES6 Classes

- [ ] I understand that classes are syntactic sugar over prototypes
- [ ] I can create classes with constructors and methods
- [ ] I know that class methods go on the prototype
- [ ] I understand getters and setters
- [ ] I can create and use static methods
- [ ] I know how to use private fields (#)
- [ ] I understand class fields and when they're initialized
- [ ] I know the key differences between classes and constructor functions
- [ ] I understand that classes must be called with `new`

### Inheritance

- [ ] I can implement inheritance with constructor functions
- [ ] I can use `extends` to create class hierarchies
- [ ] I understand when and how to use `super()`
- [ ] I can call parent methods with `super.method()`
- [ ] I know how to check inheritance with `instanceof`
- [ ] I can override parent methods
- [ ] I understand multiple levels of inheritance
- [ ] I know how to inherit from built-in types
- [ ] I can implement mixins for multiple inheritance
- [ ] I understand when to prefer composition over inheritance

### Combined Understanding

- [ ] I can explain how classes use prototypes under the hood
- [ ] I can convert between constructor functions and classes
- [ ] I understand the complete prototype chain for class instances
- [ ] I know how static methods relate to the prototype
- [ ] I can debug prototype-related issues
- [ ] I understand performance implications of different patterns

### Testing Your Knowledge

**Challenge 1**: What will this output?

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.species = "Unknown";

const cat = new Animal("Whiskers");
const dog = new Animal("Rex");

cat.species = "Feline";

console.log(cat.species);
console.log(dog.species);
console.log(Animal.prototype.species);
```

<details>
<summary>Click to see the answer</summary>

```
Feline
Unknown
Unknown
```

**Explanation**:

- `cat.species = 'Feline'` creates a new property on `cat` (shadowing)
- `dog.species` still reads from the prototype (no own property)
- Prototype remains unchanged
</details>

**Challenge 2**: Fix the inheritance

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Rex", "Labrador");
dog.bark(); // Works
dog.speak(); // ERROR - not defined
```

<details>
<summary>Click to see the solution</summary>

```javascript
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Rex", "Labrador");
dog.bark(); // "Rex barks"
dog.speak(); // "Rex makes a sound"
```

**What was missing**:

1. Calling parent constructor with `Animal.call(this, name)`
2. Setting up prototype chain with `Object.create(Animal.prototype)`
3. Restoring constructor reference
</details>

**Challenge 3**: Predict the prototype chain

```javascript
class A {}
class B extends A {}
class C extends B {}

const instance = new C();

// What is the prototype chain?
```

<details>
<summary>Click to see the answer</summary>

```
instance
  → C.prototype
  → B.prototype
  → A.prototype
  → Object.prototype
  → null
```

**How to verify**:

```javascript
console.log(Object.getPrototypeOf(instance) === C.prototype); // true
console.log(Object.getPrototypeOf(C.prototype) === B.prototype); // true
console.log(Object.getPrototypeOf(B.prototype) === A.prototype); // true
console.log(Object.getPrototypeOf(A.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true
```

</details>

**Challenge 4**: What's the output?

```javascript
class Parent {
  constructor() {
    this.name = "Parent";
  }

  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.name = "Child";
  }
}

const child = new Child();
console.log(child.getName());
console.log(Object.getPrototypeOf(child).getName());
```

<details>
<summary>Click to see the answer</summary>

```
Child
undefined
```

**Explanation**:

- `child.getName()` - `this` refers to `child` instance, which has `name = 'Child'`
- `Object.getPrototypeOf(child).getName()` - `this` refers to `Child.prototype`, which doesn't have a `name` property

**Important**: The method is on the prototype, but `this` depends on how it's called!

</details>

**Challenge 5**: Understanding private fields

```javascript
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();

// Will this work?
const obj = { getCount: counter.getCount };
console.log(obj.getCount());
```

<details>
<summary>Click to see the answer</summary>

**ERROR**: `TypeError: Cannot read private member #count from an object whose class did not declare it`

**Explanation**: Private fields are tied to the class instance. When you call `obj.getCount()`, `this` becomes `obj`, which doesn't have the private `#count` field.

**Fix**:

```javascript
const obj = { getCount: counter.getCount.bind(counter) };
// OR
const getCount = () => counter.getCount();
```

</details>

---

## Resources

### Official Documentation

- [MDN: Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [MDN: Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [MDN: Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

### In-Depth Articles

- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/README.md)
- [JavaScript.info: Prototypes, inheritance](https://javascript.info/prototypes)
- [JavaScript.info: Classes](https://javascript.info/classes)
- [Understanding Prototypes in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-prototypes-delegation-in-javascript)

### Videos & Tutorials

- [JavaScript Prototype in Plain Language](https://www.youtube.com/watch?v=riDVvXZ_Kb4)
- [Object Creation in JavaScript](https://www.youtube.com/watch?v=GhbhD1HR5vk)
- [Prototypes in JavaScript - FunFunFunction](https://www.youtube.com/watch?v=riDVvXZ_Kb4)
- [ES6 Classes Tutorial](https://www.youtube.com/watch?v=2ZphE5HcQPQ)

### Interactive Learning

- [JavaScript Visualizer - Prototypes](https://www.jsv9000.app/)
- [Visualizing JavaScript Prototypes](http://www.objectplayground.com/)

### Books

- "You Don't Know JS: this & Object Prototypes" by Kyle Simpson
- "JavaScript: The Good Parts" by Douglas Crockford
- "Eloquent JavaScript" by Marijn Haverbeke (Chapter 6)

### Practice

- [JavaScript Prototype Exercises](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
- [Exercism - JavaScript Track](https://exercism.org/tracks/javascript)

---

**Last Updated**: January 2025
