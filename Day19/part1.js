const input = require('./input')
const { parseInput } = require('../utils')
const { sub } = require('./input')

// const normalizeRules = (rules, rule) => {
//     rule = rule.replace(/"/g, '')
//     const [id, r] = rule.split(': ')
//     const [first, second] = r.split(' | ')
//     rules[id] = {
//         group1: first.split(' '),
//         group2: (second || '').split(' ').filter(item => item !== '')
//     }
//     return rules
// }
const normalizeRules = (rules, rule) => {
    rule = rule.replace(/"/g, '')
    const [id, r] = rule.split(': ')
    const [first, second] = r.split(' | ')
    rules[id] = r
    return rules
}

const buildRuleList = (rules, rule='0') => {
    //console.log({ rule })
    if (rules[rule] === 'a' || rules[rule] === 'b') {
        return rules[rule]
    }
    const ruleList = rules[rule].split(' | ')
    let group1 = ruleList[0].split(' ')
    let val = ''
    for (let subrule of group1) {
        let nextVal = buildRuleList(rules, subrule)
        if (nextVal.indexOf(',') > -1) {
            //console.log(`NextVal: ${nextVal}, Val: ${val}`)
            val = nextVal.split(',').map(v => val.split(',').map(nv => nv + v).join(',')).join(',')
            //console.log(`Val: ${val}`)
        } else {
            val = val.split(',').map(v => v + nextVal).join(',')
        }
    }
    //console.log(`Rule ${rule}, group1 val = ${val}`)

    if (ruleList[1]) {
        let group2 = ruleList[1].split(' ')
        let val2 = ''
        for (let subrule of group2) {
            let nextVal = buildRuleList(rules, subrule)
            if (nextVal.indexOf(',') > -1) {
                val2 = nextVal.split(',').map(v => val2.split(',').map(nv => nv + v).join(',')).join(',')
            } else {
                val2 = val2.split(',').map(v => v + nextVal).join(',')
            }
        }
        //console.log(`Rule ${rule} val = ${val},${val2}`)
    
        //console.log(val, val2)
        return val + ',' + val2
    }
    //console.log(`Rule ${rule} val = ${val}`)
    return val
}

const main = () => {
    const [r, i] = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    const rules = parseInput(r).reduce(normalizeRules, {})
    const images = parseInput(i)
    let list = buildRuleList(rules)
    list = list.split(',').reduce((total, rule) => {
        total[rule] = true
        return total
    }, {})

    let counter = 0
    images.forEach(image => {
        if (list[image]) {
            counter++
        }
    })
    console.log(`${counter} images match`)
}

//main()

module.exports = {
    buildRuleList,
    normalizeRules,
}