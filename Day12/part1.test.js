const { parseInput } = require("../utils")
const { normalize, move } = require("./part1")

describe('Day 12 part 1 tests', () => {
    let data
    let position
    beforeEach(() => {
        position = { x: 0, y: 0, facing: 90}
        const input =`F10
N3
F7
R90
F11`
        data = parseInput(input).map(normalize)
    })
    it('performs moves', () => {
        const newPosition = move(position, data[0])
        expect(newPosition).toEqual({ x:10, y: 0, facing: 90 })
        const newPosition1 = move(newPosition, data[1])
        expect(newPosition1).toEqual({ x:10, y: 3, facing: 90 })
        const newPosition2 = move(newPosition1, data[2])
        expect(newPosition2).toEqual({ x:17, y: 3, facing: 90 })
        const newPosition3 = move(newPosition2, data[3])
        expect(newPosition3).toEqual({ x:17, y: 3, facing: 180 })
        const newPosition4 = move(newPosition3, data[4])
        expect(newPosition4).toEqual({ x:17, y: -8, facing: 180 })
    })
})