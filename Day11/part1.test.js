const { parseInput } = require("../utils")
const { countAdjacentOccupiedSeats, isSeatOccupied, doRules, countAllOccupiedSeats } = require("./part1")

describe('Part 1 tests', () => {
    let seatingChart
    beforeEach(() => {
        const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
        seatingChart = parseInput(input).map(row => row.split('')).reduce((chart, row, index) => {
            chart[index] = row
            return chart
        }, [])
    })
    it('returns true if seat is occupied', () => {
        const result = isSeatOccupied([0,0], seatingChart)
        expect(result).toBe(false)
        seatingChart[0][1] = '#'
        const result2 = isSeatOccupied([0,1], seatingChart)
        expect(result2).toBe(true)
        const result3 = isSeatOccupied([-1, -1], seatingChart)
        expect(result3).toBe(false)
    })
    it('counts adjacent occupied seats', () => {
        const result = countAdjacentOccupiedSeats([0,0], seatingChart)
        expect(result).toBe(0)
        seatingChart[0][1] = '#'
        const result2 = countAdjacentOccupiedSeats([0,1], seatingChart)
        expect(result2).toBe(0)
        const result3 = countAdjacentOccupiedSeats([0,2], seatingChart)
        expect(result3).toBe(1)
    })
    it('counts occupied seats', () => {
        const result = countAllOccupiedSeats(seatingChart)
        expect(result).toBe(0)
        seatingChart[0][1] = '#'
        const result1 = countAllOccupiedSeats(seatingChart)
        expect(result1).toBe(1)

    })
    it('runs the rules', () => {
        const newChart = doRules(seatingChart)
        const result = countAllOccupiedSeats(newChart)
        expect(result).toBe(71)
        const newChart2 = doRules(newChart)
        const result1 = countAllOccupiedSeats(newChart2)
        expect(result1).toBe(20)
    })
})