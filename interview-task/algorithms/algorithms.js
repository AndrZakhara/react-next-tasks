// =======================================
// Algorithms — Live Coding Tasks (1–45)
// Complete Interview Preparation
// =======================================

// ================================
// LEVEL 1: WARM-UP (Arrays & Hashing)
// ================================

// Task 1: Two Sum
// Time: O(n) | Space: O(n)
// Expected: Hash map approach, explain why O(n²) is worse
// Example: twoSum([2,7,11,15], 9) → [0,1]
function twoSum(nums, target) {
  // implement
}

// Task 2: Remove duplicates from sorted array
// Time: O(n) | Space: O(1)
// Expected: Two-pointer technique, in-place modification
// Example: removeDuplicates([1,1,2,2,3]) → 3, arr = [1,2,3,...]
function removeDuplicates(nums) {
  // implement
}

// Task 3: Contains Duplicate
// Time: O(n) | Space: O(n)
// Expected: Use Set, explain early return optimization
// Example: containsDuplicate([1,2,3,1]) → true
function containsDuplicate(nums) {
  // implement
}

// Task 4: Maximum subarray sum (Kadane's Algorithm)
// Time: O(n) | Space: O(1)
// Expected: Explain greedy approach, why dynamic programming works
// Example: maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) → 6
function maxSubArray(nums) {
  // implement
}

// Task 5: Move zeroes
// Time: O(n) | Space: O(1)
// Expected: In-place, preserve order, two-pointer technique
// Example: moveZeroes([0,1,0,3,12]) → [1,3,12,0,0]
function moveZeroes(nums) {
  // implement
}

// Task 6: Group anagrams
// Time: O(n*k log k) | Space: O(n*k)
// Expected: Use Map, explain key generation (sorted string)
// Example: groupAnagrams(["eat","tea","tan","ate","nat","bat"])
//          → [["eat","tea","ate"],["tan","nat"],["bat"]]
function groupAnagrams(words) {
  // implement
}

// ================================
// LEVEL 1: MAP & SET
// ================================

// Task 7: First unique character
// Time: O(n) | Space: O(1) — bounded by alphabet size
// Expected: Two-pass with Map, frequency counting
// Example: firstUniqueChar("leetcode") → 0
function firstUniqueChar(str) {
  // implement
}

// Task 8: Intersection of two arrays
// Time: O(n+m) | Space: O(min(n,m))
// Expected: Use Set, explain advantage over sorting
// Example: intersect([1,2,2,1], [2,2]) → [2,2]
function intersect(nums1, nums2) {
  // implement
}

// Task 9: Longest substring without repeating chars
// Time: O(n) | Space: O(min(n,charset))
// Expected: Sliding window, explain window expansion & contraction
// Example: lengthOfLongestSubstring("abcabcbb") → 3 ("abc")
function lengthOfLongestSubstring(str) {
  // implement
}

// Task 10: Valid Anagram
// Time: O(n) | Space: O(1)
// Expected: Frequency map or sorting comparison
// Example: isAnagram("anagram", "nagaram") → true
function isAnagram(s, t) {
  // implement
}

// ================================
// LEVEL 2: LINKED LISTS
// ================================

// Task 11: Reverse linked list
// Time: O(n) | Space: O(1) iterative / O(n) recursive
// Expected: Both iterative and recursive approaches
// Example: reverse(1→2→3→4→5) → 5→4→3→2→1
function reverseList(head) {
  // implement
}

// Task 12: Detect cycle in linked list
// Time: O(n) | Space: O(1)
// Expected: Floyd's cycle detection (fast & slow pointers)
// Explain why two pointers meet if cycle exists
function hasCycle(head) {
  // implement
}

// Task 13: Merge two sorted lists
// Time: O(n+m) | Space: O(1)
// Expected: Iterative approach with dummy node
// Example: merge(1→2→4, 1→3→4) → 1→1→2→3→4→4
function mergeTwoLists(l1, l2) {
  // implement
}

// Task 14: Remove Nth node from end
// Time: O(n) | Space: O(1)
// Expected: Two-pointer with gap of n
// Example: removeNthFromEnd(1→2→3→4→5, 2) → 1→2→3→5
function removeNthFromEnd(head, n) {
  // implement
}

// ================================
// LEVEL 2: BINARY SEARCH
// ================================

// Task 15: Binary search implementation
// Time: O(log n) | Space: O(1)
// Expected: Iterative approach, explain mid calculation
// Example: binarySearch([1,2,3,4,5], 3) → 2
function binarySearch(arr, target) {
  // implement
}

// Task 16: First bad version
// Time: O(log n) | Space: O(1)
// Expected: Binary search variant, minimize API calls
// Example: firstBadVersion(5) → 4 (if 4,5 are bad)
function firstBadVersion(n) {
  // implement (assume isBadVersion(n) API exists)
}

// Task 17: Search in rotated sorted array
// Time: O(log n) | Space: O(1)
// Expected: Modified binary search, identify sorted half
// Example: search([4,5,6,7,0,1,2], 0) → 4
function search(nums, target) {
  // implement
}

// Task 18: Find peak element
// Time: O(log n) | Space: O(1)
// Expected: Binary search on unsorted array
// Example: findPeakElement([1,2,3,1]) → 2
function findPeakElement(nums) {
  // implement
}

// ================================
// LEVEL 2: SORTING
// ================================

// Task 19: Bubble sort
// Time: O(n²) | Space: O(1)
// Expected: Explain why inefficient, when to stop early
function bubbleSort(arr) {
  // implement
}

// Task 20: Merge sort
// Time: O(n log n) | Space: O(n)
// Expected: Divide & conquer, explain merge step
function mergeSort(arr) {
  // implement
}

// Task 21: Quick sort
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)
// Expected: Partition logic, explain pivot selection
function quickSort(arr) {
  // implement
}

// Task 22: Kth largest element
// Time: O(n) avg using quickselect | O(n log k) with heap
// Expected: Explain all approaches: sort, heap, quickselect
// Example: findKthLargest([3,2,1,5,6,4], 2) → 5
function findKthLargest(nums, k) {
  // implement
}

// ================================
// LEVEL 2: ARRAYS (ADVANCED)
// ================================

// Task 23: Rotate array
// Time: O(n) | Space: O(1)
// Expected: Reversal algorithm (reverse 3 times)
// Example: rotate([1,2,3,4,5,6,7], 3) → [5,6,7,1,2,3,4]
function rotate(arr, k) {
  // implement
}

// Task 24: Product of array except self
// Time: O(n) | Space: O(1) — output array doesn't count
// Expected: Prefix/suffix products, no division allowed
// Example: productExceptSelf([1,2,3,4]) → [24,12,8,6]
function productExceptSelf(nums) {
  // implement
}

// Task 25: Longest consecutive sequence
// Time: O(n) | Space: O(n)
// Expected: Use Set, explain why sorting is O(n log n)
// Example: longestConsecutive([100,4,200,1,3,2]) → 4
function longestConsecutive(nums) {
  // implement
}

// Task 26: Merge intervals
// Time: O(n log n) | Space: O(n)
// Expected: Sort by start time, merge overlapping
// Example: merge([[1,3],[2,6],[8,10],[15,18]]) → [[1,6],[8,10],[15,18]]
function merge(intervals) {
  // implement
}

// ================================
// LEVEL 3: TREES
// ================================

// Task 27: Tree traversals
// Time: O(n) | Space: O(h) where h is height
// Expected: Implement all three: in-order, pre-order, post-order
// Explain differences and use cases
function inorderTraversal(root) {
  // implement
}

function preorderTraversal(root) {
  // implement
}

function postorderTraversal(root) {
  // implement
}

// Task 28: Maximum depth of binary tree
// Time: O(n) | Space: O(h)
// Expected: Recursive solution, explain call stack
// Example: maxDepth([3,9,20,null,null,15,7]) → 3
function maxDepth(root) {
  // implement
}

// Task 29: Validate Binary Search Tree
// Time: O(n) | Space: O(h)
// Expected: Use min/max boundaries, explain why just comparing
//           with children is insufficient
// Example: isValidBST([5,1,4,null,null,3,6]) → false
function isValidBST(root, min = -Infinity, max = Infinity) {
  // implement
}

// Task 30: Lowest Common Ancestor
// Time: O(n) | Space: O(h)
// Expected: Recursive reasoning for BST and binary tree
function lowestCommonAncestor(root, p, q) {
  // implement
}

// Task 31: Level order traversal (BFS)
// Time: O(n) | Space: O(w) where w is max width
// Expected: Use queue, return levels as nested arrays
// Example: levelOrder([3,9,20,null,null,15,7]) → [[3],[9,20],[15,7]]
function levelOrder(root) {
  // implement
}

// Task 32: Invert binary tree
// Time: O(n) | Space: O(h)
// Expected: Recursive swap of children
// Example: invert([4,2,7,1,3,6,9]) → [4,7,2,9,6,3,1]
function invertTree(root) {
  // implement
}

// ================================
// LEVEL 3: GRAPHS
// ================================

// Task 33: BFS traversal
// Time: O(V+E) | Space: O(V)
// Expected: Use queue, explain level-by-level exploration
// Use cases: shortest path in unweighted graph
function bfs(graph, start) {
  // implement
}

// Task 34: DFS traversal
// Time: O(V+E) | Space: O(V)
// Expected: Recursive or stack-based, explain backtracking
function dfs(graph, start) {
  // implement
}

// Task 35: Detect cycle in directed graph
// Time: O(V+E) | Space: O(V)
// Expected: DFS with recursion stack (3 colors: white, gray, black)
function hasCycle(graph) {
  // implement
}

// Task 36: Number of islands
// Time: O(m*n) | Space: O(m*n)
// Expected: DFS or BFS on matrix, mark visited cells
// Example: numIslands([["1","1","0"],["1","0","0"],["0","0","1"]]) → 2
function numIslands(grid) {
  // implement
}

// Task 37: Clone graph
// Time: O(V+E) | Space: O(V)
// Expected: DFS/BFS with HashMap to track cloned nodes
function cloneGraph(node) {
  // implement
}

// Task 38: Topological sort
// Time: O(V+E) | Space: O(V)
// Expected: DFS-based or Kahn's algorithm (BFS with in-degree)
// Explain dependency resolution use case
function topoSort(graph) {
  // implement
}

// ================================
// LEVEL 3: SHORTEST PATH
// ================================

// Task 39: Dijkstra's algorithm
// Time: O((V+E) log V) with min-heap | Space: O(V)
// Expected: Priority queue implementation, explain greedy choice
// Note: Doesn't work with negative weights
function dijkstra(graph, start) {
  // implement
}

// Task 40: Bellman-Ford algorithm
// Time: O(V*E) | Space: O(V)
// Expected: Relax all edges V-1 times, detect negative cycles
// Explain when to use over Dijkstra
function bellmanFord(graph, start) {
  // implement
}

// Task 41: Grid shortest path (BFS)
// Time: O(m*n) | Space: O(m*n)
// Expected: BFS on matrix with 4-directional movement
// Example: shortestPath([[0,0,0],[1,1,0],[0,0,0]]) → 4
function shortestPathBinaryMatrix(grid) {
  // implement
}

// ================================
// LEVEL 3: DYNAMIC PROGRAMMING
// ================================

// Task 42: Climbing Stairs
// Time: O(n) | Space: O(1)
// Expected: Explain memoization vs tabulation, optimize space
// Example: climbStairs(3) → 3 (ways: 1+1+1, 1+2, 2+1)
function climbStairs(n) {
  // implement
}

// Task 43: Coin Change
// Time: O(n*amount) | Space: O(amount)
// Expected: Bottom-up DP, explain subproblem structure
// Example: coinChange([1,2,5], 11) → 3 (5+5+1)
function coinChange(coins, amount) {
  // implement
}

// Task 44: Longest Common Subsequence
// Time: O(m*n) | Space: O(m*n)
// Expected: 2D DP table, explain recurrence relation
// Example: lcs("abcde", "ace") → 3 ("ace")
function longestCommonSubsequence(text1, text2) {
  // implement
}

// Task 45: House Robber
// Time: O(n) | Space: O(1)
// Expected: DP with space optimization
// Example: rob([2,7,9,3,1]) → 12 (rob 2+9+1)
function rob(nums) {
  // implement
}

// ================================
// DISCUSSION TASKS (No Code)
// ================================

// Discussion 1: Quick sort vs Merge sort
// - Stability
// - Space complexity
// - Average/worst case scenarios
// - Practical usage

// Discussion 2: BFS vs DFS
// - Memory usage
// - Use cases
// - Completeness
// - Path finding

// Discussion 3: When to use which shortest path algorithm?
// - BFS: unweighted graphs
// - Dijkstra: non-negative weights
// - Bellman-Ford: negative weights, cycle detection
// - A*: heuristic-based, game pathfinding
// - Floyd-Warshall: all pairs shortest path

// Discussion 4: Time vs Space trade-offs
// - Hash tables vs arrays
// - Recursion vs iteration
// - Caching strategies

// Discussion 5: Real-world applications
// - Where would you use topological sort? (build systems, task scheduling)
// - When is BFS better than Dijkstra? (unweighted graphs)
// - Practical uses of tries? (autocomplete, spell check)

// ================================
// BONUS: HEAP / PRIORITY QUEUE
// ================================

// Bonus 1: Implement Min Heap
// Time: insert O(log n), extractMin O(log n)
// Expected: Array-based implementation, explain heapify
class MinHeap {
  constructor() {
    // implement
  }

  insert(val) {
    // implement
  }

  extractMin() {
    // implement
  }
}

// Bonus 2: Top K Frequent Elements
// Time: O(n log k) | Space: O(n)
// Expected: Use heap or bucket sort
// Example: topKFrequent([1,1,1,2,2,3], 2) → [1,2]
function topKFrequent(nums, k) {
  // implement
}

// Bonus 3: Merge K Sorted Lists
// Time: O(N log k) where N is total elements
// Expected: Min heap approach
function mergeKLists(lists) {
  // implement
}

// ================================
// BONUS: BACKTRACKING
// ================================

// Bonus 4: Generate Permutations
// Time: O(n! * n) | Space: O(n)
// Expected: Backtracking with swap technique
// Example: permute([1,2,3]) → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
function permute(nums) {
  // implement
}

// Bonus 5: Combination Sum
// Time: O(2^n) | Space: O(target/min)
// Expected: Backtracking with pruning
// Example: combinationSum([2,3,6,7], 7) → [[2,2,3],[7]]
function combinationSum(candidates, target) {
  // implement
}

// ================================
// COMPLEXITY CHEAT SHEET
// ================================
/*
Common Time Complexities (best to worst):
O(1)         - Hash table lookup, array access
O(log n)     - Binary search, balanced tree operations
O(n)         - Linear search, single loop
O(n log n)   - Efficient sorting (merge, heap, quick)
O(n²)        - Nested loops, bubble sort
O(2^n)       - Recursive fibonacci, subsets
O(n!)        - Permutations

Common Space Complexities:
O(1)         - Few variables
O(log n)     - Recursion stack for balanced trees
O(n)         - Hash table, queue, stack
O(n²)        - 2D DP table, adjacency matrix

Data Structure Operations:
Array:       Access O(1), Search O(n), Insert O(n)
Hash Table:  Access O(1), Search O(1), Insert O(1)
Binary Tree: Access O(log n), Search O(log n), Insert O(log n)
Heap:        Access O(1), Search O(n), Insert O(log n)
*/
