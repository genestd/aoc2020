const { getRow, getSeat, getSeatNumber } = require("./part2");

it('returns a seat number', () => {
    const row1= getRow('BFFFBBFRRR')
    const row2= getRow('FFFBBBFRRR')
    const row3= getRow('BBFFBBFRLL')
    const seat1 = getSeat('BFFFBBFRRR')
    const seat2 = getSeat('FFFBBBFRRR')
    const seat3 = getSeat('BBFFBBFRLL')

    const result1 = getSeatNumber(row1, seat1)
    const result2 = getSeatNumber(row2, seat2)
    const result3 = getSeatNumber(row3, seat3)

    expect(result1).toBe(567)
    expect(result2).toBe(119)
    expect(result3).toBe(820)
})