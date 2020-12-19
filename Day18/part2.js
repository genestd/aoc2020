const input = require('./input')
const { parseInput } = require('../utils')

const doOperation = (input1, operator, input2) => {
    // console.log(input1, operator, input2)
    switch (operator) {
        case '+':
            return input1 + input2
        case '*':
            return input1 * input2
        default:
            console.log('UNKNOWN OPERATOR', operator)
    }
}

const simplifyParentheses = (expression) => {
    let openIndex = expression.lastIndexOf('(')
    while (openIndex > -1) {
        let closeIndex = expression.indexOf(')', openIndex)
        const simplifiedValue = doMath(expression.substring(openIndex + 1, closeIndex))
        expression = expression.substring(0, openIndex) + simplifiedValue + expression.substring(closeIndex + 1)
        openIndex = expression.lastIndexOf('(')
    }
    return expression
}

const doMath = str => {
    let parts = str.split(' ')
    if (parts.length % 2 !== 1) {
        return console.log('doMath error')
    }
    let result = 0
    let loopCount = 0
    while (parts.length > 1 && loopCount < 20) {
        loopCount++
        let opIndex = parts.indexOf('+')
        if (opIndex > -1) {
            result = doOperation(parseInt(parts[opIndex-1], 10), parts[opIndex], parseInt(parts[opIndex+1], 10))
            parts.splice(opIndex-1, 3, result)
        } else {
            result = doOperation(parseInt(parts[0], 10), parts[1], parseInt(parts[2],10))
            parts.splice(0, 3, result)
        }
    }
    return parts[0]
}

const main = () => {
    const data = parseInput(input)
    let total = 0
    data.forEach(equation => {
        total = total + doMath(simplifyParentheses(equation))
    })
    console.log({ total })
}

main()

module.exports = {
    doOperation,
    doMath,
    simplifyParentheses
}