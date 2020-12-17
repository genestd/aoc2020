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
        range2High,
        indexes: []
    }
    return result
}

const hasErrors = (ticket, rules) => {
    let errors = 0
    const ruleKeys = Object.keys(rules)
    for (let field of ticket) {
        field = parseInt(field, 10)
        let valid = false
        for (let key of ruleKeys) {
            if ((field >= rules[key].range1Low && field <= rules[key].range1High) || 
                (field >= rules[key].range2Low && field <= rules[key].range2High)) {
                valid = true
            }
        }
        if (!valid) errors = errors + 1
    }
    return errors > 0
    // 2224412 too high
}

const getFieldsForDescription = (descriptionObj, tickets) => {
    for (i=0; i<20; i++) {
        let candidate = true
        for(t=0; t<tickets.length; t++) {
            if ((tickets[t][i] >= descriptionObj.range1Low && tickets[t][i] <= descriptionObj.range1High) || 
                (tickets[t][i] >= descriptionObj.range2Low && tickets[t][i] <= descriptionObj.range2High)) {
            } else {
                if (i === 19) { console.log(`Ticket ${t} is not valid (${tickets[t][i]})`)}
                candidate = false;
            }
        }
        if (candidate) {
            descriptionObj.indexes.push(i)
        }
    }
}

const main = () => {
    const [r, mt, nt] = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    const rules = parseInput(r).reduce(normalizeRules, {})
    let [trash, myTicket] = parseInput(mt).map(item => item.split(','))
    myTicket = myTicket.map(item => parseInt(item, 10))
    let nearbyTickets = parseInput(nt)
        .filter((item, index) => index>0)
        .map(item => item.split(','))
        .filter(ticket => !hasErrors(ticket, rules))

    //console.log(nearbyTickets.length)
    let allTickets = nearbyTickets

    const ruleKeys = Object.keys(rules)
    for (let key of ruleKeys) {
        //console.log(`${key}: ${rules[key].range1Low}-${rules[key].range1High}...${rules[key].range2Low}-${rules[key].range2High}`)
        getFieldsForDescription(rules[key], allTickets)
    }
   
    let fieldPositions = ['x', 'x', 'x', 'x', 'x',
                          'x', 'x', 'x', 'x', 'x',
                          'x', 'x', 'x', 'x', 'x',
                          'x', 'x', 'x', 'x', 'x']
    let allFieldsFound = false
    //console.log(rules)
    while (!allFieldsFound) {
        let found = []
        ruleKeys.forEach(rule => {
            if (rules[rule].indexes.length === 1) {
                console.log(`${rule} is at index ${rules[rule].indexes[0]}`)
                fieldPositions[rules[rule].indexes[0]] = rule
                found.push(rules[rule].indexes[0])
                rules[rule].indexes = []
            }
        })

        ruleKeys.forEach(rule => {
            rules[rule].indexes = rules[rule].indexes.filter(ind => found.indexOf(ind) < 0)
        })
        if (fieldPositions.filter(item => item === 'x').length === 2) {
            allFieldsFound = true
        } 
    }
    //console.log(fieldPositions)
    console.log(myTicket[11] * myTicket[19] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
    // console.log(myTicket[1] * myTicket[11] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
    // console.log(myTicket[3] * myTicket[11] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
    // console.log(myTicket[8] * myTicket[11] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
    // console.log(myTicket[12] * myTicket[11] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
    // console.log(myTicket[17] * myTicket[11] * myTicket[13] * myTicket[16] * myTicket[10] * myTicket[6])
}   

main()

module.exports = {
    normalizeRules
}

// 663363790237 - XXX
// 738461577811 - YYY
// 838591961243 - XXX
// 1264146090829 - XXX
// 1414341665977 - XXX
// 1864928391421