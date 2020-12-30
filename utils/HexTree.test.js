const { HexTree } = require("./HexTree")
const testInput = require('../Day24/input copy')
const {parseInput} = require('../utils')
const { normalize } = require('../Day24/part2')

describe('Hex Tree class tests', () => {
    let tree, input
    beforeEach(() => {
        tree = new HexTree()
        input = parseInput(testInput).map(normalize)
    })
    it('Tests move', () => {
        const ne = tree.move('0|0', 'ne')
        expect(ne).toBe('0|1')
        expect(tree.data).toEqual({
            '0|0': 'white',
            '0|1': 'white',
            '1|0': 'white',
            '0|-1': 'white',
            '-1|1': 'white',
            '-1|0': 'white',
            '-1|-1': 'white',
            '0|2': 'white',
            '1|2': 'white',
            '1|1': 'white'
        })
        const e = tree.move('0|0', 'e')
        expect(e).toBe('1|0')
        expect(tree.data).toEqual({
            '0|0': 'white',
            '0|1': 'white',
            '1|0': 'white',
            '0|-1': 'white',
            '-1|1': 'white',
            '-1|0': 'white',
            '-1|-1': 'white',
            '0|2': 'white',
            '1|2': 'white',
            '1|1': 'white',
            '2|0': 'white',
            '1|-1': 'white'
        })
        const se = tree.move('0|0', 'se')
        expect(se).toBe('0|-1')
        expect(tree.data).toEqual({
            '0|0': 'white',
            '0|1': 'white',
            '1|0': 'white',
            '0|-1': 'white',
            '-1|1': 'white',
            '-1|0': 'white',
            '-1|-1': 'white',
            '0|2': 'white',
            '1|2': 'white',
            '1|1': 'white',
            '2|0': 'white',
            '1|-1': 'white',
            '1|-2': 'white',
            '0|-2': 'white',
        })
        const sw = tree.move('0|0', 'sw')
        expect(sw).toBe('-1|-1')
        expect(tree.data).toEqual({
            '0|0': 'white',
            '0|1': 'white',
            '1|0': 'white',
            '0|-1': 'white',
            '-1|1': 'white',
            '-1|0': 'white',
            '-1|-1': 'white',
            '0|2': 'white',
            '1|2': 'white',
            '1|1': 'white',
            '2|0': 'white',
            '1|-1': 'white',
            '1|-2': 'white',
            '0|-2': 'white',
            '-1|-2': 'white',
            '-2|-1': 'white',
        })
        // const w = tree.move('0|0', 'w')
        // expect(w).toBe('-1|0')
        // expect(tree.data).toEqual({
        //     '0|0': 'white',
        //     '0|1': 'white',
        //     '1|0': 'white',
        //     '0|-1': 'white',
        //     '-1|-1': 'white',
        //     '-1|0': 'white'
        // })
        // const nw = tree.move('0|0', 'nw')
        // expect(nw).toBe('-1|1')
        // expect(tree.data).toEqual({
        //     '0|0': 'white',
        //     '0|1': 'white',
        //     '1|0': 'white',
        //     '0|-1': 'white',
        //     '-1|-1': 'white',
        //     '-1|0': 'white',
        //     '-1|1': 'white'
        // })
    })
    it('Tests circular move', () => {
        const one = tree.move('0|0', 'ne')
        expect(one).toBe('0|1')
        const eight = tree.move(one, 'e')
        expect(eight).toBe('1|1')
        const twelve = tree.move(eight, 'se')
        expect(twelve).toBe('2|0')
        const two = tree.move(twelve, 'w')
        const zero = tree.move(two, 'w')
        //console.log(tree.data)
        expect(zero).toBe('0|0')
    })
    it('Tests flip', () => {
        const nw = tree.move('0|0', 'nw')
        tree.flip(nw)
        expect(tree.data[nw]).toBe('black')
        tree.flip(nw)
        expect(tree.data[nw]).toBe('white')
    })
    it('Tests getAdjacentNodes', () => {
        tree.move('0|0', 'e')
        tree.move('1|0', 'e')
        const result = tree.getAdjacentNodes('2|0')
        expect(result.length).toBe(6)
        expect(result).toEqual([
            '3|0','1|0','2|1','2|-1','1|1','1|-1'
        ])
    })
    it('tests testinput', () => {
        input.forEach(directionList => {
            let nextNode = '0|0'
            directionList.forEach(dir => {
                nextNode = tree.move(nextNode, dir)
            })
            tree.flip(nextNode)
        })
        let black = Object.keys(tree.data).filter(key => tree.data[key] === 'black').length
        expect(black).toBe(10)
        const count = tree.count('1|0')
        expect(count).toBe(2)
        const count2 = tree.count('1|3')
        expect(count2).toBe(0)
        const count3 = tree.count('-1|0')
        expect(count3).toBe(5)
    })
})