const { italics } = require("../Day4/input");
const { getRow, getSeat, getSeatNumber } = require("./part1");

it('returns a row number', () => {
    const result = getRow('BFFFBBF')
    expect(typeof result).toBe('number')
    expect(result).toBe(70)
    const result2 = getRow('FFFBBBF')
    expect(result2).toBe(14)
})

it('returns a seat column', () => {
    const result = getSeat('RRR')
    expect(typeof result).toBe('number')
    expect(result).toBe(7)
})

it('returns a seat number', () => {
    const row1= getRow('BFFFBBFRRR'.substring(0,7))
    const row2= getRow('FFFBBBFRRR'.substring(0,7))
    const row3= getRow('BBFFBBFRLL'.substring(0,7))
    const seat1 = getSeat('BFFFBBFRRR'.substring(7))
    const seat2 = getSeat('FFFBBBFRRR'.substring(7))
    const seat3 = getSeat('BBFFBBFRLL'.substring(7))

    const result1 = getSeatNumber(row1, seat1)
    const result2 = getSeatNumber(row2, seat2)
    const result3 = getSeatNumber(row3, seat3)

    expect(result1).toBe(567)
    expect(result2).toBe(119)
    expect(result3).toBe(820)
})