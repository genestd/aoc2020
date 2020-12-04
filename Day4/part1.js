const parseInput = require('../utils').parseInput
const input = require('./input')

const normalize = (str) => {
    return str.split(String.fromCharCode(10)).join(' ')
}

const validatePassport = (passportTokens) => {
    if (Object.keys(passportTokens).length === 8) {
        return true
    }
    if (Object.keys(passportTokens).length === 7) {
        if (!passportTokens.hasOwnProperty('cid')) {
            return true
        }
    }
    return false
}

const tokenizePassport = (passport) => {
    return passport.split(' ')
        .map(token => {
            token = token.trim()
            return token.split(':')
        })
        .reduce((result, value) => {
            result[value[0]] = value[1]
            return result
        }, {})
}

const main = () => {
    const splitter = `${String.fromCharCode(10)}${String.fromCharCode(10)}`
    const data = parseInput(input, splitter).map(normalize)
    
    let validPassports = 0
    data.forEach(passport => {
       const passportData = tokenizePassport(passport)
       if (validatePassport(passportData)) {
           validPassports = validPassports + 1
       }
    })
    console.log(`There are ${validPassports} valid passports`)
}

main()

module.exports = {
    normalize,
    validatePassport,
    tokenizePassport
}