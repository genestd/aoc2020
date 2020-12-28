const input = '418976235'
const { default: LinkedList } = require('../utils/LinkedList')

const move = (list, currentCup) => {
    const nextThree = getNextThreeCups(list, currentCup)
    const dest = getDestinationCup(list, currentCup - 1)
    list.insert(dest, nextThree)
    return list.get(currentCup).next
}

const getDestinationCup = (list, target) => {
    let found = false
    let dest = null
    while (!found) {
        dest = list.get(target)
        if (!dest) {
            target = target - 1
            if (target < 1) target = 1000000
        } else {
            found = true
        }
    }
    return dest.value
}

const getNextThreeCups = (list, current) => {
    const first = list.get(current).next
    const second = list.get(first).next
    const third = list.get(second).next
    list.delete(first)
    list.delete(second)
    list.delete(third)
    return [first, second, third]
}

const main = () => {
    let cups = input.split('').map(cup => parseInt(cup, 10))
    let myList = new LinkedList()
    // cups.forEach((cup, index) => {
    //     myList.add(cup, cups[index-1])
    // })
    let target = null
    for (let i = 0; i<1000000; i++) {
        if (i < cups.length) {
            myList.add(cups[i], target)
            target = cups[i]
        } else {
            myList.add(i+1, target)
            target = i+1
        }
    }
    console.log(myList.get(4))
    
    let count = 0
    let currentCup = cups[0]
    while (count < 10000000) {
        currentCup = move(myList, currentCup)
        count++
    }
    const one = myList.get(1)
    const first = one.next
    const second = myList.get(one.next).next
    console.log(first, second)
}

main()

module.exports = {
    getDestinationCup,
    getNextThreeCups
}