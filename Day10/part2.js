const input = require('./input')
const { parseInput } = require('../utils')

const main = () => {
    const data = parseInput(input).map(item => parseInt(item, 10)).sort((a,b) => a-b)
    
    let combinations = data.reduce((arrayOfDifferences, item) => {
        arrayOfDifferences[item] = 
            (arrayOfDifferences[item - 3] || 0) +
            (arrayOfDifferences[item - 2] || 0) +
            (arrayOfDifferences[item - 1] || 0);
        return arrayOfDifferences;
    }, [1]);

    const answer = combinations.pop()
    console.log(`There are ${answer} combinations`)
}

main()