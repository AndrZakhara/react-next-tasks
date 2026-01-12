# Event Loop: Node.js vs Browser

## What is the Event Loop?

The event loop is a fundamental mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It continuously monitors the call stack and task queues, executing code, collecting and processing events, and executing queued sub-tasks.

## How the Event Loop Works

### Basic Concepts

**Call Stack**: Where JavaScript executes synchronous code. Functions are pushed onto the stack when called and popped off when they return.

**Task Queues**: Where asynchronous callbacks wait to be executed. The event loop checks these queues when the call stack is empty.

**Event Loop Cycle**: The process of checking the call stack and moving tasks from queues to the stack for execution.

### Execution Flow

1. Execute all synchronous code (call stack)
2. When call stack is empty, check task queues
3. Move tasks from queues to call stack
4. Repeat

## Node.js Event Loop

Node.js uses the **libuv** library for its event loop implementation, which provides a more complex multi-phase architecture.

### Phases of Node.js Event Loop

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

#### 1. **Timers Phase**

Executes callbacks scheduled by `setTimeout()` and `setInterval()`.

```javascript
setTimeout(() => {
  console.log("Timer executed");
}, 100);
```

#### 2. **Pending Callbacks Phase**

Executes I/O callbacks deferred from the previous cycle (mostly internal operations).

#### 3. **Idle, Prepare Phase**

Used internally by Node.js.

#### 4. **Poll Phase**

Retrieves new I/O events and executes I/O callbacks. This is where Node.js spends most of its time.

```javascript
fs.readFile("/file.txt", (err, data) => {
  console.log("File read complete");
});
```

#### 5. **Check Phase**

Executes `setImmediate()` callbacks.

```javascript
setImmediate(() => {
  console.log("Immediate executed");
});
```

#### 6. **Close Callbacks Phase**

Executes close event callbacks like `socket.on('close')`.

### Microtasks in Node.js

Between each phase, Node.js processes **microtasks**:

- `process.nextTick()` queue (highest priority)
- Promise callbacks (then/catch/finally)

```javascript
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("nextTick"));
console.log("Sync");

// Output:
// Sync
// nextTick
// Promise
```

## Browser Event Loop

The browser event loop is simpler than Node.js and focuses on rendering and user interactions.

### Task Types

#### 1. **Macrotasks (Task Queue)**

- `setTimeout()` / `setInterval()`
- I/O operations
- UI rendering
- User interactions (click, scroll, etc.)
- `MessageChannel`

```javascript
setTimeout(() => {
  console.log("Macrotask");
}, 0);
```

#### 2. **Microtasks (Microtask Queue)**

- Promise callbacks (.then, .catch, .finally)
- `MutationObserver`
- `queueMicrotask()`

```javascript
Promise.resolve().then(() => {
  console.log("Microtask");
});
```

### Browser Event Loop Execution Order

1. Execute one macrotask from the task queue
2. Execute ALL microtasks until the microtask queue is empty
3. Render updates (if needed)
4. Repeat

```javascript
console.log("1: Sync");

setTimeout(() => console.log("2: Timeout"), 0);

Promise.resolve()
  .then(() => console.log("3: Promise 1"))
  .then(() => console.log("4: Promise 2"));

console.log("5: Sync");

// Output:
// 1: Sync
// 5: Sync
// 3: Promise 1
// 4: Promise 2
// 2: Timeout
```

## Key Differences

| Feature                 | Node.js                               | Browser                         |
| ----------------------- | ------------------------------------- | ------------------------------- |
| **Implementation**      | libuv (multi-phase)                   | Single task queue model         |
| **Phases**              | 6 distinct phases                     | Macrotask → Microtasks → Render |
| **Immediate Execution** | `setImmediate()`                      | Not available                   |
| **Next Tick**           | `process.nextTick()`                  | Not available                   |
| **Rendering**           | No rendering                          | Includes rendering steps        |
| **I/O**                 | File system, network, child processes | Network only (fetch/XHR)        |
| **Timers Priority**     | Separate phase                        | Part of macrotask queue         |

## Practical Examples

### Node.js Example

```javascript
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

// Output (typical):
// nextTick
// Promise
// setTimeout
// setImmediate
// (setTimeout and setImmediate order may vary)
```

### Browser Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => console.log("Promise in Timeout"));
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    setTimeout(() => console.log("Timeout in Promise"), 0);
  })
  .then(() => console.log("Promise 2"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise in Timeout
// Timeout in Promise
```

## Best Practices

1. **Avoid Blocking the Event Loop**: Don't perform heavy synchronous operations. Use async alternatives or worker threads.

2. **Understand Priority**: Know that microtasks always execute before the next macrotask.

3. **Be Careful with nextTick**: In Node.js, excessive `process.nextTick()` calls can starve the event loop.

4. **Use setImmediate in Node.js**: For deferring work after I/O operations, prefer `setImmediate()` over `setTimeout(fn, 0)`.

5. **Consider Rendering in Browsers**: Long-running microtasks can delay rendering, causing UI jank.

## Common Pitfalls

### Starving the Event Loop

```javascript
// BAD: Infinite microtask loop
function recursive() {
  Promise.resolve().then(recursive);
}
recursive(); // Event loop can't progress to macrotasks!
```

### Unexpected Timing

```javascript
// Promises execute before setTimeout, even with 0 delay
setTimeout(() => console.log("Timer"), 0);
Promise.resolve().then(() => console.log("Promise"));
// Always: Promise, then Timer
```

## Event Loop Mastery Checklist

Use this checklist to verify your understanding of the event loop:

### Core Concepts

- [ ] I understand that JavaScript is single-threaded
- [ ] I can explain what the call stack is and how it works
- [ ] I know the difference between synchronous and asynchronous code
- [ ] I understand why we need an event loop
- [ ] I can explain what non-blocking I/O means

### Browser Event Loop

- [ ] I know what macrotasks are and can name at least 3 examples
- [ ] I know what microtasks are and can name at least 2 examples
- [ ] I understand that microtasks execute before the next macrotask
- [ ] I can predict the execution order of mixed sync/async code
- [ ] I understand when browser rendering happens in the event loop
- [ ] I know that Promises create microtasks
- [ ] I can explain what `queueMicrotask()` does

### Node.js Event Loop

- [ ] I can name all 6 phases of the Node.js event loop
- [ ] I understand what happens in the timers phase
- [ ] I know what the poll phase does
- [ ] I can explain the difference between `setImmediate()` and `setTimeout()`
- [ ] I understand `process.nextTick()` and its priority
- [ ] I know the order: nextTick → Promises → other callbacks
- [ ] I can explain when close callbacks execute
- [ ] I understand that microtasks run between each phase

### Practical Knowledge

- [ ] I can write code that demonstrates microtask vs macrotask order
- [ ] I know how to avoid blocking the event loop
- [ ] I understand the dangers of infinite microtask loops
- [ ] I can debug timing issues in asynchronous code
- [ ] I know when to use `setImmediate()` vs `setTimeout()` in Node.js
- [ ] I understand how to keep the UI responsive in browsers
- [ ] I can explain why `setTimeout(fn, 0)` doesn't execute immediately

### Advanced Understanding

- [ ] I know the key differences between Node.js and browser event loops
- [ ] I understand how worker threads relate to the event loop
- [ ] I can optimize code to work efficiently with the event loop
- [ ] I know how to profile event loop performance
- [ ] I understand how async/await relates to Promises and microtasks
- [ ] I can explain event loop starvation and how to prevent it

### Testing Your Knowledge

Try to predict the output of this code before running it:

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);
setTimeout(() => console.log("3"), 0);

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});

Promise.resolve().then(() => console.log("6"));

console.log("7");
```

<details>
<summary>Click to see the answer</summary>

```
1
7
4
6
2
3
5
```

**Explanation**: Synchronous code (1, 7) runs first, then all microtasks (4, 6), then macrotasks in order (2, 3, 5).

</details>

## Resources

- [Node.js Event Loop Documentation](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [MDN: Concurrency Model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Jake Archibald: In The Loop (Video)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
- [libuv Documentation](http://docs.libuv.org/)
- [HTML Living Standard: Event Loop Processing Model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

---
