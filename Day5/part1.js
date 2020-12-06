const { parseInput } = require('../utils')
const input = require ('./input')

const getRow = rowData => {
    // console.log(rowData)
    let binaryRow = rowData.replace(/B/g, '1')
    binaryRow = binaryRow.replace(/F/g, '0')
    // console.log(binaryRow)
    return parseInt(binaryRow, 2)
}

const getSeat = seatData => {
    //console.log(seatData)
    let binarySeat = seatData.replace(/R/g, '1')
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
    let highestSeatId = 0
    data.forEach(record => {
        const rowData = record.substring(0, 7)
        const seatData = record.substring(7)
        const row = getRow(rowData)
        const column = getSeat(seatData)
        const seatNumber = getSeatNumber(row, column)
        if (seatNumber > highestSeatId) {
            highestSeatId = seatNumber
        }
    })
    console.log(`the highest seat is ${highestSeatId}`)
}

main()

module.exports = {
    getRow,
    getSeat,
    getSeatNumber
}
