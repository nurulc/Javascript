/**
 * A LinkedList based solution for Rotating a List to the right by k places
 * 
 * ## Problem Statement:
 * 
 * Given a linked list, rotate the list to the right by k places, where k is positive or negetive.
 * 
 * Note:
 * * The solution is independent of the structure of the list, requires two functions
 *     * next(list) - get the next element of the linked list
 *     * setNext(list, nextNode) - sets the `next` value of the list and returns `nextNode`
 * * The default functios of the next(), and setNext() assumes that node.next points to the next element 
 * 
 * Link for the Problem: https://leetcode.com/problems/rotate-list/
 *
 * The code has been updated by Nurul Choudhury
 * 
 */

function rotateListRightInPlace (
          head,
          k, 
          next = head => head.next, 
          setNext=(node, val) => node?(node.next = val):undefined 
          ) {
  if(!head) return head;
  let len = 0
  let current = head;
  let tail;
  k
  while (current) {
    tail = current;
    current = next(current);
    len++
  }
  if(len === 1) return head;
  if(k>0) k = len-k;
  if(k<0) k = -k;
  k %= len;

  while(k--) {
    let current = head;
    [head, tail] = [next(current), setNext(tail,current)];
  }  
  setNext(tail,undefined);
  return head
}

/**
 * Example
 */

//Create a toString() method for a list node
function listToString(node) {
  if(!node) return 'null';
  return node.val + ' => '+ listToString(node.next);
}

/**
 * ## Test Rotation
 */

// Functio to create a linked list - for these tests
var list = () => [1,2,3,4,5,6,7]
    .reverse()
    .reduce((head,el) => 
        ({val: el, next: head, toString: listToString}), 
        undefined
    );

/**
 * Now test the code
 */

function rotate(n) {
  console.log('Rotate  '+n+': ', listToString(rotateListRightInPlace(list(),n)));    
}

// set's see some results              
[0,1,4,6,7,9,-1, -2].forEach(rotate);
