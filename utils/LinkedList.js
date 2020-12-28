const md5 = require('md5')

class LinkedList {
    constructor() {
        this.length = 0
        this.data = {}
        this.last = null
    }

    add(item, pointer = null) {
        if (!this.data.item) {
            // add to length
            this.length = this.length + 1

            //add item
            this.data[item] = {
                value: item,
                next: pointer ? this.get(pointer).next : item,
                prev: pointer ? pointer : item
            }

            // set pointer
            if (this.data[pointer]) {
                this.data[this.data[pointer].next].prev = item
                this.data[pointer].next = item
            } 
        }
    }

    get(item) {
        return this.data[item]
    }

    delete(id) {
        const item = this.get(id)
        if (item) {
            if (this.data[item.prev]) {
                this.data[item.prev].next = item.next
            }
            if (this.data[item.next]) {
                this.data[item.next].prev = item.prev
            }
            delete this.data[id]
            this.length = this.length - 1
        }
    }

    insert(start, items) {
        items = items.map(i => ({ value: i, next: null, prev: null }))
        let current = this.get(start)
        for (let i=0; i<items.length; i++) {
            this.data[items[i].value] = items[i]
            this.length = this.length + 1
            items[i].prev = current.value
            items[i].next = current.next
            current.next = items[i].value
            current = items[i]
        }
        this.data[current.next].prev = current.value
    }

    print(start) {
        let curr = this.get(start)
        console.log({curr, start})
        while (curr.next !== start) {
            curr = this.get(curr.next)
            console.log(curr.value)
        }
    }
}

module.exports.default = LinkedList