module.exports = {
    // Takes a string input, splits on newline, returns trimmed array
    parseInput: (input, splitter) => {
        if (!splitter) {
            splitter = String.fromCharCode(10)
        }
        if (typeof input !== 'string') {
            throw new Error('Invalid input - must be string')
        }
        return input.split(splitter).map(item => item.trim())
    }    
}