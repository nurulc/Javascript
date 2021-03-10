/**
 * Implementation of a doubly linked list
 *
 * Hamza chabchoub contribution for a university project
 */


// 
function DoubleLinkedList () {
  const Node = function (element) {
    this.element = element
    this.next = null
    this.prev = null
  }
  Node.prototype.toString = function() {
    return ''+this.element;
  }

  let length = 0
  let head = null
  let tail = null

  this.newNode(element) {
    return new Node(element);
  }
  // Add new element
  this.append = function (element) {
    const node = new Node(element)

    if (!head) {
      head = node
      tail = node
    } else {
      node.prev = tail
      tail.next = node
      tail = node
    }

    length++
  }

  // Add element
  this.insert = function (position, element) {
    // Check of out-of-bound values
    if (position >= 0 && position <= length) {
      const node = new Node(element)
      let current = head
      let previous = 0
      let index = 0

      if (position === 0) {
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else if (position === length) {
        current = tail
        current.next = node
        node.prev = current
        tail = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        node.next = current
        previous.next = node

        // New
        current.prev = node
        node.prev = previous
      }

      length++
      return true
    } else {
      return false
    }
  }

  // Remove element at any position
  this.removeAt = function (position) {
    // look for out-of-bounds value
    if (position > -1 && position < length) {
      let current = head
      let previous = 0
      let index = 0

      // Removing first item
      if (position === 0) {
        head = current.next

        // if there is only one item, update tail //NEW
        if (length === 1) {
          tail = null
        } else {
          head.prev = null
        }
      } else if (position === length - 1) {
        current = tail
        tail = current.prev
        tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        // link previous with current's next - skip it
        previous.next = current.next
        current.next.prev = previous
      }

      length--
      return current.element
    } else {
      return null
    }
  }

  // Get the indexOf item
  this.indexOf = function (elm) {
    let current = head
    let index = -1

    // If element found then return its position
    while (current) {
      if (elm === current.element) {
        return ++index
      }

      index++
      current = current.next
    }

    // Else return -1
    return -1
  }

  // Find the item in the list
  this.isPresent = (elm) => {
    return this.indexOf(elm) !== -1
  }

  // Delete an item from the list
  this.delete = (elm) => {
    return this.removeAt(this.indexOf(elm))
  }

  // Delete first item from the list
  this.deleteHead = function () {
    this.removeAt(0)
  }

  // Delete last item from the list
  this.deleteTail = function () {
    this.removeAt(length - 1)
  }

  // Print item of the string
  this.toString = function () {
    let current = head
    let string = ''

    while (current) {
      string += current.element + (current.next ? '\n' : '')
      current = current.next
    }

    return string
  }

  // Convert list to array
  this.toArray = function () {
    const arr = []
    let current = head

    while (current) {
      arr.push(current.element)
      current = current.next
    }

    return arr
  }

  // Check if list is empty
  this.isEmpty = function () {
    return length === 0
  }

  // Get the size of the list
  this.size = function () {
    return length
  }

  // Get the head
  this.getHead = function () {
    return head
  }

  // Get the tail
  this.getTail = function () {
    return tail
  }
}

/**
 * Example
 */

const newDoubleLinkedList = new DoubleLinkedList()
[1,2,3,4,5,6].forEach(e => newDoubleLinkedList.append(e))

console.log('display: ' + newDoubleLinkedList.toString(), 'Expect 6');
let aNode = newDoubleLinkedList.newNode(7);
console.log('New Node', aNode.toString(), 'Expect 7'); 
console.log('size: ' + newDoubleLinkedList.size(), 'Expect 6'); 
console.log('getHead: ' + newDoubleLinkedList.getHead().toString(), 'Expect 1'); 
console.log('getTail: ' + newDoubleLinkedList.getTail().toString(), 'Expect 1'); 
console.log('isEmpty: ' + newDoubleLinkedList.isEmpty(), 'Expect false'); 
