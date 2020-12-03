const { test, expect, it } = require('@jest/globals')

const parseInput = require('../utils').parseInput
const checkPassword = require('./part1').checkPassword

it('should throw an error when input is not array', () => {
       expect(() => parseInput([])).toThrowError()
})

it('should return an array', () => {
    let result
    try {
        result = parseInput(`3-5 f: fgfff
        6-20 n: qlzsnnnndwnlhwnxhvjn
        6-7 j: jjjjjwrj
        8-10 g: gggggggggg`)
    } catch (error) {
        result = ''
    }
    expect(Array.isArray(result)).toBe(true)
})

it('should return true if password is valid', () => {
    result = checkPassword('1-3 a: asdfsd')
    expect(result).toBe(true)
})
