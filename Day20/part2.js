const input = require('./input')
const { parseInput } = require('../utils')

class Tile {
    constructor(id, data) {
        this.id = id
        this.size = data.length
        this.data = data
        this.locked = false
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

        this.data = newData
    }

    getRight() {
        let value = ''
        for (let i=0; i<this.size; i++) {
            value = value + this.data[i][this.size-1]
        }
        return value
    }
    getLeft() {
        let value = ''
        for (let i=0; i<this.size; i++) {
            value = value + this.data[i][0]
        }
        return value
    }
    getTop() {
        return this.data[0]
    }
    getBottom() {
        return this.data[this.size-1]
    }

    removeBorders = () => {
        let nextData = []
        for (let i=1; i<this.size-1; i++) {
            nextData[i-1] = this.data[i].substring(1, this.data[i].length - 1)
        }
        this.data = nextData
        this.size = nextData.length
    }

    getRowData = rowNum => {
        return this.data[rowNum]
    }

}

// const findSeaMonster = (image) => {
//     /* There be monsters:
//       >                  # <
//       >#    ##    ##    ###<
//       >#  #  #  #  #  #    <
//     */
//     const seaMonsterCount = 15 // number of # in the sea dragon
//     const seaMonster = new RegExp('..................#(.)+\n(.)*#....##....##....###(.)+\n(.)*.#..#..#..#..#..#...', 'g');
//     const finds = new Set()
//     let attempt = seaMonster.exec(image)
//     while(attempt) {
//       finds.add(attempt.index)
//       seaMonster.lastIndex = attempt.index + 1
//       attempt = seaMonster.exec(image)
//     }
   
//     if(finds.size > 0) {
//       console.log(finds.size, 'sea monsters found!')
//       console.log(image.match(/#/g).length - (seaMonsterCount * finds.size), 'roughness')
//       return true
//     }
//     return false
//   }

const checkSide = (sourceId, pattern, allTiles, sideToCheck) => {

    const tileList = Object.keys(allTiles) 
    for (let tileId of tileList) {
        if (sourceId !== tileId) {
            let rotation = 0
            const tile = allTiles[tileId]
            while (!tile.locked && rotation < 8) {
                const candidate = sideToCheck === 'left' ? tile.getLeft() : tile.getBottom()
                if (candidate === pattern) {
                    //console.log(`Tile ${sourceId} rotation ${sourceRotation} matches ${tile.id} rotation ${rotation}`)
                    tile.locked = true
                    return tile.id
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
    const LENGTH = 12
    const tiles = generateData(input)
    const tileList = Object.keys(tiles)
    // const masterTileList = { '0,0': '2971'}
    // tiles[2971].flip('vertical')
    // tiles[2971].locked = true

    const masterTileList = { '0,0': '3343'}
    tiles[3343].rotate()
    tiles[3343].rotate()
    tiles[3343].locked = true

    for (let y=0; y<LENGTH; y++) {
        for (let x=0; x<LENGTH; x++) {
            const key=`${x},${y}`
            const right = x<LENGTH-1 ? `${x+1},${y}` : null
            const top = y<LENGTH-1 ? `${x},${y+1}` : null
            //console.log({key, right, top})
            try {
                if (right && !masterTileList[right]) {
                    const stringToMatch = tiles[masterTileList[key]].getRight()
                    const nextTile = checkSide(masterTileList[key], stringToMatch, tiles, 'left')
                    if (nextTile !== -1) {
                        masterTileList[right] = nextTile
                    }
                }
                if (top && !masterTileList[top]) {
                    const stringToMatch = tiles[masterTileList[key]].getTop()
                    const nextTile = checkSide(masterTileList[key], stringToMatch, tiles, 'bottom')
                    if (nextTile !== -1) {
                        masterTileList[top] = nextTile
                    }
                }
            } catch (err) {

            }
        }
    }
    
    // remove the borders
    for (let y=0; y<LENGTH; y++) {
        for (let x=0; x<LENGTH; x++) {
            const key=`${x},${y}`
            //console.log({ key, tile: masterTileList[key]})
            tiles[masterTileList[key]].removeBorders()
        }
    }

    //build master image
    let masterImage = ['Tile Master:']
    for (let y=0; y<LENGTH; y++) {
        for (let row = 0; row < 8; row++) {
            let masterRow = ''
            for (let x=0; x<LENGTH; x++) {
                // row1
                const key=`${x},${y}`
                const data = tiles[masterTileList[key]].getRowData(7 - row)
                masterRow = masterRow.concat(data)
            }
            masterImage.push(masterRow)
        }
    }
    masterImage = masterImage.join('\n')
    const master = generateData(masterImage)

    // looking for 2409 roughness

main()

module.exports = {
    generateData,
    main
}