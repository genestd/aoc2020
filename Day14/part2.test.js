const { applyMaskToValue, writeValueToMaskedMemory } = require("./part2")

describe('Part 2 tests', () => {
    it('test the masking', () => {
        const result = applyMaskToValue('000000000000000000000000000000X1001X', 42)
        expect(result).toBe('000000000000000000000000000000X1101X')
        // const result2 = applyMaskToValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 101)
        // expect(result2).toBe(101)
        // const result3 = applyMaskToValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 0)
        // expect(result3).toBe(64)

        // const result4 = applyMaskToValue('0X011111101X1X10X101X10XX001001X0011', 290)
        // expect(result4).toBe(8500101411)        
    })
    it('tests writeValueToMaskedMemory', () => {
        const result = writeValueToMaskedMemory('000000000000000000000000000000X1101X', {}, 100)
        console.log(result)
    })
})