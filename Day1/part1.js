const expenses = require('./input.js')
const main = () => {
    expenses.sort((a,b) => a-b)
    let frontIndex = 0
    let backIndex = expenses.length - 1
    let found = false

    while (!found) {
        // failsafe
        if (frontIndex > backIndex) found = true
        const sum = expenses[frontIndex] + expenses[backIndex]
        if (sum === 2020) {
            console.log(`${expenses[frontIndex]} * ${expenses[backIndex]} = ${expenses[frontIndex] * expenses[backIndex]}`)
            found = true
        } else if (sum > 2020) {
            backIndex = backIndex - 1
        } else {
            frontIndex = frontIndex + 1
            backIndex = expenses.length - 1
        }
    }
}

main()