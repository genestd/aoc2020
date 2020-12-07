const { buildBagHeirarchy, canHoldColor, normalizeBagData } = require("./part1")
const { parseInput } = require('../utils')
const { getInnerBagCount } = require("./part2")
describe('Part 2 Tests', () => {
    let bagData
    let bagData2
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
        
        const data2 = `shiny gold bags contain 2 dark red bags.
        dark red bags contain 2 dark orange bags.
        dark orange bags contain 2 dark yellow bags.
        dark yellow bags contain 2 dark green bags.
        dark green bags contain 2 dark blue bags.
        dark blue bags contain 2 dark violet bags.
        dark violet bags contain no other bags.`

        bagData = parseInput(data).map(normalizeBagData)
        bagData2 = parseInput(data2).map(normalizeBagData)
        
    })
    it('returns a number', () => {
        const bags = buildBagHeirarchy(bagData)
        const bags2 = buildBagHeirarchy(bagData2)

        const result = getInnerBagCount('shiny gold', bags)
        expect(typeof result).toBe('number')
        expect(result).toBe(32)

        const result2 = getInnerBagCount('shiny gold', bags2)
        expect(result2).toBe(126)
    })


})