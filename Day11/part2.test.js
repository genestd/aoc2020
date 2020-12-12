const { parseInput } = require("../utils")
const { countAdjacentOccupiedSeats, doRules, isLineOfSightOccupied,
    getMutation, countAllOccupiedSeats } = require("./part2")

describe('Part 2 tests', () => {
    let seatingChart
    let seatingChart2
    beforeEach(() => {
        const input = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`
        const input2 = `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`
        const input3 = `.............
.L.L.#.#.#.#.
.............`
        seatingChart = parseInput(input).map(row => row.split('')).reduce((chart, row, index) => {
            chart[index] = row
            return chart
        }, [])
        seatingChart2 = parseInput(input2).map(row => row.split('')).reduce((chart, row, index) => {
            chart[index] = row
            return chart
        }, [])
        seatingChart3= parseInput(input3).map(row => row.split('')).reduce((chart, row, index) => {
            chart[index] = row
            return chart
        }, [])
    })
    it('tests direction mutation', () => {
        const r1 = getMutation('N')
        const r2 = getMutation('S')
        const r3 = getMutation('E')
        const r4 = getMutation('W')
        const r5 = getMutation('NE')
        const r6 = getMutation('NW')
        const r7 = getMutation('SE')
        const r8 = getMutation('SW')
        expect(r1).toEqual([0, 1])
        expect(r2).toEqual([0,-1])
        expect(r3).toEqual([1, 0])
        expect(r4).toEqual([-1,0])
        expect(r5).toEqual([1, 1])
        expect(r6).toEqual([-1,1])
        expect(r7).toEqual([1,-1])
        expect(r8).toEqual([-1,-1])
    })
    it('checks the line of sight', () => {
        // 4, 3
        const result = isLineOfSightOccupied([4, 3], 'N', seatingChart)
        expect(result).toBe(true)
        const result1 = isLineOfSightOccupied([4, 3], 'NE', seatingChart)
        expect(result1).toBe(true)
        const result2 = isLineOfSightOccupied([4, 3], 'NW', seatingChart)
        expect(result2).toBe(true)
        const result3 = isLineOfSightOccupied([4, 3], 'E', seatingChart)
        expect(result3).toBe(true)
        const result4 = isLineOfSightOccupied([4, 3], 'W', seatingChart)
        expect(result4).toBe(true)
        const result5 = isLineOfSightOccupied([4, 3], 'S', seatingChart)
        expect(result5).toBe(true)
        const result6 = isLineOfSightOccupied([4, 3], 'SE', seatingChart)
        expect(result6).toBe(true)
        const result7 = isLineOfSightOccupied([4, 3], 'SW', seatingChart)
        expect(result7).toBe(true)
    })
    it('checks the line of sight', () => {
        // 4, 3
        const result = isLineOfSightOccupied([3, 3], 'N', seatingChart2)
        expect(result).toBe(false)
        const result1 = isLineOfSightOccupied([3, 3], 'NE', seatingChart2)
        expect(result1).toBe(false)
        const result2 = isLineOfSightOccupied([3, 3], 'NW', seatingChart2)
        expect(result2).toBe(false)
        const result3 = isLineOfSightOccupied([3, 3], 'E', seatingChart2)
        expect(result3).toBe(false)
        const result4 = isLineOfSightOccupied([3, 3], 'W', seatingChart2)
        expect(result4).toBe(false)
        const result5 = isLineOfSightOccupied([3, 3], 'S', seatingChart2)
        expect(result5).toBe(false)
        const result6 = isLineOfSightOccupied([3, 3], 'SE', seatingChart2)
        expect(result6).toBe(false)
        const result7 = isLineOfSightOccupied([3, 3], 'SW', seatingChart2)
        expect(result7).toBe(false)
        const result8 = isLineOfSightOccupied([1,1], 'SW', seatingChart3)
        expect(result8).toBe(false)
    })
    it('counts visible seats', () => {

    })
})