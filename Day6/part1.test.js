const { getUniqueLetters } = require("./part1")

it('returns unique letters', () => {
    const result = getUniqueLetters('abc')
    expect(result).toEqual(['a', 'b', 'c'])
    const result2 = getUniqueLetters('abcabc')
    expect(result2).toEqual(['a', 'b', 'c'])
})