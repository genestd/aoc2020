const { doOperation, doMath, simplifyParentheses } = require("./part1")

describe('Part 1 tests', () => {
    it('performs operations', () => {
        const result = doOperation(1, '+', 2)
        expect(result).toBe(3)
        const result2 = doOperation(5, '*', 5)
        expect(result2).toBe(25)
    })
    it('tests the doMath function', () => {
        const result = doMath(`1 + 2 * 3 + 4 * 5 + 6`)
        expect(result).toBe(71)
    })
    it('tests simplifyParentheses', () => {
        const result = simplifyParentheses('(1 + 2)')
        expect(result).toBe('3')
        const result2 = simplifyParentheses('1 + (1 + 2)')
        expect(result2).toBe('1 + 3')
        const result3 = simplifyParentheses('(1 + (1 + 2 + 3))')
        expect(result3).toBe('7')
        const result4 = simplifyParentheses('(1 + 5) * (1 + 2)')
        expect(result4).toBe('6 * 3')
    })
    it('does some math', () => {
        const result = doMath(simplifyParentheses('1 + (2 * 3) + (4 * (5 + 6))'))
        expect(result).toBe(51)
    })
})