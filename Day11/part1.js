const input = require('./input')
const { parseInput } = require('../utils')

const FLOOR = '.'
const OCCUPIED = '#'
const EMPTY = 'L'

const countAdjacentOccupiedSeats = (seat, seatingChart) => {
    const [targetRow, targetCol] = seat
    let count = 0
    count = isSeatOccupied([targetRow - 1, targetCol - 1], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow - 1, targetCol], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow - 1, targetCol + 1], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow, targetCol - 1], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow , targetCol + 1], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow + 1, targetCol - 1], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow + 1, targetCol], seatingChart) ? count + 1 : count
    count = isSeatOccupied([targetRow + 1, targetCol + 1], seatingChart) ? count + 1 : count
    return count
}

const isSeatOccupied = ([row, col], seatingChart) => {
    if (!seatingChart[row]) {
        return false
    }
    return seatingChart[row][col] === OCCUPIED
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
                    if (countAdjacentOccupiedSeats([row, col], seatingChart) >= 4) {
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
    isSeatOccupied,
    doRules,
    countAllOccupiedSeats
}