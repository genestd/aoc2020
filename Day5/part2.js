const { parseInput } = require('../utils')
const input = require ('./input')

const getRow = rowData => {
    // console.log(rowData)
    let binaryRow = rowData.substring(0, 7)
    binaryRow = binaryRow.replace(/B/g, '1')
    binaryRow = binaryRow.replace(/F/g, '0')
    // console.log(binaryRow)
    return parseInt(binaryRow, 2)
}

const getSeat = seatData => {
    //console.log(seatData)
    let binarySeat = seatData.substring(7)
    binarySeat = binarySeat.replace(/R/g, '1')
    binarySeat = binarySeat.replace(/L/g, '0')
    // console.log(binarySeat)
    return parseInt(binarySeat, 2)
}

const getSeatNumber = (row, column) => {
    //console.log(row, column)
    return (row * 8) + column
}

const main = () => {
    const data = parseInput(input)

    const seats = data.map(record => {
        const row = getRow(record)
        const column = getSeat(record)
        const seatNumber = getSeatNumber(row, column)
        return seatNumber
    }).sort((a, b) => a-b)
    
    let mySeat = -1
    for (let i = 1; i < seats.length; i++) {
        if (seats[i] - seats[i-1] === 2) {
            console.log(`my seat is ${(seats[i-1] + seats[i])/2}`)
        }
    }
}

main()

module.exports = {
    getRow,
    getSeat,
    getSeatNumber
}
