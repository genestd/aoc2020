const input = require('./input')
const { parseInput } = require('../utils')

class Tile {
    constructor(id, data) {
        this.id = id
        this.orientation = 0
        this.size = data.length
        this.data = data
        this.matches = new Set()
    }
    show() {
        for (let i=0; i<this.size; i++) {
            console.log(this.data[i])
        }
    }

    flip(direction='horizontal') {
        const newData = []
        if (direction === 'horizontal') {
            for (let i=0; i<this.size; i++) {
                for (let j=0; j<this.size; j++) {
                    if (!newData[i]) {
                        newData[i] = ''
                    }
                    newData[i] = newData[i].concat(this.data[i][this.size-1-j])
                }
            }
        } else if (direction === 'vertical') {
            for (let i=0; i<this.size; i++) {
                for (let j=0; j<this.size; j++) {
                    if (!newData[i]) {
                        newData[i] = ''
                    }
                    newData[i] = newData[i].concat(this.data[this.size-1-i][j])
                }
            }
            this.orientation = (this.orientation + 2) % 4
        }
        this.data = newData
    }

    rotate(direction='clockwise') {
        const newData = []
        if (direction === 'clockwise') {
            for (let i=0; i<this.size; i++) {
                for (let j=0; j<this.size; j++) {
                    if (!newData[i]) {
                        newData[i] = ''
                    }
                    newData[i] = newData[i].concat(this.data[this.size-1-j][i])
                }
            }
        }
        this.orientation = (this.orientation + 1) % 4
        this.data = newData
    }
}

const checkSide = (sourceId, pattern, allTiles, sourceRotation) => {
    const tileList = Object.keys(allTiles) 
    for (let tileId of tileList) {
        if (sourceId !== tileId) {
            let rotation = 0
            const tile = allTiles[tileId]
            while (rotation < 8) {
                if (tile.data[0] === pattern) {
                    //console.log(`Tile ${sourceId} rotation ${sourceRotation} matches ${tile.id} rotation ${rotation}`)
                    return {id: tile.id}
                }
                if (rotation !== 3) {
                    tile.rotate()
                } else {
                    tile.flip()
                }
                rotation++
            }
        }
    }
    return -1
}

const generateData = input => {
    const tiles = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`).map(rec => parseInput(rec))
    return tiles.reduce((obj, tile) => {
        const id = tile.shift().split(' ')[1].replace(':', '')
        obj[id] = new Tile(id, tile)
        return obj
    }, {})
}
const main = () => {
    const tiles = generateData(input)
    const tileList = Object.keys(tiles)
    for (let tileId of tileList) {
        let rotation = 0
        let tile = tiles[tileId]
        while (rotation < 8) {
            const match = checkSide(tile.id, tile.data[0], tiles, rotation)
            if (match !== -1) {
                if (tileId === '3343') console.log({rotation, id: match.id})
                tile.matches.add(match.id)
            }
            if (rotation !== 3) {
                tile.rotate()
            } else {
                tile.flip()
            }
            rotation++
        }
        if (tile.matches.size === 2) {
            console.log(`tile ${tile.id} is a corner`)
        }
    }
}

main()

module.exports = {
    generateData
}