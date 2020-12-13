const { parseInput } = require("../utils")
const { normalize, move } = require("./part2")

describe('Day 12 part 2 tests', () => {
    let data
    let shipPosition
    let waypointPosition
    beforeEach(() => {
        shipPosition = { x: 0, y: 0}
        waypointPosition = { x: 10, y: 1 }
        const input =`F10
N3
F7
R90
F11`
        data = parseInput(input).map(normalize)
    })
    it('performs moves', () => {
        const [newWaypointPosition, newShipPosition] = move(waypointPosition, shipPosition, data[0])
        expect(newShipPosition).toEqual({ x:100, y: 10 })
        expect(newWaypointPosition).toEqual({ x: 10, y: 1 })
        const [newWaypointPosition1, newShipPosition1] = move(newWaypointPosition, newShipPosition, data[1])
        expect(newWaypointPosition1).toEqual({ x:10, y: 4 })
        const [newWaypointPosition2, newShipPosition2] = move(newWaypointPosition1, newShipPosition1, data[2])
        expect(newShipPosition2).toEqual({ x:170, y: 38 })
        expect(newWaypointPosition2).toEqual({ x:10, y: 4 })
        const [newWaypointPosition3, newShipPosition3] = move(newWaypointPosition2, newShipPosition2, data[3])
        expect(newWaypointPosition3).toEqual({ x:4, y: -10 })
        const [newWaypointPosition4, newShipPosition4] = move(newWaypointPosition3, newShipPosition3, data[4])
        expect(newShipPosition4).toEqual({ x:214, y: -72 })
        const [newWaypointPosition5, newShipPosition5] = move(newWaypointPosition4, newShipPosition4, ['L', 90])
        expect(newWaypointPosition5).toEqual({ x: 10, y: 4, })
        const [nwp6, nsp6] = move(newWaypointPosition5, newShipPosition5, ['R', 180])
        expect(nwp6).toEqual({ x: -10, y: -4, })
        const [nwp7, nsp7] = move(nwp6, nsp6, ['R', 270])
        expect(nwp7).toEqual({ x: 4, y: -10, })
        const [nwp8, nsp8] = move(nwp7, nsp7, ['L', 270])
        expect(nwp8).toEqual({ x: -10, y: -4, })
        const [nwp9, nsp9] = move(nwp8, nsp8, ['L', 180])
        expect(nwp9).toEqual({ x: 10, y: 4, })
        const [nwp10, nsp10] = move(nwp9, nsp9, ['L', 90])
        expect(nwp10).toEqual({ x: -4, y: 10, })
        const [nwp11, nsp11] = move(nwp10, nsp10, ['L', 90])
        expect(nwp11).toEqual({ x: -10, y: -4, })
        const [nwp12, nsp12] = move(nwp11, nsp11, ['L', 90])
        expect(nwp12).toEqual({ x: 4, y: -10, })
        const [nwp13, nsp13] = move(nwp12, nsp12, ['L', 90])
        expect(nwp13).toEqual({ x: 10, y: 4, })
        const [nwp14, nsp14] = move(nwp13, nsp13, ['R', 90])
        expect(nwp14).toEqual({ x: 4, y: -10, })
        const [nwp15, nsp15] = move(nwp14, nsp14, ['R', 90])
        expect(nwp15).toEqual({ x: -10, y: -4, })
        const [nwp16, nsp16] = move(nwp15, nsp15, ['R', 90])
        expect(nwp16).toEqual({ x: -4, y: 10, })
        const [nwp17, nsp17] = move(nwp16, nsp16, ['R', 90])
        expect(nwp17).toEqual({ x: 10, y:4, })
        const [nwp18, nsp18] = move(nwp17, nsp16, ['R', 270])
        expect(nwp18).toEqual({ x: -4, y:10, })
        const [nwp19, nsp19] = move(nwp18, nsp16, ['R', 270])
        expect(nwp19).toEqual({ x: -10, y:-4, })
        const [nwp20, nsp20] = move(nwp19, nsp16, ['R', 270])
        expect(nwp20).toEqual({ x: 4, y:-10, })
        const [nwp21, nsp21] = move(nwp20, nsp16, ['R', 270])
        expect(nwp21).toEqual({ x: 10, y:4, })
        const [nwp22, nsp22] = move(nwp21, nsp16, ['L', 270])
        expect(nwp22).toEqual({ x: 4, y:-10, })
        const [nwp23, nsp23] = move(nwp22, nsp16, ['L', 270])
        expect(nwp23).toEqual({ x: -10, y: -4, })
        const [nwp24, nsp24] = move(nwp23, nsp16, ['L', 270])
        expect(nwp24).toEqual({ x: -4, y:10, })
        const [nwp25, nsp25] = move(nwp24, nsp16, ['L', 270])
        expect(nwp25).toEqual({ x: 10, y:4, })

    })
})