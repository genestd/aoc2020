const { countAdjacentActiveCubes, cycle, countActiveCubes } = require('./part1')
const { parseInput } = require('../utils')

describe('part 1 tests', () => {
    let dimensions = []
    let testInput = `.#.
..#
###`
    beforeEach(() => {
        const data = parseInput(testInput).map(row => row.split(''))
        dimensions = {
            lowPlane: 0,
            highPlane: 0,
            lowRow: 0,
            highRow: data.length - 1,
            lowCol: 0,
            highCol: data[0].length - 1
        }
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                const key = `0|${row}|${col}`
                dimensions[key] = data[row][col]
            }
        }
    })

    it('counts adjacent cubes', () => {
        const result = countAdjacentActiveCubes([0,0,0], dimensions)
        expect(result).toEqual(1)
        const result2 = countAdjacentActiveCubes([0,1,1], dimensions)
        expect(result2).toEqual(5)
    })
    it('tests the cycle', () => {
        const result = cycle(dimensions)
        expect(Object.keys(result).length).toBe(81)
        const result2 = cycle(result)
        expect(Object.keys(result2).length).toBe(251)
    })
    it('tests count active cubes', () => {
        const result = cycle(dimensions)
        const cubes = countActiveCubes(result)
        expect(cubes).toBe(11)
    })
})