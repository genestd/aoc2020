const input = require('./input')
const { parseInput } = require('../utils')

const FLOOR = '.'
const OCCUPIED = '#'
const EMPTY = 'L'

const countAdjacentOccupiedSeats = (seat, seatingChart) => {
    const [targetRow, targetCol] = seat
    let count = 0
    count = isLineOfSightOccupied(seat, 'N', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'NE', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'E', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'SE', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'S', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'SW', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'W', seatingChart) ? count + 1 : count
    count = isLineOfSightOccupied(seat, 'NW', seatingChart) ? count + 1 : count
    return count
}

const getMutation = direction => {
    switch (direction) {
        case 'N':
            return [0, 1]
        case 'S':
            return [0, -1]
        case 'E':
            return [1, 0]
        case 'W':
            return [-1, 0]
        case 'NE':
            return [1, 1]
        case 'NW':
            return [-1, 1]
        case 'SE':
            return [1, -1]
        case 'SW':
            return [-1, -1]
        default:
            console.log('invalid direction')
    }
}

const isLineOfSightOccupied = ([row, col], direction, seatingChart) => {
    const [rowChange, colChange] = getMutation(direction)
    let seatFound = false
    let lineOfSightOccupied = false
    let [rowToCheck, colToCheck] = [row + rowChange, col + colChange]
    while (!seatFound) {
        if (seatingChart[rowToCheck] === undefined || seatingChart[rowToCheck][colToCheck] === undefined) {
            seatFound = true
        } else {
            if (seatingChart[rowToCheck][colToCheck] !== FLOOR) {
                seatFound = true
                lineOfSightOccupied = seatingChart[rowToCheck][colToCheck] === OCCUPIED
            }
            rowToCheck = rowToCheck + rowChange
            colToCheck = colToCheck + colChange
        }
    }
    return lineOfSightOccupied
}

const countAllOccupiedSeats = seatingChart => {
    return seatingChart.flat().filter(seat => seat === OCCUPIED).length
}

const doRules = seatingChart => {
    // copy seat chart
    const newChart = seatingChart.map(row => { return [...row] })

    for (let row = 0; row < seatingChart.length; row++) {
        for (let col = 0; col < seatingChart[row].length; col++) {
            const status = seatingChart[row][col]
            switch (status) {
                case FLOOR:
                    newChart[row][col] = FLOOR
                    break
                case EMPTY: {
                    if (countAdjacentOccupiedSeats([row, col], seatingChart) === 0) {
                        newChart[row][col] = OCCUPIED
                    } else {
                        newChart[row][col] = status
                    }
                    break
                }
                case OCCUPIED: {
                    if (countAdjacentOccupiedSeats([row, col], seatingChart) >= 5) {
                        newChart[row][col] = EMPTY
                    } else {
                        newChart[row][col] = status
                    }
                }
            }
        }
    }
    return newChart
}

const main = () => {
    let seatingChart = parseInput(input).map(row => row.split('')).reduce((chart, row, index) => {
        chart[index] = row
        return chart
    }, [])
    //console.log(seatingChart)
    let stable = false
    let count = 0
    while (!stable) {
        let nexSeatingChart = doRules(seatingChart)
        if (JSON.stringify(nexSeatingChart) === JSON.stringify(seatingChart)) {
            stable = true
            count = countAllOccupiedSeats(nexSeatingChart)
        } else {
            seatingChart = nexSeatingChart
        }
    }
    console.log(`The count when chairs stabilize is ${count}`)
}

main()

module.exports = {
    countAdjacentOccupiedSeats,
    isLineOfSightOccupied,
    doRules,
    countAllOccupiedSeats,
    getMutation
}