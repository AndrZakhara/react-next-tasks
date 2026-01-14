// ================================
// Prototypes, Prototype Chain, Classes
// ================================

// Task: 1, Basic prototype lookup
// Expected:
// 1) Predict output
// 2) Explain how prototype lookup works
const obj = {
  a: 1,
};

console.log(obj.a);
console.log(obj.toString);

// Task: 2, Manual __proto__ usage
// Expected:
// Explain why this works and why __proto__ is discouraged
const parent = {
  greet() {
    console.log("hello");
  },
};

const child = {
  name: "child",
};

child.__proto__ = parent;
child.greet();

// Task: 3, Object.create
// Expected:
// Explain prototype assignment and lookup
const proto = {
  say() {
    console.log("hi");
  },
};

const obj2 = Object.create(proto);
obj2.say();

// Task: 4, Prototype chain depth
// Expected:
// Explain how JS walks the prototype chain
const a = {
  x: 1,
};

const b = Object.create(a);
const c = Object.create(b);

console.log(c.x);

// Task: 5, Property shadowing
// Expected:
// Predict output and explain shadowing vs mutation
const base = {
  value: 1,
};

const derived = Object.create(base);
derived.value = 2;

console.log(base.value);
console.log(derived.value);

// Task: 6, Constructor function
// Expected:
// Explain what `new` does step by step
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

const p = new Person("Alice");
p.sayName();

// Task: 7, Missing new keyword
// Expected:
// Explain what breaks and why (strict vs non-strict)
function User(name) {
  this.name = name;
}

const u = User("Bob");
console.log(u);

// Task: 8, Prototype method sharing
// Expected:
// Explain why method is not duplicated per instance
function Counter() {
  this.count = 0;
}

Counter.prototype.inc = function () {
  this.count++;
};

const c1 = new Counter();
const c2 = new Counter();

console.log(c1.inc === c2.inc);

// Task: 9, Overwriting prototype
// Expected:
// Explain what happens to constructor and instances
function Animal(name) {
  this.name = name;
}

Animal.prototype = {
  speak() {
    console.log(this.name);
  },
};

const dog = new Animal("Dog");
dog.speak();

// Task: 10, constructor property
// Expected:
// Explain why constructor may be incorrect
console.log(dog.constructor);

// Task: 11, Class vs constructor function
// Expected:
// Explain how class maps to prototype
class Car {
  drive() {
    console.log("drive");
  }
}

const car = new Car();
car.drive();

// Task: 12, Methods on prototype
// Expected:
// Verify where methods are stored
console.log(car.hasOwnProperty("drive"));
console.log(Object.getPrototypeOf(car).hasOwnProperty("drive"));

// Task: 13, Class field vs prototype method
// Expected:
// Explain memory and prototype differences
class Example {
  value = 1;

  method() {
    console.log(this.value);
  }
}

const e1 = new Example();
const e2 = new Example();

console.log(e1.method === e2.method);

// Task: 14, Inheritance with extends
// Expected:
// Explain prototype chain between instances and classes
class Base {
  baseMethod() {}
}

class Derived extends Base {
  derivedMethod() {}
}

const d = new Derived();
console.log(d instanceof Derived);
console.log(d instanceof Base);

// Task: 15, super and prototype chain
// Expected:
// Explain how super resolves methods
class Parent {
  say() {
    console.log("parent");
  }
}

class Child extends Parent {
  say() {
    super.say();
    console.log("child");
  }
}

new Child().say();

// Task: 16, Mutating prototype after instantiation
// Expected:
// Explain effect on existing instances
function Box() {}
const b1 = new Box();

Box.prototype.open = function () {
  console.log("open");
};

b1.open();

// Task: 17, Prototype vs instance property
// Expected:
// Explain lookup order and mutation behavior
function Bag() {}

Bag.prototype.items = [];

const bag1 = new Bag();
const bag2 = new Bag();

bag1.items.push("apple");
console.log(bag2.items);

// Task: 18, Fix shared state bug
// Expected:
// Refactor to avoid shared mutable prototype state
function SafeBag() {
  this.items = [];
}

// Task: 19, instanceof vs prototype
// Expected:
// Explain difference and limitations
function A() {}
const a1 = new A();

console.log(a1 instanceof A);
console.log(A.prototype.isPrototypeOf(a1));

// Task: 20, Design question
// Expected:
// Explain when to use:
// - plain objects
// - constructor functions
// - classes
// - composition over inheritance
class Store {
  constructor() {
    this.state = {};
  }

  getState() {
    return this.state;
  }

  setState(next) {
    this.state = next;
  }
}
