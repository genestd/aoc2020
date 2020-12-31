const input =  require('./input')
const { parseInput } = require('../utils')

const modularMultiplicativeInverse = (a, modulus) => {
    // Calculate current value of a mod modulus
    const b = BigInt(a % modulus);
      
      // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
      for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
          if ((b * hipothesis) % modulus == 1n) return hipothesis;
      }
        // If we do not find it, we return 1
      return 1n;
  }

  const solveCRT = (remainders, modules) => {
    // Multiply all the modulus
    const prod = modules.reduce((acc, val) => acc * val, 1n);
    
    return modules.reduce((sum, mod, index) => {
        // Find the modular multiplicative inverse and calculate the sum
    // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
        const p = prod / mod;
        return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
    }, 0n) % prod;
}

const findTwoBusInterval = (bus1, bus2, offset, period) => {
    console.log(bus1, bus2, offset)
    let count = 0 
    let found = false
    let val = bus1
    while (!found && count < 20000) {
        if (val > bus1 && val > bus2 && ((val % bus1) === 0 && ((val + offset) % bus2 === 0))) {
            if (val > 800)
            found = true
            console.log({val})
        } 
        if (!found)
            val = val + period
        count = count + 1
    }
    if (!found) {
        console.log(`wrong val = ${val}`)
        return -1
    }
    return val
}

const main = () => {
    const [earliestDeparture, busses] = parseInput(input)
    const busData = 'x,5,x,x,x,x,x,24,x,x,x,x,x,59'.split(',')
        .map(bus => Number.isNaN(parseInt(bus)) ? bus : parseInt(bus, 10))
        .map((bus, index) => bus !== 'x' ? { id: bus, offset: index } : bus)
        .filter(val => val !== 'x')
    

        const departureSpecs = input
        .split(",")
        .reduce(
            (acc, id, i) => (id === "x" ? acc : [...acc, [parseInt(id, 10), i]]),
            []
        );
            console.log(departureSpecs)
        /**
         * Finds the offset at we first see: (base + (inc * x) + spec.offset) % spec.interval === 0
         * Then finds the periodicity for that being seen again
         */
        const getRepetition = ([base, inc], [interval, offset]) => {
        do {
            base += inc;
        } while ((base + offset) % interval !== 0);

        const firstBase = base;

        do {
            base += inc;
        } while ((base + offset) % interval !== 0);

        return [firstBase, base - firstBase];
        };

        const result = departureSpecs.reduce(getRepetition, [0, 1])[0];
        console.log(result)
}

main()

module.exports = {
    findTwoBusInterval
}