/**
 * A LinkedList based solution for Detect a Cycle in a list
 * https://en.wikipedia.org/wiki/Cycle_detection
 * 
 * ## Cycle Detection - Problem Statement:
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * 
 * Note:
 * * While Solving the problem in given link below, don't use main() function.
 * * Just use only the code inside main() function.
 * * The purpose of using main() function here is to aviod global variables.
 * 
 * Link for the Problem: https://leetcode.com/problems/linked-list-cycle/
 *
 * 
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val, next=null) {
 *       this.val = val;
 *       this.next = next
 *     }
 *     
 *     setNext(aNode) {
 *        this.next = aNode;
 *     }
 * }
 */

 class ListNode {
     constructor(val, next=null) {
       this.val = val;
       this.next = next
     }
     
     setNext(aNode) {
        this.next = aNode;
     }
 }


/*

mermaidAPI.initialize({
     startOnLoad:true
 });
 $(function(){
     const graphDefinition = 'graph TB\na-->b';
     const cb = function(svgGraph){
         console.log(svgGraph);
     };
     mermaidAPI.render('id1',graphDefinition,cb);
 });

 */

/**
 * Example
 *
 * ## Setup testing for cycle detection
 * 
 */

function cons(a,b=null) {
  return new ListNode(a,b)
 }
 

/**
 * The code sample given above is basically relies on the fact that a cycle in a singly linked list
 * means that the shape of the list looks like a neclace, with a pendent on it. You enter the loop
 * via the pendent, once in the loop you keep on looping.
 *
 * If there is no cycle a slow mover will never catch up to a fast mover. If there is no loop the 
 * stepping will terminate when we reach the end of the loop.
 * 
 * <img src="../../tryit_it/images/circularlinkedlist.png" width="300px" />
 */

function makeList() {
  let n4 = cons(-4);
  let n2 = cons(2,cons(0,n4))
  n4.setNext(n2);
 return cons(3,n2);
}

function main () {
  const head = makeList(); 
  let fast = head
  let slow = head

  while (fast != null && fast.next != null && slow != null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}

/**
 * 
 *  ## Test cycle detection
 */
main()

/**
 * # A general cycle detection algorithm (principle works with cyclic graphs also).
 *
 * The code below gives a more general cycle detection algorithm for graphs, where a
 * singly linked list is a simple graph.
 *
 * * Remember all the nodes visited
 * * It's a cycle if you come back to the same place.
 * 
 */

function cycleDetection(head) {
  let visited = new Set();
  while(head.next) {
    if(visited.has(head)) return true;
    visited.add(head);
    head = head.next;
  }
  return false;
}

/**
 *
 * ## Setup Test for Cycle Detection
 *
 * The list has the following structure
 * 
 *   1 -> 3 -> 2 -> 5 -> 0 -> -4
 *             ^               |
 *             |               |
 *             +---------------+
 */


let n4 = cons(-4);
let n2 = cons(2,cons(5,cons(0,n4)));
n4.setNext(n2);
let n1 = cons(1,cons(3,n2));

cycleDetection(n1);
