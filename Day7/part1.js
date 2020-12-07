const { parseInput } = require('../utils')
const input = require('./input')

const buildBagHeirarchy = data => {
    let heirarchy = data.reduce((result, item) => {
        const [bag, ...contents] = item
        const contentsObject = contents[0].split(',').reduce((obj, val) => {
            const [count, ...colorData] = val.trim().split(' ')
            if (count === 'no') {
                return obj
            }
            const color = colorData.join(' ')
            obj[color] = parseInt(count, 10)
            return obj
        }, {})
        // console.log(bag, contentsObject)
        result[bag] = contentsObject
        return result
    }, {})

    return heirarchy
}

const canHoldColor = (color, bag, allBags) => {
    // {
    //     'dull violet': {
    //         'posh orange': 1,
    //         'muted plum': 2,
    //         'mirrored bronze': 2,
    //         'dull chartreuse': 2
    //     }
    // }
    const innerBags = Object.keys(bag)
    for (let newbag of innerBags) {
        if (newbag === color) {
            return true
        }
        if (allBags[newbag]) {
            if(canHoldColor(color, allBags[newbag], allBags)) {
                return true
            }
        }
    }
    return false
}

const normalizeBagData = record => {
    return record.replace(/ bags/g, '')
        .replace(/ bag/g, '')
        .replace(/\./g, '')
        .split('contain')
        .map(item => item.trim())
}

const main = () => {
    const data = parseInput(input).map(normalizeBagData)
    const allBags = buildBagHeirarchy(data)
    //console.log({bagHeirarchy})
    let containerCount = []
    Object.keys(allBags).forEach(bag => {
        if (canHoldColor('shiny gold', allBags[bag], allBags)) {
            containerCount.push(bag)
        }
    })
    console.log(`There are ${containerCount.length} bags that can hold Shiny Gold`)
}

main()

module.exports = {
    buildBagHeirarchy,
    canHoldColor,
    normalizeBagData
}