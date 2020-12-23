const md5 = require('md5')
const input = require('./input')
const { parseInput } = require('../utils')

const play = (p1card, p2card) => {
    if (p1card > p2card) {
        //console.log('Player 1 wins')
        return [[p1card, p2card], []]
    }
    //console.log('Player 2 wins')
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

const saveCardConfiguration = (deck1, deck2, cache) => {
    const key = md5(deck1.join('-').concat(deck2.join(':')))
    if (cache[key]) {
        return true
    }
    cache[key] = true
    return false
}

const main = () => {
    const [p1, p2] = parseInput(input, `${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    let p1cards = parseInput(p1).filter((card, index) => index > 0).map(card => parseInt(card, 10))
    let p2cards = parseInput(p2).filter((card, index) => index > 0).map(card => parseInt(card, 10))
    
    const playGame = (p1deck, p2deck) => {
        let cardCache = {}
        let duplicate = false
        let winner = ''
        while (p1deck.length > 0 && p2deck.length > 0) {
            //console.log(`Player 1's deck: ${p1cards.join()}`)
            //console.log(`Player 2's deck: ${p2cards.join()}`)
            //console.log(`Player 1's deck: ${p1deck.join(',')}`)
            //console.log(`Player 2's deck: ${p2deck.join(',')}`)
            duplicate = saveCardConfiguration(p1deck, p2deck, cardCache)
            const nextP1Card = p1deck.shift()
            const nextP2Card = p2deck.shift()
            if (duplicate) {
                //console.log('duplicate!')
                return [[], []]
            }

            //console.log(`Player 1's card: ${nextP1Card}...Player 2's card: ${nextP2Card}`)
            let result
            if (p1deck.length >= nextP1Card && p2deck.length >= nextP2Card) {
                //console.log('Playing sub game')
                const subgameResult = playGame(p1deck.slice(0, nextP1Card), p2deck.slice(0, nextP2Card))
                //
                if (subgameResult[1].length > 0) {
                    result = [[], [nextP2Card, nextP1Card]]
                } else {
                    result = [[nextP1Card, nextP2Card], []]
                }
            } else {
                result = play(nextP1Card, nextP2Card)
            }
            p1deck = p1deck.concat(result[0])
            p2deck = p2deck.concat(result[1])
        }

        return [p1deck, p2deck]
    }
    const results = playGame(p1cards, p2cards)
    const winningDeck = results[1].length > 0 ? results[1] : results[0]
    console.log(winningDeck)
    console.log(score(winningDeck))
}

main()

module.exports = {

}