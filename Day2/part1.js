const input = require('./input')
const parseInput = require('../utils').parseInput

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