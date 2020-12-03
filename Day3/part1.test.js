const testData = [
    '..#......###....#...##..#.#....',
    '.#.#.....#.##.....###...##...##',
    '..#.#..#...........#.#..#......',
    '..#......#..........###........',
    '...#..###..##.#..#.......##..##',
    '......#.#.##...#...#....###....'
    ]
const getNextXCoordinate = require('./part1').getNextXCoordinate
const getNextYCoordinate = require('./part1').getNextYCoordinate
const checkForTreeAtPosition = require('./part1').checkForTreeAtPosition

it('should return a number', () => {
    const result = getNextXCoordinate(0, 3, 10)
    expect(typeof result).toBe('number')
})

it('should add 3 to the current position', () => {
    const result = getNextXCoordinate(0, 3, 10)
    expect(result).toBe(3)
})

it('should add wrap at the end of the line', () => {
    const result = getNextXCoordinate(9, 3, 10)
    expect(result).toBe(2)
})

it('should return a number', () => {
    const result = getNextYCoordinate(0, 3)
    expect(typeof result).toBe('number')
})

it('should add 1 to the current position', () => {
    const result = getNextYCoordinate(0, 1)
    expect(result).toBe(1)
})

it('should return a boolean', () => {
    const result = checkForTreeAtPosition(2, 0, testData)
    expect(typeof result).toBe('boolean')
})

it('should return false', () => {
    const result = checkForTreeAtPosition(3, 0, testData)
    expect(result).toBe(false)
})
it('should return true', () => {
    const result = checkForTreeAtPosition(2, 3, testData)
    expect(result).toBe(true)
})