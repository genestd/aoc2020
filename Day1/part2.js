const expenses = require('./input.js')

const checkThirdNumber = (sum, arr) => {
    let foundIndex = -1

    for (let i=0; i<arr.length; i++) {
        if (sum + arr[i] > 2020) {
            i = arr.length
        } else if (sum + arr[i] === 2020) {
            foundIndex = i
            i = arr.length
        }
    }
    return foundIndex
}

const main = () => {
    {
        expenses.sort((a,b) => a-b)
        let firstIndex = 0
        let secondIndex = 1
        let found = false
    
        while (!found) {
            // failsafe
            if (firstIndex > expenses.length - 2) found = true

            const sum = expenses[firstIndex] + expenses[secondIndex]
            if (sum > 2020) {
                firstIndex = firstIndex + 1
                secondIndex = firstIndex + 1
            } else if (sum < 2020) {
                const thirdIndex = checkThirdNumber(sum, expenses)
                if (thirdIndex > -1) {
                    console.log(`${expenses[thirdIndex]} * ${expenses[firstIndex]} * ${expenses[secondIndex]} = ${expenses[firstIndex] * expenses[secondIndex] * expenses[thirdIndex]}`)
                    found = true
                } else {
                    secondIndex = secondIndex + 1
                }
            }
        }
    }
}

main()