const parseInput = require('../utils').parseInput
const input = require('./input')

const getNextXCoordinate = (currentX, xMove, rowLength) => {
    let nextPos = currentX + xMove
    if (nextPos > rowLength - 1) {
        nextPos = nextPos % rowLength
    }
    return nextPos
}

const getNextYCoordinate = (currentY, yMove) => {
    return currentY + yMove
}

const checkForTreeAtPosition = (xPos, yPos, data) => {
    const row = data[yPos]
    if (row[xPos] === '#') {
        return true
    }

    return false
}

const checkTreesInSlope = (xMove, yMove, data) => {
    let currentX = 0
    let currentY = 0
    let moreRows = true
    let treeCount = 0

    while (moreRows) {
        currentX = getNextXCoordinate(currentX, xMove, data[currentX].length)
        currentY = getNextYCoordinate(currentY, yMove)
        if (currentY > data.length - 1) {
            moreRows = false
        } else {
            if (checkForTreeAtPosition(currentX, currentY, data)) {
                treeCount = treeCount + 1
            }
        }
    }

    return treeCount

}

const main = () => {
    try {
        const data = parseInput(input)
        const trees1 = checkTreesInSlope(1, 1, data)
        const trees2 = checkTreesInSlope(3, 1, data)
        const trees3 = checkTreesInSlope(5, 1, data)
        const trees4 = checkTreesInSlope(7, 1, data)
        const trees5 = checkTreesInSlope(1, 2, data)
        
    console.log(`Encountered ${trees1 * trees2 * trees3 * trees4 * trees5} trees`)
    } catch (error) {
        console.log(error)
    }
}

main()

module.exports = {
    getNextXCoordinate,
    getNextYCoordinate,
    checkForTreeAtPosition,
    checkTreesInSlope
}