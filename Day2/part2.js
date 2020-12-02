const input = require('./input')

// Takes a string input, splits on newline, returns trimmed array
const parseInput = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Invalid input - must be string')
    }
    return input.split(String.fromCharCode(10)).map(item => item.trim())
}

const validatePassword = (password, letter, pos1, pos2) => {
    const check1 = password.trim().charAt(pos1 - 1)
    const check2 = password.trim().charAt(pos2 - 1)
    if (check1 === letter.trim() && check2 === letter.trim()) {
        return false
    }
    if (check1 === letter.trim() || check2 === letter.trim() ) {
        return true
    }

    return false
}

// takes a string containing policy and password, parses it
// validates password against policy
const checkPassword = (entry) => {
    const [policy, password] = entry.split(':')
    const [positions, letter] = policy.split(' ')
    const [pos1, pos2] = positions.split('-')

    //console.log({entry, password})
    return validatePassword(password, letter, pos1, pos2)
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