const input = require('./input')
const { parseInput } = require('../utils')

const normalize = record => {
    [ingredients, allergens] = record.split('(contains ')
    return [ingredients, allergens.split(', ').map(a => a.replace(')', ''))]
}

checkForAllergen = (recordsToCheck, masterList, log=false) => {
    // list of words from the first record that has this allergen
    const wordList = masterList[recordsToCheck[0]][0].split(' ')
    // turn the indexes of the records that have this allergen into the ingredent lists
    const labels = recordsToCheck.map(record => masterList[record][0])
    const wordsThatMightBeAllergen = []
    for (let word of wordList) {
        if (log===true && word === 'ccrbr') console.log('here')
        if (word.length > 0 && labels.every(label => label.includes(`${word} `))) {
            wordsThatMightBeAllergen.push(word)
        }
    }
    return wordsThatMightBeAllergen
}
const main = () => {
    const masterList = parseInput(input).map(normalize)
    const allergenKey = masterList.reduce((ak, [ingredientList, allergens], index) => {
        allergens.map(a => {
            if (!ak[a]) {
                ak[a] = {
                    recipes: []
                }
            }
            ak[a].recipes.push(index)
        })
        return ak
    }, {})
    // determine which foreign words might match this allergen
    Object.keys(allergenKey).forEach(key => {
        const candidates = checkForAllergen(allergenKey[key].recipes, masterList, key === 'peanuts')
        allergenKey[key].candidates = candidates
    })

    let knownAllergens = {}
    
    let allFound = false
    let count = 0
    while (!allFound && count < 100) {
        count++
        // find first allergen
        let found1 = 0
        for (let key of Object.keys(allergenKey)) {
            if (allergenKey[key].candidates.length === 1) {
                console.log(`Found ${key}: ${allergenKey[key].candidates[0]}`)
                found1 ++
                knownAllergens[allergenKey[key].candidates[0]] = key
                allergenKey[key].candidates = []
            }
        }
        if (found1 === 0) {
            // remove common terms
            let commonTerms = {}
            for (let key of Object.keys(allergenKey)) {
                allergenKey[key].candidates.forEach(cand => {
                    if (!commonTerms[cand]) {
                        commonTerms[cand] = 1
                    } else {
                        commonTerms[cand] = commonTerms[cand] + 1
                    }
                })
            }
            let common = Object.keys(commonTerms).filter(key => commonTerms[key] > 1)
            knownAllergens[common] = 'unknown'
            for (let key of Object.keys(allergenKey)) {
                allergenKey[key].candidates = allergenKey[key].candidates.filter(cand => cand !== common[0])
            }
        }
        const knownKeys = Object.keys(knownAllergens)
        for (let key of Object.keys(allergenKey)) {
            allergenKey[key].candidates = allergenKey[key].candidates.filter(cand => knownKeys.indexOf(cand) === -1 )
        }
        allFound = Object.keys(allergenKey).filter(key => allergenKey[key].candidates.length > 0).length === 0
    }
    console.log(knownAllergens)
    const allergenWords = Object.keys(knownAllergens)
    
    
    let safeWords = []
    masterList.forEach(([ingredients]) => {
        safeWords = safeWords.concat(ingredients.split(' ').filter(word => !allergenWords.some(aw => aw === word)))
    })
    
    console.log(safeWords.filter(word => word !== '').length)

    let finalAnswer = Object.keys(knownAllergens).sort((a, b) => knownAllergens[a].localeCompare(knownAllergens[b]))
    console.log(finalAnswer.join(','))
}

main()

module.exports = {

}