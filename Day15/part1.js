const input = require('./input')

const main = () => {
    const data = input.split(',').map(item => parseInt(item, 10))
    
    let spokenNumbers = []
    let lastSpoken
    let tracker = {}
    let turn = 0

    const saveToTracker = (num, turn) => {
        if (!tracker[`${num}`]) {
            tracker[`${num}`] = {
                count: 1,
                turn
            }
        } else {
            tracker[`${num}`] = {
                count: tracker[`${num}`].count + 1,
                prevTurn: tracker[`${num}`].turn,
                turn
            }
           // console.log(tracker)
        }
    }

    // First time through (no repeats)
    data.forEach(num => {
        turn = turn + 1
        spokenNumbers.push(num)
        lastSpoken = num
        saveToTracker(num, turn)
    })
    while (spokenNumbers.length < 30000000) {
        turn = turn + 1
        if (tracker[`${lastSpoken}`].count === 1) {
            lastSpoken = 0
        } else {
            //console.log(`The number ${lastSpoken} has been spoken before, most recently at ${tracker[lastSpoken].turn}`)
            lastSpoken = (turn - 1) - tracker[`${lastSpoken}`].prevTurn
        }
        //console.log({ turn, lastSpoken})
        spokenNumbers.push(lastSpoken)
        saveToTracker(lastSpoken, turn)
    }
    console.log(spokenNumbers.pop())
}

main()

module.exports = {

}