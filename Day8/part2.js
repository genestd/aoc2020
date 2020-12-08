const { parseInput } = require('../utils')
const input = require('./input')

const readInstruction = instruction => {
    if (!instruction) {
        return { type: null, value: null }
    }
    let [type, value] = instruction.split(' ').map(item => item.trim())
    value = value.replace('+', '')
    return { type, value: parseInt(value, 10) }
}

const performInstruction = (instruction, globalAccumulator, instructionPointer) => {
    const operation = readInstruction(instruction)
    switch (operation.type) {
        case 'nop':
            return [globalAccumulator, instructionPointer + 1]
        case 'acc':
            return [globalAccumulator + operation.value, instructionPointer + 1]
        case 'jmp':
            return [globalAccumulator, instructionPointer + operation.value]
        default: 
            console.log('Invalid operation')
            return [null, null]
    }
}

const checkForInfiniteLoop = program => {
    let accumulator = 0
    let pointer = 0
    const instructionsExecuted = {}
    let infiniteLoopDetected = false
    let allInstructionsExecuted = false
    while (!infiniteLoopDetected && !allInstructionsExecuted) {
        instructionsExecuted[`${pointer}`] = true
        const [nextAccumulator, nextPointer] = performInstruction(
            program[pointer],
            accumulator,
            pointer
        )
        if (nextPointer >= program.length) {
            allInstructionsExecuted = true
        } else if (instructionsExecuted[`${nextPointer}`]) {
            infiniteLoopDetected = true
        } else {
            accumulator = nextAccumulator
            pointer = nextPointer
        }
    }
    //console.log({ infiniteLoopDetected, allInstructionsExecuted})
    return [infiniteLoopDetected, accumulator]

}

const main = () => {
    const data = parseInput(input, String.fromCharCode(10))

    data.forEach((record, index) => {
        const newData = [...data]
        const instruction = readInstruction(record)
        if (instruction.type === 'jmp') {
            newData[index] = record.replace('jmp', 'nop')
            const [infiniteLoop, acc] = checkForInfiniteLoop(newData)
            if (!infiniteLoop) {
                console.log(`Found it! ${acc}`)
            }
        } else if (instruction.type === 'nop') {
            newData[index] = record.replace('nop', 'jmp')
            const [infiniteLoop, acc] = checkForInfiniteLoop(newData)
            if (!infiniteLoop) {
                console.log(`Found it! ${acc}`)
            }
        }
    })
}

main()

module.exports = {
    readInstruction,
    performInstruction,
    checkForInfiniteLoop
}