const input = require('./input')
const { parseInput } = require('../utils')
const { HexTree } = require('../utils/HexTree')

const normalize = record => {
    const directions = []
    for (let i = 0; i< record.length; i++) {
        if (record[i] === 'e' || record[i] === 'w') {
            directions.push(record[i])
        } else {
            directions.push(`${record[i]}${record[i+1]}`)
            i++
        }
    }
    return directions
}
const main = () => {
    const data = parseInput(input).map(normalize)
    const tree = new HexTree()
    data.forEach(directionList => {
        let nextNode = '0|0'
        directionList.forEach(dir => {
            nextNode = tree.move(nextNode, dir)
            //console.log(dir, nextNode)
            // if (nextNode === 27 || nextNode === 4 || nextNode === 5) {
            //     console.log(tree.data[nextNode], tree.data[4], tree.data[5])
            // }
        })
        tree.flip(nextNode)
        //console.log(nextNode)
    })
    let black = Object.keys(tree.data).filter(key => tree.data[key] === 'black').length
    for (let i=0; i<100;i++) {
        tree.processTiles()
    }
    black = Object.keys(tree.data).filter(key => tree.data[key] === 'black').length
    console.log(`Ending: ${black} black tiles`)
    //console.log(tree.data)
}

main()

module.exports = {
    normalize
}