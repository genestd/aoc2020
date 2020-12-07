const { buildBagHeirarchy, canHoldColor, normalizeBagData } = require("./part1")
const { parseInput } = require('../utils')
describe('Part 1 Tests', () => {
    let bagData
    beforeEach(() => {
        const data = `light red bags contain 1 bright white bag, 2 muted yellow bags.
        dark orange bags contain 3 bright white bags, 4 muted yellow bags.
        bright white bags contain 1 shiny gold bag.
        muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
        shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
        dark olive bags contain 3 faded blue bags, 4 dotted black bags.
        vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
        faded blue bags contain no other bags.
        dotted black bags contain no other bags.`
        
        bagData = parseInput(data).map(normalizeBagData)
    })
    it('returns an object', () => {
        const result = buildBagHeirarchy(bagData)
        expect(typeof result).toBe('object')
        expect(result['vibrant plum'])
            .toEqual({
                'faded blue': 5,
                'dotted black': 6
            })
    })
    it('returns a boolean', () => {
        const bags = buildBagHeirarchy(bagData)
        const result = canHoldColor('dotted black', bags['vibrant plum'], bags)
        expect(typeof result).toBe('boolean')
        expect(result).toBe(true)
        const result2 = canHoldColor('shiny gold', bags['light red'], bags)
        expect(result2).toBe(true)
    })
})