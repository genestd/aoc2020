const { default: LinkedList } = require("./LinkedList")

describe('Linked List tests', () => {
    let ll, ll2
    beforeEach(() => {
        ll = new LinkedList()
        ll2 = new LinkedList()
        ll2.add(1)
        ll2.add(2, 1)
    })
    it('Tests add', () => {
        ll.add(1)
        expect(ll.length).toBe(1)
        ll.add(2)
        expect(ll.length).toBe(2)
    })
    it('tests get', () => {
        const result = ll2.get(1)
        expect(result).toEqual({
            value: 1,
            next: 2,
            prev: 2
        })
        const result2 = ll2.get(2)
        expect(result2).toEqual({
            value: 2,
            next: 1,
            prev: 1
        })
        ll.add(1)
        const result3 = ll.get(1)
        expect(result3).toEqual({ value: 1, next: 1, prev: 1 })
    })
    it('tests delete', () => {
        ll2.delete(1)
        expect(ll2.length).toBe(1)
        const result = ll2.get(2)
        expect(result).toEqual({
            value: 2,
            prev: 2,
            next: 2
        })
    })
    it('tests insert', () => {
        ll2.insert(1, [3,4])
        console.log(ll2)
        expect(ll2.length).toBe(4)
        const result = ll2.get(1)
        expect(result).toEqual({
            value: 1,
            next: 3,
            prev: 2
        })
    })
})