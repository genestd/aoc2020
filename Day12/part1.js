const input = require('./input')
const { parseInput } = require('../utils')

const normalize = ([direction, ...amount]) => ([direction, parseInt(amount.join(''), 10)])

const move = (position, [direction, amount]) => {
    switch (direction) {
        case 'N': 
            position.y = position.y + amount
            break
        case 'S':
            position.y = position.y - amount
            break
        case 'E':
            position.x = position.x + amount
            break
        case 'W':
            position.x = position.x - amount
            break
        case 'L':
            position.facing = (position.facing - amount) < 0 ? (position.facing - amount + 360) : (position.facing - amount)
            break;
        case 'R':
            position.facing = (position.facing + amount) >= 360 ? (position.facing + amount) % 360 : (position.facing + amount)
            break;
        case 'F':
            switch (position.facing) {
                case 0:
                    position.y = position.y + amount
                    break
                case 90:
                    position.x = position.x + amount
                    break
                case 180:
                    position.y = position.y - amount
                    break
                case 270:
                    position.x = position.x - amount
                    break
                default:
                    console.log('invalid facing value', position.facing)
                    break
            }
            break
        default: 
            console.log('invalid direction')
    }
    return position
}
const main = () => {
    const data = parseInput(input).map(normalize)
    let position = {
        x: 0,
        y: 0,
        facing: 90
    }
    data.forEach(record => {
        position = move(position, record)
    })
    console.log(`Manhattan position is |${position.x}| + |${position.y}| = ${Math.abs(position.x) + Math.abs(position.y)}`)
}

main()

module.exports = {
    normalize,
    move
}