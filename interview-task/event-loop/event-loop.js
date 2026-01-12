// ================================
// Event Loop — Live Coding Tasks
// Middle + Senior
// ================================

// Task: 1, Promise vs setTimeout
// Expected: Predict the execution order and explain microtask vs macrotask behavior
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// Task: 2, Multiple .then()
// Expected: Predict output order and explain Promise chaining and microtask queue
Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2));

console.log(3);

// Task: 3, Nested setTimeout
// Expected: Predict output order and explain timer queue scheduling
setTimeout(() => {
  console.log("A");
  setTimeout(() => console.log("B"), 0);
}, 0);

setTimeout(() => console.log("C"), 0);

// Task: 4, async / await basics
// Expected: Predict execution order and explain how await splits execution
async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

console.log(3);
test();
console.log(4);

// Task: 5, Browser click handler
// Expected: Predict output order after click and explain event handling + microtasks
button.addEventListener("click", () => {
  console.log("click");
  Promise.resolve().then(() => console.log("promise"));
  setTimeout(() => console.log("timeout"), 0);
});

// Task: 6, Microtask starvation
// Expected: Explain what happens and why this can freeze the application
function loop() {
  Promise.resolve().then(loop);
}
loop();

// Task: 7, queueMicrotask vs Promise
// Expected: Predict order and explain queueMicrotask vs Promise.then
queueMicrotask(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
console.log("C");

// Task: 8, requestAnimationFrame
// Expected: Predict execution order in browser and explain rendering phase
requestAnimationFrame(() => console.log("A"));
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));

// Task: 9, Blocking Event Loop
// Expected: Explain why timeout is delayed and real-world consequences
setTimeout(() => console.log("timeout"), 0);

const start = Date.now();
while (Date.now() - start < 1000) {}

console.log("end");

// Task: 10, Promise error flow
// Expected: Predict behavior and explain error propagation in Promise chains
Promise.resolve()
  .then(() => {
    throw new Error("fail");
  })
  .then(() => console.log("ok"))
  .catch(() => console.log("caught"));

// ================================
// Senior Level
// ================================

// Task: 11, setTimeout vs setImmediate (Node)
// Expected: Explain why execution order is not guaranteed
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));

// Task: 12, process.nextTick vs Promise (Node)
// Expected: Predict order and explain nextTick priority and risks
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("sync");

// Task: 13, I/O phase ordering (Node)
// Expected: Predict execution order and explain Event Loop phases
const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});

// Task: 14, nextTick starvation (Node)
// Expected: Explain what happens and why timers never execute
function tick() {
  process.nextTick(tick);
}
tick();

setTimeout(() => console.log("timeout"), 0);

// Task: 15, Node vs Browser differences
// Expected: Explain why behavior appears similar but internals differ
setTimeout(() => console.log(1), 0);
Promise.resolve().then(() => console.log(2));

// Task: 16, Infinite microtasks
// Expected: Explain whether the timeout will run and why
Promise.resolve().then(function recurse() {
  Promise.resolve().then(recurse);
});

setTimeout(() => console.log("timeout"), 0);

// Task: 17, Chunking CPU work (Browser)
// Expected: Explain how this avoids blocking and keeps UI responsive
function process(items) {
  function chunk() {
    const part = items.splice(0, 100);
    part.forEach((x) => x * x);
    if (items.length) {
      setTimeout(chunk);
    }
  }
  chunk();
}

// Task: 18, Web Worker Event Loop
// Expected: Explain differences between Worker and main thread Event Loop
self.onmessage = () => {
  console.log("worker");
  setTimeout(() => console.log("timeout"), 0);
};

// Task: 19, Blocking server route (Node)
// Expected: Identify the problem and propose a non-blocking solution
app.get("/data", async (req, res) => {
  heavySyncCalculation();
  res.send("ok");
});

// Task: 20, Task Scheduler design
// Expected: Explain how concurrency limit, queueing, and non-blocking execution work
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  run(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    if (this.running >= this.limit || !this.queue.length) return;
    this.running++;
    const task = this.queue.shift();
    task().finally(() => {
      this.running--;
      this.next();
    });
  }
}
