const { parseInput } = require('../utils')
const { normalizeRules, buildRuleList } = require('./part1')
describe('Part 1 test', () => {
    let data, data1
    beforeEach(() => {
        const input = `0: 1 2
1: "a"
2: 1 3 | 3 1
3: "b"`
        const input1 = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"`
        data = parseInput(input).reduce(normalizeRules, {})
        data1 = parseInput(input1).reduce(normalizeRules, {})
    })

    it('Builds simple rule list', () => {
        //console.log(data)
        // const match = buildRuleList(data, '1')
        // expect(match).toEqual('a')
        // const match2 = buildRuleList(data, '2')
        // expect(match2).toEqual('ab,ba')
        // const match3 = buildRuleList(data, '0')
        // expect(match3).toEqual('aab,aba')
    })
    it('Builds harder rule list', () => {
        const match = buildRuleList(data1, '1')
        expect(match).toEqual('aaab,bbab,aaba,bbba,abaa,baaa,abbb,babb')
        const match2 = buildRuleList(data1, '0')
        expect(match2).toEqual('aaaabb,abbabb,aaabab,abbbab,aabaab,abaaab,aabbbb,ababbb')
    })
})