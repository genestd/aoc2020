const { validatePassport } = require('./part1')

const normalize = require('./part1').normalize
const tokenizePassport = require('./part1').tokenizePassport

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

it('validates a passport', () => {
    const tokens1 = tokenizePassport('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm')
    const tokens2 = tokenizePassport('iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929')
    const tokens3 = tokenizePassport('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm')
    const tokens4 = tokenizePassport('hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in')

    const result1 = validatePassport(tokens1)
    const result2 = validatePassport(tokens2)
    const result3 = validatePassport(tokens3)
    const result4 = validatePassport(tokens4)

    expect(result1).toBe(true)
    expect(result2).toBe(false)
    expect(result3).toBe(true)
    expect(result4).toBe(false)
})