const { validatePassport } = require('./part2')
const { validateBirthYear, validateIssueYear, validateExpirationYear,
    validateHeight, 
    validateHairColor,
    validateEyeColor,
    validatePassportId} = require('./part2')
const normalize = require('./part2').normalize
const tokenizePassport = require('./part2').tokenizePassport
const { parseInput } = require('../utils')

it('returns a string with no newlines', () => {
    const result = normalize('')
    expect(typeof result).toBe('string')

    const result2 = normalize(`test
    test`)
    expect(result2.indexOf(String.fromCharCode(10))).toBe(-1)

    const result3 = normalize(`test test`)
    expect(result3.indexOf(String.fromCharCode(10))).toBe(-1)
})

it('tokenizes a passport', () => {
    const result = tokenizePassport('ecl:grn cid:315 iyr:2012 hgt:192cm eyr:2023 pid:873355140 byr:1925 hcl:#cb2c03')
    expect(result).toEqual({
        byr: '1925',
        cid: '315',
        ecl: 'grn',
        eyr: '2023',
        hcl: '#cb2c03',
        hgt: '192cm',
        iyr: '2012',
        pid: '873355140'
    })
})

it('validateBirthYear returns boolean', () => {
    const result = validateBirthYear(2000)
    expect(typeof result).toBe('boolean')
})
it('takes a numeric input', () => {
    const result = validateBirthYear('x')
    expect(result).toBe(false)
    const result1 = validateBirthYear(1973)
    expect(result1).toBe(true)
})
it('must be between 1920 and 2002', () => {
    const result1 = validateBirthYear(1919)
    const result2 = validateBirthYear(1920)
    const result3 = validateBirthYear(2002)
    const result4 = validateBirthYear(2003)
    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('validateIssueYear returns boolean', () => {
    const result = validateIssueYear(2000)
    expect(typeof result).toBe('boolean')
})
it('takes a numeric input', () => {
    const result = validateIssueYear('x')
    expect(result).toBe(false)
    const result1 = validateIssueYear(2015)
    expect(result1).toBe(true)
})
it('must be between 2010 and 2020', () => {
    const result1 = validateIssueYear(2009)
    const result2 = validateIssueYear(2010)
    const result3 = validateIssueYear(2020)
    const result4 = validateIssueYear(2021)
    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('validateExpirationYear returns boolean', () => {
    const result = validateExpirationYear(2000)
    expect(typeof result).toBe('boolean')
})
it('takes a numeric input', () => {
    const result = validateExpirationYear('x')
    expect(result).toBe(false)
    const result1 = validateExpirationYear(2020)
    expect(result1).toBe(true)
})
it('must be between 2020 and 2030', () => {
    const result1 = validateExpirationYear(2019)
    const result2 = validateExpirationYear(2020)
    const result3 = validateExpirationYear(2030)
    const result4 = validateExpirationYear(2031)
    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('must be expressed in inches or cm', () => {
    const result1 = validateHeight('150cm')
    const result2 = validateHeight('59in')
    const result3 = validateHeight('150cn')
    const result4 = validateHeight('59im')

    expect(result1).toBe(true)
    expect(result2).toBe(true)
    expect(result3).toBe(false)
    expect(result4).toBe(false)
})

it('must have cm between 150 and 193', () => {
    const result1 = validateHeight('149cm')
    const result2 = validateHeight('150cm')
    const result3 = validateHeight('193cm')
    const result4 = validateHeight('194cm')

    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('must have in between 59 and 76', () => {
    const result1 = validateHeight('58in')
    const result2 = validateHeight('59in')
    const result3 = validateHeight('76in')
    const result4 = validateHeight('77in')

    expect(result1).toBe(false)
    expect(result2).toBe(true)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('must start with #', () => {
    const result = validateHairColor('xxxxxx')
    expect(result).toBe(false)
})
it('must contain 6 numbers/letters', () => {
    const result = validateHairColor('#aaa123')
    expect(result).toBe(true)
    const result1 = validateHairColor('#aag123')
    expect(result1).toBe(false)
})
it ('must be a valid eye color', () => {
    const result = validateEyeColor('x')
    expect(result).toBe(false)
    const result1 = validateEyeColor('oth')
    expect(result1).toBe(true)
})

it ('must be a nine-digit number', () => {
    const result1 = validatePassportId('123456789')
    const result2 = validatePassportId('1234567890')
    const result3 = validatePassportId('023456789')
    const result4 = validatePassportId('12345678a')

    expect(result1).toBe(true)
    expect(result2).toBe(false)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})

it('should validate these bad passports', () => {
    const badInput = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`
    const data = parseInput(badInput, `${String.fromCharCode(10)}${String.fromCharCode(10)}`).map(normalize)
    let validCount = 0
    data.forEach(rec => {
        const tokens = tokenizePassport(rec)
        console.log(tokens)
        if (validatePassport(tokens)) {
            validCount++
        }
    })
    expect(validCount).toBe(0)
})
it('should validate these good passports', () => {
    const goodInput = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`
    const data = parseInput(goodInput, `${String.fromCharCode(10)}${String.fromCharCode(10)}`).map(normalize)
    let validCount2 = 0
    data.forEach(rec => {
        const tokens = tokenizePassport(rec)
        //console.log(tokens)
        if (validatePassport(tokens)) {
            validCount2++
        }
    })
    expect(validCount2).toBe(4)
})