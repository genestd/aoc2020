const input = require('./input')

// Takes a string input, splits on newline, returns trimmed array
const parseInput = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Invalid input - must be string')
    }
    return input.split(String.fromCharCode(10)).map(item => item.trim())
}

const validatePassword = (password, letter, min, max) => {
    const re = new RegExp(letter.trim(), "g");
    const result = password.trim().match(re) || []
    return result.length >= min && result.length <= max
}

// takes a string containing policy and password, parses it
// validates password against policy
const checkPassword = (entry) => {
    const [policy, password] = entry.split(':')
    const [minMax, letter] = policy.split(' ')
    const [min, max] = minMax.split('-')

    //console.log({entry, password})
    return validatePassword(password, letter, min, max)
}

const main = () => {
    try {
        const data = parseInput(input)
        console.log(data.filter(checkPassword).length)
    } catch (error) {
        console.log(error)
    }
}

main()

module.exports = {
    parseInput,
    checkPassword,
    validatePassword
}