const { parseInput } = require('../utils')
const { generateData } = require('./part1')

describe('it tests part1', () => {
    let tiles
    beforeEach(() => {
        let input = `Tile 1234:
abc
def
ghi
`
        tiles = generateData(input)
    })
    it('tests rotate', () => {
        tiles[1234].rotate()
        expect(tiles['1234'].data).toEqual([
            'gda',
            'heb',
            'ifc'
        ])
        expect(tiles[1234].orientation).toEqual(1)
        tiles[1234].rotate()
        expect(tiles[1234].data).toEqual([
            'ihg',
            'fed',
            'cba'
        ])
        expect(tiles[1234].orientation).toEqual(2)
        tiles[1234].rotate()
        expect(tiles[1234].data).toEqual([
            'cfi',
            'beh',
            'adg'
        ])
        expect(tiles[1234].orientation).toEqual(3)
        tiles[1234].rotate()
        expect(tiles['1234'].data).toEqual([
            'abc',
            'def',
            'ghi'
        ])
        expect(tiles[1234].orientation).toEqual(0)
    })
    it('tests flip', () => {
        tiles[1234].flip('vertical')
        expect(tiles[1234].data).toEqual([
            'ghi',
            'def',
            'abc'
        ])
        tiles[1234].flip()
        expect(tiles[1234].data).toEqual([
            'ihg',
            'fed',
            'cba'
        ])
    })
})