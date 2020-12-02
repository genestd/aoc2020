module.exports = {
    // Takes a string input, splits on newline, returns trimmed array
    parseInput: (input) => {
        if (typeof input !== 'string') {
            throw new Error('Invalid input - must be string')
        }
        return input.split(String.fromCharCode(10)).map(item => item.trim())
    }    
}