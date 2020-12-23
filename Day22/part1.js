const input = require('./input')
const { parseInput } = require('../utils')

const play = (p1card, p2card) => {
    console.log(`Player 1's card: ${p1card}...Player 2's card: ${p2card}`)
    if (p1card > p2card) {
        console.log('Player 1 wins')
        return [[p1card, p2card], []]
    }
    console.log('Player 2 wins')
    return [[], [p2card, p1card]]
}

const score = deck => {
    let score = 0
    let counter = 1
    while (deck.length > 0) {
        let card = deck.pop()
        score = score + (card * counter)
        counter = counter + 1
    }
    return score
}

const main = () => {
    const [p1, p2] = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    let p1cards = parseInput(p1).filter((card, index) => index > 0).map(card => parseInt(card, 10))
    let p2cards = parseInput(p2).filter((card, index) => index > 0).map(card => parseInt(card, 10))

    let rounds = 0
    while (p1cards.length > 0 && p2cards.length > 0) {
        rounds++
        console.log(`Player 1's deck: ${p1cards.join()}`)
        console.log(`Player 2's deck: ${p2cards.join()}`)
        const result = play(p1cards.shift(), p2cards.shift())
        p1cards = p1cards.concat(result[0])
        p2cards = p2cards.concat(result[1])
    }
    const winningDeck = p1cards.length > 0 ? p1cards : p2cards
    console.log(`it took ${rounds} rounds to win`)
    console.log(score(winningDeck))
}

main()

module.exports = {

}