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

const getInnerBagCount = (color, allBags) => {
    let count = 0
    const bag = allBags[color]
    const contents = Object.keys(bag)
    contents.forEach(item => {
        count = count + bag[item]
        count = count + (bag[item] * getInnerBagCount(item, allBags))
    })
    return count
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
    
    const bagCount = getInnerBagCount('shiny gold', allBags)
    console.log(`My bag contains ${bagCount} bags`)
}

main()

module.exports = {
    buildBagHeirarchy,
    canHoldColor,
    normalizeBagData,
    getInnerBagCount
}