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

const main = () => {
    try {
        const data = parseInput(input)
        const xMove = 3
        const yMove = 1
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
        
    console.log(`Encountered ${treeCount} trees`)
    } catch (error) {
        console.log(error)
    }
}

main()

module.exports = {
    getNextXCoordinate,
    getNextYCoordinate,
    checkForTreeAtPosition
}