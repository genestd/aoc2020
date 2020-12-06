const parseInput = require('../utils').parseInput
const input = require('./input')

const normalize = (str) => {
    return str.split(String.fromCharCode(10)).join(' ')
}

const validateBirthYear = (year=0) => {
    if (Number.isNaN(parseInt(year, 10))) {
        return false
    }
    if (year < 1920 || year > 2002) {
        return false
    }
    return true
}
const validateIssueYear = (year=0) => {
    if (Number.isNaN(parseInt(year, 10))) {
        return false
    }
    if (year < 2010 || year > 2020) {
        return false
    }
    return true
}
const validateExpirationYear = (year=0) => {
    if (Number.isNaN(parseInt(year, 10))) {
        return false
    }
    if (year < 2020 || year > 2030) {
        return false
    }
    return true
}

const validateHeight = (input='') => {
    const units = input.substring(input.length - 2)
    const value = input.substring(0, input.length - 2)
    if (!['cm', 'in'].includes(units)) {
        return false
    }
    if (Number.isNaN(parseInt(value, 10))) {
        return false
    }
    if (units === 'cm') {
        if (value >= 150 && value <=193) {
            return true
        }
    }
    if (units == 'in') {
        if (value >= 59 && value <= 76) {
            return true
        }
    }
    return false
}

const validateHairColor = (color='') => {
    if (color[0] !== '#') {
        return false
    }
    const value = color.substr(1, color.length - 1)
    if (value.match(/^[0-9,a-f]{1,6}$/)) {
        return true
    }
    return false
}

const validateEyeColor = (color='') => {
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    return validColors.includes(color)
}

const validatePassportId = (id='') => {
    if (typeof id !== 'string' || id.length !== 9) {
        return false
    }
    return !!id.match(/^[0-9]{1,9}$/)
}

const validatePassport = (passportTokens) => {
    const keys = Object.keys(passportTokens)
    if (keys.length >= 7) {
        if (validateBirthYear(passportTokens.byr) &&
        validateIssueYear(passportTokens.iyr) &&
        validateExpirationYear(passportTokens.eyr) &&
        validateHeight(passportTokens.hgt) &&
        validateHairColor(passportTokens.hcl) &&
        validateEyeColor(passportTokens.ecl) &&
        validatePassportId(passportTokens.pid)) {
            return true
        }
        return false
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
    tokenizePassport,
    validateBirthYear,
    validateIssueYear,
    validateExpirationYear,
    validateHeight,
    validateHairColor,
    validateEyeColor,
    validatePassportId
}