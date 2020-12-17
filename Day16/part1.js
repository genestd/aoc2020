const input = require('./input')
const { parseInput } = require('../utils')

const normalizeRules = (result, record) => {
    const [description, ranges] = record.split(': ')
    const [range1, range2] = ranges.split(' or ')
    const [range1Low, range1High] = range1.split('-').map(item => parseInt(item, 10))
    const [range2Low, range2High] = range2.split('-').map(item => parseInt(item, 10))
    result[description] = {
        range1Low,
        range1High,
        range2Low,
        range2High
    }
    return result
}

const scan = (ticket, rules) => {
    let errors = 0
    const ruleKeys = Object.keys(rules)
    for (let field of ticket) {
        field = parseInt(field, 10)
        let valid = false
        ruleKeys.forEach(key => {
            //console.log(rules[key])
            if ((field >= rules[key].range1Low && field <= rules[key].range1High) || 
                (field >= rules[key].range2Low && field <= rules[key].range2High)) {
                    valid = true
            }
        })
        if (!valid) errors = errors + field
    }
    return errors
    // 2224412 too high
}

const main = () => {
    const [r, mt, nt] = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    const rules = parseInput(r).reduce(normalizeRules, {})
    let [trash, myTicket] = parseInput(mt).map(item => item.split(','))
    myTicket = myTicket.map(item => parseInt(item, 10))
    let nearbyTickets = parseInput(nt).filter((item, index) => index>0).map(item => item.split(','))

    let totalErrors = 0
    for (let ticket of nearbyTickets) {
        let errorValue = scan(ticket, rules)
        console.log({ticket, errorValue})
        totalErrors = totalErrors + errorValue
    }
    console.log(totalErrors)
}   

main()

module.exports = {
    normalizeRules
}