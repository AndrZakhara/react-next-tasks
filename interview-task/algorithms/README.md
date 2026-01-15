# Algorithms — Solutions & Explanations

Complete solutions for all 45 live coding tasks with detailed explanations.

---

## LEVEL 1: WARM-UP

### Task 1: Two Sum

**Time:** O(n) | **Space:** O(n)

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}
```

**Explanation:**

- Store each number with its index in a hash map
- For each number, check if its complement (target - num) exists in map
- If found, return both indices
- Why O(n)? Single pass through array with O(1) hash lookups
- Why not O(n²) nested loops? Hash map trades space for time

---

### Task 2: Remove Duplicates from Sorted Array

**Time:** O(n) | **Space:** O(1)

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let writeIndex = 1; // Position for next unique element

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}
```

**Explanation:**

- Two-pointer technique: read pointer (i) and write pointer (writeIndex)
- Only write when we find a new unique element
- Works because array is sorted — duplicates are adjacent
- In-place modification saves space

---

### Task 3: Contains Duplicate

**Time:** O(n) | **Space:** O(n)

```javascript
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
```

**Explanation:**

- Set provides O(1) lookup for duplicates
- Early return optimization: stop as soon as duplicate found
- Alternative: sort first O(n log n), then check adjacent elements

---

### Task 4: Maximum Subarray Sum (Kadane's Algorithm)

**Time:** O(n) | **Space:** O(1)

```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend current subarray or start new one
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

**Explanation:**

- Greedy approach: at each position, decide whether to extend or restart
- If currentSum becomes negative, starting fresh is better
- Why it works: optimal subarray ending at i either includes i-1 or doesn't
- Dynamic Programming perspective: dp[i] = max(nums[i], dp[i-1] + nums[i])

---

### Task 5: Move Zeroes

**Time:** O(n) | **Space:** O(1)

```javascript
function moveZeroes(nums) {
  let writeIndex = 0; // Position for next non-zero

  // Move all non-zeros to front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  // Fill rest with zeros
  for (let i = writeIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}
```

**Explanation:**

- Two-pass solution: collect non-zeros, then fill zeros
- Alternative: one-pass with swapping when non-zero found
- Preserves relative order of non-zero elements

---

### Task 6: Group Anagrams

**Time:** O(n·k log k) | **Space:** O(n·k)

```javascript
function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    // Sorted string as key
    const key = word.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(word);
  }

  return Array.from(map.values());
}
```

**Explanation:**

- Key insight: anagrams produce same sorted string
- Time: n words × k characters × log k for sorting each
- Alternative key: character frequency array (better for long strings)
- Example: "eat" and "tea" both become "aet"

---

### Task 7: First Unique Character

**Time:** O(n) | **Space:** O(1)

```javascript
function firstUniqueChar(str) {
  const freq = new Map();

  // Count frequencies
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Find first with frequency 1
  for (let i = 0; i < str.length; i++) {
    if (freq.get(str[i]) === 1) {
      return i;
    }
  }

  return -1;
}
```

**Explanation:**

- Two-pass algorithm: count, then find
- Space is O(1) because alphabet size is bounded (26 letters or 128 ASCII)
- Can't do single pass — need full frequency information

---

### Task 8: Intersection of Two Arrays

**Time:** O(n+m) | **Space:** O(min(n,m))

```javascript
function intersect(nums1, nums2) {
  const map = new Map();
  const result = [];

  // Count frequencies in first array
  for (const num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // Find matches in second array
  for (const num of nums2) {
    if (map.get(num) > 0) {
      result.push(num);
      map.set(num, map.get(num) - 1);
    }
  }

  return result;
}
```

**Explanation:**

- Hash map stores frequencies to handle duplicates correctly
- Better than sorting both arrays: O(n log n + m log m)
- Handles duplicate elements properly

---

### Task 9: Longest Substring Without Repeating Characters

**Time:** O(n) | **Space:** O(min(n, charset))

```javascript
function lengthOfLongestSubstring(str) {
  const seen = new Map(); // char -> index
  let maxLen = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    const char = str[end];

    // If char seen and within current window
    if (seen.has(char) && seen.get(char) >= start) {
      start = seen.get(char) + 1; // Move start past duplicate
    }

    seen.set(char, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
```

**Explanation:**

- Sliding window technique with two pointers (start, end)
- Expand window by moving end, contract by moving start when duplicate found
- Map stores last seen index of each character
- Window invariant: no duplicates between start and end

---

### Task 10: Valid Anagram

**Time:** O(n) | **Space:** O(1)

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = new Map();

  // Count characters in s
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Subtract characters in t
  for (const char of t) {
    if (!freq.has(char)) return false;
    freq.set(char, freq.get(char) - 1);
    if (freq.get(char) < 0) return false;
  }

  return true;
}
```

**Explanation:**

- Frequency counting approach
- Alternative: sort both strings and compare O(n log n)
- Space is O(1) for bounded alphabet

---

## LEVEL 2: LINKED LISTS

### Task 11: Reverse Linked List

**Time:** O(n) | **Space:** O(1) iterative, O(n) recursive

```javascript
// Iterative approach
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // Save next
    curr.next = prev; // Reverse pointer
    prev = curr; // Move prev forward
    curr = next; // Move curr forward
  }

  return prev; // New head
}

// Recursive approach
function reverseListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseListRecursive(head.next);
  head.next.next = head; // Reverse the link
  head.next = null; // Break old link

  return newHead;
}
```

**Explanation:**

- Iterative: Three pointers (prev, curr, next) to reverse links
- Recursive: Reverse rest of list, then fix current node's link
- Recursive uses call stack space O(n)

---

### Task 12: Detect Cycle in Linked List

**Time:** O(n) | **Space:** O(1)

```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next; // Move 1 step
    fast = fast.next.next; // Move 2 steps

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false;
}
```

**Explanation:**

- Floyd's Cycle Detection (Tortoise and Hare)
- If cycle exists, fast pointer will eventually meet slow pointer
- Why? Fast gains 1 node per iteration, will catch up in cycle
- Alternative: Use Set to track visited nodes O(n) space

---

### Task 13: Merge Two Sorted Lists

**Time:** O(n+m) | **Space:** O(1)

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = { next: null }; // Dummy node simplifies logic
  let tail = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  // Attach remaining nodes
  tail.next = l1 !== null ? l1 : l2;

  return dummy.next;
}
```

**Explanation:**

- Dummy node eliminates edge cases for empty list
- Compare heads and attach smaller one
- When one list exhausted, attach remainder of other
- Similar to merge step in merge sort

---

### Task 14: Remove Nth Node from End

**Time:** O(n) | **Space:** O(1)

```javascript
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove node
  slow.next = slow.next.next;

  return dummy.next;
}
```

**Explanation:**

- Two-pointer with gap of n
- When fast reaches end, slow is at node before target
- Dummy node handles edge case of removing head
- Single pass solution

---

## LEVEL 2: BINARY SEARCH

### Task 15: Binary Search Implementation

**Time:** O(log n) | **Space:** O(1)

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2); // Avoid overflow

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}
```

**Explanation:**

- Divide search space in half each iteration
- `left + (right - left) / 2` avoids integer overflow vs `(left + right) / 2`
- Condition `left <= right` handles single-element case
- Why O(log n)? Each iteration eliminates half the elements

---

### Task 16: First Bad Version

**Time:** O(log n) | **Space:** O(1)

```javascript
function firstBadVersion(n) {
  let left = 1;
  let right = n;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (isBadVersion(mid)) {
      right = mid; // First bad could be mid or earlier
    } else {
      left = mid + 1; // First bad is after mid
    }
  }

  return left;
}
```

**Explanation:**

- Modified binary search to find first occurrence
- When bad version found, don't exclude it (right = mid, not mid - 1)
- Minimizes API calls compared to linear search
- Final position: left === right at first bad version

---

### Task 17: Search in Rotated Sorted Array

**Time:** O(log n) | **Space:** O(1)

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

**Explanation:**

- One half is always sorted in rotated array
- Identify sorted half, check if target is in that range
- If target in sorted half, search it; otherwise search other half
- Example: [4,5,6,7,0,1,2] — if mid=7, left half [4,5,6,7] is sorted

---

### Task 18: Find Peak Element

**Time:** O(log n) | **Space:** O(1)

```javascript
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // Peak is at mid or to the left
      right = mid;
    } else {
      // Peak is to the right
      left = mid + 1;
    }
  }

  return left;
}
```

**Explanation:**

- Binary search on unsorted array using slope direction
- If nums[mid] > nums[mid+1], peak must be at mid or left (descending)
- If nums[mid] < nums[mid+1], peak must be right (ascending)
- Works because neighbors of out-of-bounds indices are -∞

---

## LEVEL 2: SORTING

### Task 19: Bubble Sort

**Time:** O(n²) | **Space:** O(1)

```javascript
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
        swapped = true;
      }
    }

    // Optimization: stop if no swaps made
    if (!swapped) break;
  }

  return arr;
}
```

**Explanation:**

- Repeatedly swap adjacent elements if out of order
- Largest element "bubbles" to end each pass
- Optimization: track if any swaps made, stop early if sorted
- Why inefficient? O(n²) comparisons even for nearly sorted arrays

---

### Task 20: Merge Sort

**Time:** O(n log n) | **Space:** O(n)

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Explanation:**

- Divide and conquer: split array in half recursively
- Base case: array of size 1 is sorted
- Merge step: combine two sorted arrays in O(n) time
- Time: T(n) = 2T(n/2) + O(n) → O(n log n)
- Stable sort: maintains relative order of equal elements

---

### Task 21: Quick Sort

**Time:** O(n log n) avg, O(n²) worst | **Space:** O(log n)

```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1; // Index of smaller element

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
```

**Explanation:**

- Choose pivot, partition array around it
- Elements ≤ pivot go left, > pivot go right
- Recursively sort both partitions
- Worst case O(n²): already sorted array with bad pivot choice
- Average case O(n log n): pivot divides array roughly in half
- In-place sorting: only O(log n) stack space

---

### Task 22: Kth Largest Element

**Time:** O(n) avg | **Space:** O(1)

```javascript
// Approach 1: QuickSelect (optimal)
function findKthLargest(nums, k) {
  const targetIndex = nums.length - k;

  function quickSelect(left, right) {
    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      return quickSelect(pivotIndex + 1, right);
    } else {
      return quickSelect(left, pivotIndex - 1);
    }
  }

  function partition(left, right) {
    const pivot = nums[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (nums[j] <= pivot) {
        i++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }

    [nums[i + 1], nums[right]] = [nums[right], nums[i + 1]];
    return i + 1;
  }

  return quickSelect(0, nums.length - 1);
}

// Approach 2: Min Heap (for streaming data)
function findKthLargestHeap(nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }

  return minHeap.peek();
}
```

**Explanation:**

- **QuickSelect:** Similar to quicksort but only recurse on one side
  - Average O(n): n + n/2 + n/4 + ... = 2n
  - Worst O(n²): bad pivot choices
- **Min Heap:** Keep heap of size k, return min
  - Time O(n log k), better for streaming
- **Sorting:** O(n log n) but simpler to implement
- Kth largest = (n-k)th smallest (0-indexed)

---

## LEVEL 2: ARRAYS (ADVANCED)

### Task 23: Rotate Array

**Time:** O(n) | **Space:** O(1)

```javascript
function rotate(arr, k) {
  k = k % arr.length; // Handle k > length

  // Reverse entire array
  reverse(arr, 0, arr.length - 1);
  // Reverse first k elements
  reverse(arr, 0, k - 1);
  // Reverse remaining elements
  reverse(arr, k, arr.length - 1);
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}
```

**Explanation:**

- Reversal algorithm: reverse 3 times
- Example: [1,2,3,4,5,6,7], k=3
  - Reverse all: [7,6,5,4,3,2,1]
  - Reverse first 3: [5,6,7,4,3,2,1]
  - Reverse rest: [5,6,7,1,2,3,4]
- Why it works: reversal repositions elements cyclically
- Alternative: use extra array O(n) space

---

### Task 24: Product of Array Except Self

**Time:** O(n) | **Space:** O(1)

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);

  // Calculate prefix products
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Calculate suffix products and combine
  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }

  return result;
}
```

**Explanation:**

- Can't use division (what if there are zeros?)
- Key insight: result[i] = product of all left × product of all right
- First pass: store prefix products in result
- Second pass: multiply by suffix products
- Example: [1,2,3,4]
  - Prefix: [1,1,2,6]
  - Suffix: 24,12,4,1
  - Result: [24,12,8,6]

---

### Task 25: Longest Consecutive Sequence

**Time:** O(n) | **Space:** O(n)

```javascript
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // Only start counting from beginning of sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}
```

**Explanation:**

- Set allows O(1) lookups
- Key optimization: only count from start of sequence (num - 1 not in set)
- Without optimization: would count same sequence multiple times
- Example: [100,4,200,1,3,2]
  - Start at 1 (no 0): count 1,2,3,4 → length 4
  - Skip 2,3,4 since they have predecessors
- Why not sort? O(n log n) vs O(n)

---

### Task 26: Merge Intervals

**Time:** O(n log n) | **Space:** O(n)

```javascript
function merge(intervals) {
  if (intervals.length === 0) return [];

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlapping: merge by extending end
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // Non-overlapping: add as new interval
      merged.push(current);
    }
  }

  return merged;
}
```

**Explanation:**

- Sort intervals by start time O(n log n)
- Scan through sorted intervals, merge overlapping ones
- Two intervals [a,b] and [c,d] overlap if c ≤ b
- Merged interval: [a, max(b,d)]
- Example: [[1,3],[2,6],[8,10],[15,18]]
  - After sort: same order
  - Merge [1,3] and [2,6] → [1,6]
  - [8,10] doesn't overlap → keep separate
  - Result: [[1,6],[8,10],[15,18]]

---

## LEVEL 3: TREES

### Task 27: Tree Traversals

```javascript
// In-order: Left → Root → Right (gives sorted order for BST)
function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

// Pre-order: Root → Left → Right (used for copying tree)
function preorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

// Post-order: Left → Right → Root (used for deleting tree)
function postorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }

  traverse(root);
  return result;
}
```

**Explanation:**

- **In-order:** Visits left subtree, then node, then right subtree
  - For BST: produces sorted sequence
  - Use case: get sorted values from BST
- **Pre-order:** Visits node first, then subtrees
  - Use case: copying tree structure
- **Post-order:** Visits subtrees first, then node
  - Use case: deleting tree (delete children before parent)
- All are O(n) time, O(h) space for recursion stack where h is height

---

### Task 28: Maximum Depth of Binary Tree

**Time:** O(n) | **Space:** O(h)

```javascript
function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

**Explanation:**

- Recursive solution: depth = 1 + max(left depth, right depth)
- Base case: null node has depth 0
- Call stack grows to height of tree
- For balanced tree: O(log n) space
- For skewed tree: O(n) space

---

### Task 29: Validate Binary Search Tree

**Time:** O(n) | **Space:** O(h)

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  // Current node must be within bounds
  if (root.val <= min || root.val >= max) {
    return false;
  }

  // Left subtree: all nodes must be < root.val
  // Right subtree: all nodes must be > root.val
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}
```

**Explanation:**

- Can't just compare with immediate children!
  - Example: [5,1,6,null,null,4,7] — 4 < 6 but 4 < 5 violates BST
- Must track valid range for each subtree
- Left child updates upper bound
- Right child updates lower bound
- Every node in left subtree must be < root
- Every node in right subtree must be > root

---

### Task 30: Lowest Common Ancestor

**Time:** O(n) | **Space:** O(h)

```javascript
// For Binary Search Tree (optimized)
function lowestCommonAncestorBST(root, p, q) {
  while (root !== null) {
    // Both nodes in left subtree
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    }
    // Both nodes in right subtree
    else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    }
    // Found split point
    else {
      return root;
    }
  }
}

// For general Binary Tree
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // If both found in different subtrees, current node is LCA
  if (left !== null && right !== null) {
    return root;
  }

  // Return whichever subtree found nodes
  return left !== null ? left : right;
}
```

**Explanation:**

- **For BST:** Use BST property to find split point
  - If both < root: search left
  - If both > root: search right
  - Otherwise: current node is LCA
- **For general tree:** Recursive search
  - If both found in different subtrees: current is LCA
  - If both in same subtree: recurse into that subtree
- Time O(n) for general tree, O(h) for BST

---

### Task 31: Level Order Traversal (BFS)

**Time:** O(n) | **Space:** O(w) where w is max width

```javascript
function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

**Explanation:**

- BFS using queue: process level by level
- Track level size to separate levels in output
- Space: O(w) where w is max width (worst case: complete tree with n/2 nodes at last level)
- Use case: finding shortest path in unweighted tree

---

### Task 32: Invert Binary Tree

**Time:** O(n) | **Space:** O(h)

```javascript
function invertTree(root) {
  if (root === null) return null;

  // Swap left and right children
  [root.left, root.right] = [root.right, root.left];

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

**Explanation:**

- Swap left and right children at each node
- Recursively invert both subtrees
- Can also do iteratively with queue (BFS)
- Example: [4,2,7,1,3,6,9] → [4,7,2,9,6,3,1]

---

## LEVEL 3: GRAPHS

### Task 33: BFS Traversal

**Time:** O(V+E) | **Space:** O(V)

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
```

**Explanation:**

- Use queue for level-by-level exploration
- Mark nodes visited when enqueued (not when dequeued) to avoid duplicates
- Time: visit each vertex once, explore each edge once
- Space: O(V) for visited set and queue
- Use cases:
  - Shortest path in unweighted graph
  - Level-order processing
  - Finding connected components

---

### Task 34: DFS Traversal

**Time:** O(V+E) | **Space:** O(V)

```javascript
// Recursive approach
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];

  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }

  return result;
}

// Iterative approach with stack
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();

    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);

      // Push neighbors in reverse order for same order as recursive
      for (let i = graph[node].length - 1; i >= 0; i--) {
        if (!visited.has(graph[node][i])) {
          stack.push(graph[node][i]);
        }
      }
    }
  }

  return result;
}
```

**Explanation:**

- Explores as deep as possible before backtracking
- Recursive uses call stack, iterative uses explicit stack
- Time: O(V+E) — same as BFS
- Space: O(V) for visited, O(h) for recursion stack where h is depth
- Use cases:
  - Topological sorting
  - Cycle detection
  - Path finding
  - Maze solving

---

### Task 35: Detect Cycle in Directed Graph

**Time:** O(V+E) | **Space:** O(V)

```javascript
function hasCycle(graph) {
  const WHITE = 0; // Unvisited
  const GRAY = 1; // Visiting (in current path)
  const BLACK = 2; // Visited (completed)

  const colors = new Map();

  // Initialize all nodes as WHITE
  for (const node in graph) {
    colors.set(node, WHITE);
  }

  function dfs(node) {
    colors.set(node, GRAY);

    for (const neighbor of graph[node]) {
      if (colors.get(neighbor) === GRAY) {
        return true; // Back edge found: cycle!
      }

      if (colors.get(neighbor) === WHITE) {
        if (dfs(neighbor)) return true;
      }
    }

    colors.set(node, BLACK);
    return false;
  }

  // Check all components
  for (const node in graph) {
    if (colors.get(node) === WHITE) {
      if (dfs(node)) return true;
    }
  }

  return false;
}
```

**Explanation:**

- Three-color algorithm for directed graphs
- **WHITE:** Not yet visited
- **GRAY:** Currently exploring (in recursion stack)
- **BLACK:** Finished exploring
- Cycle exists if we find a GRAY node (back edge to ancestor)
- For undirected graphs: simpler — just track parent

---

### Task 36: Number of Islands

**Time:** O(m×n) | **Space:** O(m×n)

```javascript
function numIslands(grid) {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    // Bounds check and water check
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
      return;
    }

    // Mark as visited
    grid[r][c] = "0";

    // Explore all 4 directions
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c); // Mark entire island as visited
      }
    }
  }

  return count;
}
```

**Explanation:**

- DFS/BFS to mark connected components
- Each time we find unvisited land, increment count and mark entire island
- Modify grid in-place to mark visited (or use separate visited set)
- Time: visit each cell once
- Classic connected components problem

---

### Task 37: Clone Graph

**Time:** O(V+E) | **Space:** O(V)

```javascript
function cloneGraph(node) {
  if (node === null) return null;

  const clones = new Map(); // original -> clone

  function dfs(original) {
    if (clones.has(original)) {
      return clones.get(original);
    }

    // Create clone
    const clone = { val: original.val, neighbors: [] };
    clones.set(original, clone);

    // Clone all neighbors
    for (const neighbor of original.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

**Explanation:**

- Deep copy of graph with all connections
- HashMap maps original nodes to clones
- DFS to traverse and clone all reachable nodes
- Check map before cloning to handle cycles
- Alternative: BFS with queue

---

### Task 38: Topological Sort

**Time:** O(V+E) | **Space:** O(V)

```javascript
// DFS-based approach
function topoSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    visited.add(node);

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    // Add to stack after visiting all descendants
    stack.push(node);
  }

  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }

  return stack.reverse();
}

// Kahn's algorithm (BFS with in-degree)
function topoSortKahn(graph) {
  const inDegree = new Map();
  const result = [];

  // Calculate in-degrees
  for (const node in graph) {
    if (!inDegree.has(node)) inDegree.set(node, 0);
    for (const neighbor of graph[node]) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
    }
  }

  // Queue nodes with in-degree 0
  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph[node] || []) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}
```

**Explanation:**

- Orders nodes so dependencies come before dependents
- **DFS approach:** Add node to result after visiting all descendants
- **Kahn's algorithm:** Process nodes with no dependencies first
- Use cases:
  - Build systems (compile order)
  - Task scheduling
  - Course prerequisites
- If cycle exists, topological sort impossible

---

## LEVEL 3: SHORTEST PATH

### Task 39: Dijkstra's Algorithm

**Time:** O((V+E) log V) | **Space:** O(V)

```javascript
function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const pq = new MinPriorityQueue(); // [distance, node]

  // Initialize distances
  for (const node in graph) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { element: node, priority: dist } = pq.dequeue();

    if (visited.has(node)) continue;
    visited.add(node);

    for (const [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;

      if (newDist < distances.get(neighbor)) {
        distances.set(neighbor, newDist);
        pq.enqueue(neighbor, newDist);
      }
    }
  }

  return distances;
}
```

**Explanation:**

- Greedy algorithm: always explore closest unvisited node
- Priority queue extracts minimum distance node
- Relax edges: update distance if shorter path found
- **Why it works:** Once a node is visited, its shortest path is final
- **Limitation:** Doesn't work with negative weights
- Time breakdown:
  - Each vertex dequeued once: O(V log V)
  - Each edge relaxed once: O(E log V)
  - Total: O((V+E) log V)

---

### Task 40: Bellman-Ford Algorithm

**Time:** O(V×E) | **Space:** O(V)

```javascript
function bellmanFord(graph, start) {
  const distances = new Map();

  // Initialize distances
  for (const node in graph) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);

  const vertices = Object.keys(graph);

  // Relax all edges V-1 times
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const node of vertices) {
      if (distances.get(node) !== Infinity) {
        for (const [neighbor, weight] of graph[node]) {
          const newDist = distances.get(node) + weight;
          if (newDist < distances.get(neighbor)) {
            distances.set(neighbor, newDist);
          }
        }
      }
    }
  }

  // Check for negative cycles
  for (const node of vertices) {
    if (distances.get(node) !== Infinity) {
      for (const [neighbor, weight] of graph[node]) {
        if (distances.get(node) + weight < distances.get(neighbor)) {
          throw new Error("Graph contains negative cycle");
        }
      }
    }
  }

  return distances;
}
```

**Explanation:**

- Works with negative weights (unlike Dijkstra)
- Relaxes all edges V-1 times
- Why V-1? Longest simple path has V-1 edges
- Extra iteration detects negative cycles
- Slower than Dijkstra: O(V×E) vs O((V+E) log V)
- Use when: negative weights present or need cycle detection

---

### Task 41: Grid Shortest Path (BFS)

**Time:** O(m×n) | **Space:** O(m×n)

```javascript
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const queue = [[0, 0, 1]]; // [row, col, distance]
  grid[0][0] = 1; // Mark visited

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    if (r === n - 1 && c === n - 1) {
      return dist;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        queue.push([nr, nc, dist + 1]);
        grid[nr][nc] = 1; // Mark visited
      }
    }
  }

  return -1;
}
```

**Explanation:**

- BFS guarantees shortest path in unweighted grid
- 8-directional movement (including diagonals)
- Mark cells as visited when enqueued
- First time we reach destination is shortest path
- Why BFS not DFS? BFS explores level by level

---

## LEVEL 3: DYNAMIC PROGRAMMING

### Task 42: Climbing Stairs

**Time:** O(n) | **Space:** O(1)

```javascript
// Space-optimized DP
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways(1)
  let prev1 = 2; // ways(2)

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// With memoization (top-down)
function climbStairsMemo(n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n]) return memo[n];

  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}
```

**Explanation:**

- Recurrence: ways(n) = ways(n-1) + ways(n-2)
- Can reach stair n from n-1 (1 step) or n-2 (2 steps)
- Same pattern as Fibonacci!
- **Memoization:** Top-down recursion with caching
- **Tabulation:** Bottom-up iteration
- Space optimization: only need last 2 values

---

### Task 43: Coin Change

**Time:** O(n×amount) | **Space:** O(amount)

```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case: 0 coins needed for amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

**Explanation:**

- Subproblem: min coins for amount i
- Recurrence: dp[i] = min(dp[i - coin] + 1) for all coins
- Try using each coin and take minimum
- Bottom-up: build from small amounts to target
- Example: coins=[1,2,5], amount=11
  - dp[6] = min(dp[5]+1, dp[4]+1, dp[1]+1) = min(2,2,2) = 2
  - Answer: 3 coins (5+5+1)

---

### Task 44: Longest Common Subsequence

**Time:** O(m×n) | **Space:** O(m×n)

```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Characters match: add 1 to previous diagonal
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Characters don't match: take max from top or left
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

**Explanation:**

- 2D DP table: dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]
- If characters match: extend LCS from diagonal
- If don't match: take best from excluding either character
- Recurrence:
  - If text1[i] == text2[j]: dp[i][j] = dp[i-1][j-1] + 1
  - Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
- Space can be optimized to O(min(m,n)) using rolling array

---

### Task 45: House Robber

**Time:** O(n) | **Space:** O(1)

```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0; // max at i-2
  let prev1 = nums[0]; // max at i-1

  for (let i = 1; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

**Explanation:**

- Can't rob adjacent houses
- Decision at house i: rob it (skip i-1) or skip it (keep i-1)
- Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
- Space optimization: only track last 2 values
- Example: [2,7,9,3,1]
  - At house 2 (value 9): rob 2+9=11 vs skip (keep 7) → 11
  - At house 3 (value 3): rob 7+3=10 vs skip (keep 11) → 11
  - At house 4 (value 1): rob 11+1=12 vs skip (keep 11) → 12

---

## BONUS: HEAP / PRIORITY QUEUE

### Bonus 1: Implement Min Heap

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;

      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let minIndex = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[minIndex]
      ) {
        minIndex = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[minIndex]
      ) {
        minIndex = rightChild;
      }

      if (minIndex === index) break;

      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index],
      ];
      index = minIndex;
    }
  }
}
```

**Explanation:**

- Array-based binary heap
- Parent at i, children at 2i+1 and 2i+2
- **Insert:** Add to end, bubble up to maintain heap property
- **ExtractMin:** Remove root, move last element to root, bubble down
- Heap property: parent ≤ both children
- Time: O(log n) for insert/extract, O(1) for peek

---

### Bonus 2: Top K Frequent Elements

**Time:** O(n log k) | **Space:** O(n)

```javascript
function topKFrequent(nums, k) {
  // Count frequencies
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // Min heap of size k
  const minHeap = new MinHeap();

  for (const [num, count] of freq) {
    minHeap.insert({ num, count });
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }

  return minHeap.heap.map((item) => item.num);
}
```

**Explanation:**

- Keep heap of size k with highest frequencies
- When heap exceeds k, remove minimum
- Heap maintains k largest frequencies
- Alternative: Bucket sort O(n) but more complex

---

### Bonus 3: Merge K Sorted Lists

**Time:** O(N log k) | **Space:** O(k)

```javascript
function mergeKLists(lists) {
  const minHeap = new MinHeap();
  const dummy = { next: null };
  let tail = dummy;

  // Add first node from each list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      minHeap.insert({ val: lists[i].val, node: lists[i], listIndex: i });
    }
  }

  while (minHeap.size() > 0) {
    const { node } = minHeap.extractMin();
    tail.next = node;
    tail = tail.next;

    if (node.next !== null) {
      minHeap.insert({ val: node.next.val, node: node.next });
    }
  }

  return dummy.next;
}
```

**Explanation:**

- Heap contains one node from each list (smallest values)
- Extract minimum, add next node from that list
- Total N nodes processed, each heap operation O(log k)
- Better than merging pairs: O(N log k) vs O(N k)

---

## BONUS: BACKTRACKING

### Bonus 4: Generate Permutations

**Time:** O(n! × n) | **Space:** O(n)

```javascript
function permute(nums) {
  const result = [];

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (const num of nums) {
      if (current.includes(num)) continue; // Skip used numbers

      current.push(num);
      backtrack(current);
      current.pop(); // Backtrack
    }
  }

  backtrack([]);
  return result;
}

// Optimized with swap technique
function permuteSwap(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // Swap
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]]; // Backtrack
    }
  }

  backtrack(0);
  return result;
}
```

**Explanation:**

- Generate all orderings of array
- Backtracking: try each number, recurse, undo choice
- Swap technique: fix positions one by one
- Time: n! permutations × O(n) to copy each
- Space: O(n) recursion depth

---

### Bonus 5: Combination Sum

**Time:** O(2^n) | **Space:** O(target/min)

```javascript
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return; // Pruning

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      // Can reuse same number: pass i not i+1
      backtrack(i, current, sum + candidates[i]);
      current.pop(); // Backtrack
    }
  }

  backtrack(0, [], 0);
  return result;
}
```

**Explanation:**

- Find all combinations that sum to target
- Can reuse same element multiple times
- Pruning: stop early if sum exceeds target
- Start index prevents duplicate combinations
- Time: exponential in worst case, but pruning helps

---

## DISCUSSION TASKS

### Discussion 1: Quick Sort vs Merge Sort

**Quick Sort:**

- **Avg Time:** O(n log n), **Worst:** O(n²)
- **Space:** O(log n) stack
- **In-place:** Yes
- **Stable:** No (can be made stable but loses efficiency)
- **When to use:** Average case is fast, good cache locality

**Merge Sort:**

- **Time:** O(n log n) always
- **Space:** O(n) for temporary arrays
- **In-place:** No (external sorting possible)
- **Stable:** Yes
- **When to use:** Need stability, guaranteed O(n log n), linked lists

**Key differences:**

- Quicksort faster in practice (better cache, in-place)
- Mergesort predictable performance
- Quicksort picks pivot and partitions
- Mergesort divides evenly and merges

---
