const { parseInput } = require('../utils')
const input = require('./input')

const readInstruction = instruction => {
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
    }
}

const main = () => {
    const data = parseInput(input, String.fromCharCode(10))
    let globalAccumulator = 0
    let instructionPointer = 0
    const instructionsExecuted = {}
    let infiniteLoopDetected = false
    while (!infiniteLoopDetected) {
        instructionsExecuted[`${instructionPointer}`] = true
        const [nextAccumulator, nextPointer] = performInstruction(
            data[instructionPointer],
            globalAccumulator,
            instructionPointer
        )
        if (instructionsExecuted[`${nextPointer}`]) {
            break
        }
        globalAccumulator = nextAccumulator
        instructionPointer = nextPointer        
    }
    console.log(`Last globalAccumulator value: ${globalAccumulator}`)
}

main()

module.exports = {
    readInstruction,
    performInstruction
}