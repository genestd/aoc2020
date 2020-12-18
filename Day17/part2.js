const input = require('./input')
const { parseInput } = require('../utils')
const ACTIVE = '#'
const INACTIVE = '.'

const countAdjacentActiveCubes = ([plane, row, col, time], dimension) => {
    let adjacentCount = 0
    for (let testPlane = plane - 1; testPlane <= plane + 1; testPlane++) {
        for (let testRow = row - 1; testRow <= row + 1; testRow++) {
            for (let testCol = col - 1; testCol <= col + 1; testCol++) {
                for (let testTime = time - 1; testTime <= time + 1; testTime++) {
                    if (testTime === time && testPlane === plane && testRow === row && testCol === col) {
                        continue
                    }
                    const key = `${testPlane}|${testRow}|${testCol}|${testTime}`
                    if (dimension[key] === ACTIVE) {
                        adjacentCount = adjacentCount + 1
                    }
                }
            }
        }
    }
    return adjacentCount
}

const getNextState = (currentState, adjacentCount) => {
    if (currentState === ACTIVE) {
        if (adjacentCount === 2 || adjacentCount === 3) {
            return ACTIVE
        }
        return INACTIVE
    }
    if (adjacentCount === 3) {
        return ACTIVE
    }
    return INACTIVE
}

const cycle = dimension => {
    let newDimension = {
        lowTime: dimension.lowTime - 1,
        highTime: dimension.highTime + 1,
        lowPlane: dimension.lowPlane - 1,
        highPlane: dimension.highPlane + 1,
        lowRow: dimension.lowRow - 1,
        highRow: dimension.highRow + 1,
        lowCol: dimension.lowCol - 1,
        highCol: dimension.highCol + 1
    }
    for (let plane = dimension.lowPlane - 1; plane <= dimension.highPlane + 1; plane++) {
        for (let row = dimension.lowRow - 1; row <= dimension.highRow + 1; row++) {
            for (let col = dimension.lowCol - 1; col <= dimension.highCol + 1; col++) {
                for (let time = dimension.lowTime - 1; time <= dimension.highTime + 1; time++) {
                    const adjacentCount = countAdjacentActiveCubes([plane, row, col, time], dimension)
                    const key = `${plane}|${row}|${col}|${time}`
                    newDimension[key] = getNextState(dimension[key], adjacentCount)
                }
            }
        }
    }
    return newDimension
}

const countActiveCubes = dimensions => {
    return (Object.values(dimensions).filter(val => val === ACTIVE).length)
}

const main = () => {
    const data = parseInput(input).map(row => row.split(''))
    let dimension = {
        lowPlane: 0,
        highPlane: 0,
        lowRow: 0,
        highRow: data.length - 1,
        lowCol: 0,
        highCol: data[0].length - 1,
        lowTime: 0,
        highTime: 0
    }
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            const key = `0|${row}|${col}|0`
            dimension[key] = data[row][col]
        }
    }
    
    for (let i=0; i<6; i++) {
        dimension = cycle(dimension)
    }
    const count = countActiveCubes(dimension)
    console.log(`There are ${count} active cubes`)
}

main()

module.exports = {
    countAdjacentActiveCubes,
    cycle,
    countActiveCubes
}