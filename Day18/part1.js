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
            console.log('UNKNOWN OPERATOR')
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
    const parts = str.split(' ')
    if (parts.length % 2 !== 1) {
        return console.log('doMath error')
    }
    let result = parseInt(parts[0],10)
    for (let i=1; i<parts.length; i=i+2) {
        result = doOperation(result, parts[i], parseInt(parts[i+1], 10))
    }
    return result
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