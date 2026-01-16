// =======================================
// Async JavaScript — Live Coding Tasks
// Promises, async/await, Error Handling
// =======================================

// Instructions:
// 1. Predict the output BEFORE running
// 2. Explain WHY it works that way
// 3. Try to answer the follow-up questions
// 4. Then run the code to verify



// ================================
// SECTION 1: Promises — Basics
// ================================

// Task 1: Promise execution order
// Expected output: ?
// Questions:
// - What is the output order?
// - Why does Promise.then() execute before setTimeout?
// - What are microtasks vs macrotasks?

console.log('A');

Promise.resolve().then(() => console.log('B'));

setTimeout(() => console.log('C'), 0);

console.log('D');

// Follow-up: What if we add this?
// queueMicrotask(() => console.log('E'));



// Task 2: Promise chaining
// Expected output: ?
// Questions:
// - What value is logged?
// - How does value propagate through .then() chains?
// - What happens if we don't return in a .then()?

Promise.resolve(1)
  .then(x => x + 1)
  .then(x => {
    return x * 2;
  })
  .then(console.log);

// Follow-up: What if we change the second .then() to:
// .then(x => { x * 2; })  // No return!



// Task 3: Promise rejection handling
// Expected output: ?
// Questions:
// - Which .then() executes?
// - Where is the error caught?
// - What if we remove the .catch()?

Promise.resolve()
  .then(() => {
    throw new Error('fail');
  })
  .then(() => console.log('OK'))
  .catch(() => console.log('ERROR'));

// Follow-up: What happens here?
// Promise.reject('fail')
//   .then(() => console.log('A'), () => console.log('B'))
//   .catch(() => console.log('C'));



// Task 4: Catch doesn't stop chain
// Expected output: ?
// Questions:
// - Does "AFTER" print?
// - What does .catch() return?
// - How can we stop the chain after error?

Promise.reject('error')
  .catch(err => console.log('CAUGHT:', err))
  .then(() => console.log('AFTER'));

// Fix: How to prevent "AFTER" from executing?



// Task 5: Multiple catch blocks
// Expected output: ?
// Questions:
// - Which catch block runs?
// - What if first catch throws?

Promise.reject('fail')
  .catch(err => {
    console.log('Catch 1');
    throw err;
  })
  .catch(err => console.log('Catch 2'));



// ================================
// SECTION 2: async/await Basics
// ================================

// Task 6: async return value
// Expected output: ?
// Questions:
// - What does foo() return?
// - Why is it a Promise?
// - How to get the value 42?

async function foo() {
  return 42;
}

console.log(foo());

// Fix: How to log 42?



// Task 7: await behavior
// Expected output: ?
// Questions:
// - What's the execution order?
// - Does await block or pause?
// - What happens to code after await?

async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('A');
test();
console.log('B');



// Task 8: await vs no await
// Expected output: ?
// Questions:
// - What's the execution order?
// - Why does B print before foo() completes?

async function foo() {
  console.log('foo start');
  await new Promise(r => setTimeout(r, 0));
  console.log('foo end');
}

async function test() {
  console.log('A');
  foo(); // No await!
  console.log('B');
}

test();

// Fix: How to make foo() complete before 'B'?



// Task 9: Multiple awaits
// Expected output: ?
// Questions:
// - How long does this take total?
// - Are these calls sequential or parallel?
// - How to make them parallel?

async function loadData() {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  
  await delay(100); // User data
  await delay(100); // Posts
  await delay(100); // Comments
  
  console.log('Done');
}

loadData();

// Fix: Make it run in ~100ms instead of ~300ms



// ================================
// SECTION 3: Error Handling
// ================================

// Task 10: try/catch with await
// Expected output: ?
// Questions:
// - Is the error caught?
// - Why does try/catch work with await?

async function load() {
  try {
    await Promise.reject('error');
    console.log('After error');
  } catch (e) {
    console.log('Caught:', e);
  }
}

load();



// Task 11: try/catch WITHOUT await
// Expected output: ?
// Questions:
// - Is the error caught?
// - Why doesn't try/catch work here?
// - How to fix it?

function broken() {
  try {
    Promise.reject('error');
  } catch (e) {
    console.log('Caught');
  }
}

broken();

// Fix: How to catch this error?



// Task 12: Error propagation
// Expected output: ?
// Questions:
// - Where is the error caught?
// - How does error bubble through async functions?

async function a() {
  throw new Error('fail');
}

async function b() {
  await a();
}

async function c() {
  await b();
}

c().catch(err => console.log('Handled in c'));



// Task 13: Mixed error handling
// Expected output: ?
// Questions:
// - Which handler catches the error?
// - What if we remove .catch()?

async function test() {
  try {
    return Promise.reject('error');
  } catch (e) {
    console.log('try/catch');
  }
}

test().catch(() => console.log('.catch()'));



// Task 14: Finally block
// Expected output: ?
// Questions:
// - Does finally always execute?
// - What's the execution order?

async function test() {
  try {
    await Promise.reject('error');
  } catch (e) {
    console.log('Caught');
  } finally {
    console.log('Finally');
  }
  console.log('After');
}

test();



// ================================
// SECTION 4: Concurrency Methods
// ================================

// Task 15: Promise.all - fail fast
// Expected output: ?
// Questions:
// - Does it wait for all promises?
// - What about the third promise?
// - When does .catch() execute?

Promise.all([
  Promise.resolve(1),
  Promise.reject('error'),
  new Promise(r => setTimeout(() => r(3), 1000)),
])
  .then(console.log)
  .catch(err => console.log('Failed:', err));



// Task 16: Promise.allSettled
// Expected output: ?
// Questions:
// - What's the structure of results?
// - How is this different from Promise.all?

Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
]).then(results => console.log(results));



// Task 17: Promise.race
// Expected output: ?
// Questions:
// - Which promise wins?
// - What happens to the slower promise?

Promise.race([
  new Promise(r => setTimeout(() => r('Slow'), 100)),
  new Promise(r => setTimeout(() => r('Fast'), 50)),
  new Promise((_, reject) => setTimeout(() => reject('Error'), 75)),
]).then(console.log).catch(console.log);

// Follow-up: What if the error rejects first?



// Task 18: Promise.any
// Expected output: ?
// Questions:
// - What's logged?
// - How is this different from Promise.race?
// - What if all promises reject?

Promise.any([
  Promise.reject('err1'),
  Promise.reject('err2'),
  Promise.resolve('OK'),
]).then(console.log).catch(console.log);



// Task 19: Mixed concurrency
// Challenge: Use the right method for each scenario
// Scenarios:
// A) Load user profile from 3 backup servers (need first success)
// B) Load user, posts, and comments (need all data or nothing)
// C) Load from multiple APIs (want all results, even failures)
// D) Check which server responds fastest

// Implement each:
// const loadProfileFromBackups = async () => { /* use Promise.??? */ };
// const loadAllUserData = async () => { /* use Promise.??? */ };
// const loadFromMultipleAPIs = async () => { /* use Promise.??? */ };
// const checkFastestServer = async () => { /* use Promise.??? */ };



// ================================
// SECTION 5: Async Control Flow
// ================================

// Task 20: Sequential vs Parallel
// Problem: This runs sequentially (slow!)
// Questions:
// - How long does this take?
// - How to make it parallel?

const fetchA = () => new Promise(r => setTimeout(() => r('A'), 100));
const fetchB = () => new Promise(r => setTimeout(() => r('B'), 100));
const fetchC = () => new Promise(r => setTimeout(() => r('C'), 100));

async function loadSequential() {
  const a = await fetchA(); // 100ms
  const b = await fetchB(); // 100ms
  const c = await fetchC(); // 100ms
  return [a, b, c]; // Total: 300ms
}

// Fix: Make it ~100ms total



// Task 21: Loop with async/await
// Problem: This processes items one at a time
// Questions:
// - Is this sequential or parallel?
// - How to process all items in parallel?

const items = [1, 2, 3, 4, 5];
const process = (item) => 
  new Promise(r => setTimeout(() => r(item * 2), 100));

async function processSequential(items) {
  const results = [];
  for (const item of items) {
    const result = await process(item);
    results.push(result);
  }
  return results; // Takes 500ms total
}

// Fix: Make it ~100ms total



// Task 22: Array.map with async
// Problem: This doesn't work as expected!
// Questions:
// - What does this return?
// - Why doesn't await work here?

async function processWithMap(items) {
  return items.map(async item => {
    await process(item);
    return item * 2;
  });
}

processWithMap([1, 2, 3]).then(console.log);

// Fix: Return actual results, not promises



// Task 23: Array.forEach with async
// Problem: forEach doesn't wait!
// Questions:
// - When does "Done" print?
// - Why doesn't this work?

async function processWithForEach(items) {
  items.forEach(async item => {
    await process(item);
    console.log(item);
  });
  console.log('Done');
}

processWithForEach([1, 2, 3]);

// Fix: Make it wait for all items



// Task 24: Conditional async
// Questions:
// - What's the execution flow?
// - Do we always await?

async function conditionalLoad(useCache) {
  let data;
  
  if (useCache) {
    data = getCachedData(); // Synchronous
  } else {
    data = await fetchData(); // Async
  }
  
  return data;
}

// Is this correct? Any issues?



// ================================
// SECTION 6: Advanced Patterns
// ================================

// Task 25: Implement timeout wrapper
// Challenge: Reject promise if it takes too long
// Expected behavior:
// - If promise resolves before timeout, return value
// - If timeout happens first, reject with TimeoutError

function withTimeout(promise, ms) {
  // TODO: Implement
  // Hint: Use Promise.race()
}

// Test:
// withTimeout(fetch('/api/data'), 5000)
//   .then(data => console.log(data))
//   .catch(err => console.log('Timeout or error:', err));



// Task 26: Implement retry logic
// Challenge: Retry failed operations
// Expected behavior:
// - Try operation
// - If fails, retry up to N times
// - Delay between retries
// - Return result or throw final error

async function retry(fn, options = {}) {
  const { retries = 3, delay = 1000 } = options;
  // TODO: Implement
}

// Test:
// const flaky = () => Math.random() > 0.7 
//   ? Promise.resolve('OK') 
//   : Promise.reject('Failed');
// 
// retry(flaky, { retries: 5, delay: 100 })
//   .then(console.log)
//   .catch(console.log);



// Task 27: Implement concurrency limit
// Challenge: Process items with max N concurrent operations
// Expected behavior:
// - Process array of items
// - Max N operations running at once
// - Return all results in order

async function mapWithLimit(items, limit, asyncFn) {
  // TODO: Implement
  // Hint: Track running operations count
}

// Test:
// const items = [1, 2, 3, 4, 5, 6, 7, 8];
// const process = (n) => new Promise(r => 
//   setTimeout(() => r(n * 2), 100)
// );
// 
// mapWithLimit(items, 3, process)
//   .then(console.log); // [2, 4, 6, 8, 10, 12, 14, 16]



// Task 28: Implement debounced async
// Challenge: Debounce async operations
// Expected behavior:
// - If called multiple times quickly, only last call executes
// - Previous calls are cancelled

function debounceAsync(fn, delay) {
  // TODO: Implement
  // Hint: Use AbortController or cancellation token
}

// Test:
// const search = debounceAsync(async (query) => {
//   return await api.search(query);
// }, 300);
// 
// search('a');
// search('ab');
// search('abc'); // Only this one actually searches



// Task 29: AbortController usage
// Challenge: Make fetch request cancellable
// Expected behavior:
// - Start async operation
// - Allow cancellation
// - Clean up on abort

async function fetchWithAbort(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // TODO: Implement with timeout
  // Hint: Set timeout to abort, use signal in fetch
}

// Test:
// const controller = new AbortController();
// 
// fetchWithAbort('/api/data', controller.signal)
//   .then(console.log)
//   .catch(err => console.log(err.name)); // 'AbortError'
// 
// setTimeout(() => controller.abort(), 100);



// Task 30: Promisify callback
// Challenge: Convert callback-based function to Promise
// Expected behavior:
// - Wrap callback API
// - Resolve on success
// - Reject on error

function promisify(fn) {
  // TODO: Implement
}

// Test:
// function oldStyleCallback(value, callback) {
//   setTimeout(() => {
//     if (value > 0) {
//       callback(null, value * 2);
//     } else {
//       callback(new Error('Value must be positive'));
//     }
//   }, 100);
// }
// 
// const newStyle = promisify(oldStyleCallback);
// newStyle(5).then(console.log); // 10



// ================================
// SECTION 7: Common Pitfalls
// ================================

// Task 31: Unhandled promise rejection
// Questions:
// - What happens?
// - How does Node.js vs Browser handle this?
// - How to catch globally?

Promise.reject('boom');

// In Node.js:
// process.on('unhandledRejection', (reason, promise) => {
//   console.log('Unhandled Rejection at:', promise, 'reason:', reason);
// });

// In Browser:
// window.addEventListener('unhandledrejection', (event) => {
//   console.log('Unhandled rejection:', event.reason);
// });



// Task 32: Floating promises
// Problem: Promise created but not handled
// Questions:
// - What's wrong with this?
// - How to fix?

async function saveData(data) {
  validate(data); // This might throw
  store(data); // Returns promise but not awaited!
  return 'Saved';
}

// Fix: Ensure all promises are awaited



// Task 33: Memory leak with promises
// Problem: Promise keeps references alive
// Questions:
// - Can this cause memory leak?
// - How to prevent?

let cached;

async function getCachedData() {
  if (!cached) {
    cached = fetch('/huge-data').then(r => r.json());
  }
  return cached;
}

// Issue: 'cached' holds reference forever
// Fix: Add expiration or cache eviction



// Task 34: Constructor executor runs immediately
// Questions:
// - When does console.log execute?
// - Is this synchronous or async?

console.log('Before');

const promise = new Promise((resolve) => {
  console.log('Inside executor');
  resolve();
});

console.log('After');

// What's the order?



// Task 35: Async constructor (anti-pattern)
// Problem: Constructors can't be async
// Questions:
// - Why doesn't this work?
// - How to handle async initialization?

class User {
  constructor(id) {
    this.data = await fetch(`/users/${id}`); // ERROR!
  }
}

// Fix: How to properly handle async initialization?
// Option 1: Factory function
// Option 2: init() method
// Option 3: Static async method



// ================================
// SECTION 8: Design Discussions
// ================================

// Task 36: When to use what?
// No code - explain your reasoning for each scenario:

// Scenario A: Loading user profile
// - User data from database
// - User's posts from API
// - User's friends from cache
// Question: Promise.all, sequential awaits, or mixed? Why?

// Scenario B: Uploading multiple files
// - Need to upload 100 files
// - Server can handle 5 concurrent uploads
// Question: How to implement? What pattern?

// Scenario C: Real-time search
// - User types in search box
// - Make API call on each keystroke
// - Only show results from latest query
// Question: What patterns to prevent race conditions?

// Scenario D: Retrying failed requests
// - Network requests fail sometimes
// - Want to retry with exponential backoff
// - Give up after 3 tries
// Question: How to implement? Handle edge cases?

// Scenario E: Streaming large data
// - Processing 1GB file
// - Can't load all into memory
// - Need to process in chunks
// Question: Promises, async iterators, streams? Why?



// ================================
// SECTION 9: Performance
// ================================

// Task 37: Unnecessary awaits
// Problem: Too many awaits slow things down
// Questions:
// - Which awaits are necessary?
// - How to optimize?

async function process() {
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);
  const c = a + b;
  const d = await Promise.resolve(c * 2);
  return d;
}

// Optimize: Remove unnecessary awaits



// Task 38: Promise creation overhead
// Problem: Creating promises in a loop
// Questions:
// - Is this efficient?
// - When is Promise creation expensive?

async function processItems(items) {
  return Promise.all(
    items.map(item => new Promise(resolve => {
      setTimeout(() => resolve(item * 2), 100);
    }))
  );
}

// Is there a better way?



// Task 39: Microtask queue saturation
// Problem: Too many microtasks
// Questions:
// - What happens here?
// - How to prevent UI blocking?

async function recursiveProcess() {
  await Promise.resolve();
  await recursiveProcess();
}

// recursiveProcess(); // Don't actually run this!

// Fix: Add macrotask breaks



// ================================
// BONUS: Interview Questions
// ================================

// Q1: Explain the difference between:
// - return
// - return await
// - just await

// Q2: Why does this matter in try/catch?
async function example() {
  try {
    return await fetch('/api'); // vs return fetch('/api')
  } catch (e) {
    console.log(e);
  }
}

// Q3: Implement Promise.all from scratch

// Q4: What's the difference between:
// - Promise.resolve().then()
// - new Promise(resolve => resolve()).then()

// Q5: Can a Promise resolve multiple times? Why/why not?

// Q6: What's a thenable? How is it different from a Promise?

// Q7: Explain async function execution context

// Q8: How to detect if a function is async?

// Q9: Can you await a non-Promise value? What happens?

// Q10: Explain the difference between Promise and Observable
