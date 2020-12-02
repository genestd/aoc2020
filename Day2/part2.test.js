const { test, expect, it } = require('@jest/globals')

const parseInput = require('./part2').parseInput
const checkPassword = require('./part2').checkPassword

const sample =`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`