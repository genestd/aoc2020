const input = require('./input')
const { parseInput } = require('../utils')

const normalize = ([direction, ...amount]) => ([direction, parseInt(amount.join(''), 10)])

const move = (waypointPosition, shipPosition, [direction, amount]) => {
    switch (direction) {
        case 'N': 
            waypointPosition.y = waypointPosition.y + amount
            break
        case 'S':
            waypointPosition.y = waypointPosition.y - amount
            break
        case 'E':
            waypointPosition.x = waypointPosition.x + amount
            break
        case 'W':
            waypointPosition.x = waypointPosition.x - amount
            break
        case 'L':
            const oldWaypointXL = waypointPosition.x
            switch (amount) {
                case 90: 
                    waypointPosition.x = -waypointPosition.y
                    waypointPosition.y = oldWaypointXL
                    break;
                case 180:
                    waypointPosition.x = -waypointPosition.x
                    waypointPosition.y = -waypointPosition.y
                    break;
                case 270:
                    waypointPosition.x = waypointPosition.y
                    waypointPosition.y = -oldWaypointXL
                    break;
            }
            break
        case 'R':
            const oldWaypointXR = waypointPosition.x
            switch (amount) {
                case 90: 
                    waypointPosition.x = waypointPosition.y
                    waypointPosition.y = -oldWaypointXR
                    break;
                case 180:
                    waypointPosition.x = -waypointPosition.x
                    waypointPosition.y = -waypointPosition.y
                    break;
                case 270:
                    waypointPosition.x = -waypointPosition.y
                    waypointPosition.y = oldWaypointXR
                    break;
            }
            break
        case 'F':
            for (let i=0; i<amount; i++) {
                shipPosition.x = shipPosition.x + waypointPosition.x
                shipPosition.y = shipPosition.y + waypointPosition.y
            }
            break
        default: 
            console.log('invalid direction')
    }
    return [waypointPosition, shipPosition]
}
const main = () => {
    const data = parseInput(input).map(normalize)
    let shipPosition = {
        x: 0,
        y: 0    }
    let waypointPosition = {
        x: 10,
        y: 1
    }
    data.forEach(record => {
        const [newWPPosition, newShipPosition] = move(waypointPosition, shipPosition, record)
        shipPosition = newShipPosition
        waypointPosition = newWPPosition
    })
    console.log(`Manhattan position is |${shipPosition.x}| + |${shipPosition.y}| = ${Math.abs(shipPosition.x) + Math.abs(shipPosition.y)}`)
}

main()

module.exports = {
    normalize,
    move
}