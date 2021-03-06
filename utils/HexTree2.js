class HexTree {
    constructor() {
        this.data = { 
            '0|0': {
                color: 'white'
            },
        }
    }

    move(node, direction) {
        const [nodeX, nodeY] = node.split('|').map(node => parseInt(node, 10))
        let nextNode
        switch (direction) {
            case 'e':
                nextNode = `${nodeX + 1}|${nodeY}`
                break
            case 'w':
                nextNode = `${nodeX - 1}|${nodeY}`
                break
            case 'ne':
                nextNode = `${(Math.abs(nodeY) % 2) ? nodeX + 1 : nodeX}|${nodeY + 1}`
                break
            case 'nw':
                nextNode = `${(Math.abs(nodeY) % 2) === 0 ? nodeX - 1 : nodeX}|${nodeY + 1}`
                break
            case 'se':
                nextNode = `${(Math.abs(nodeY) % 2) ? nodeX + 1 : nodeX}|${nodeY - 1}`
                break
            case 'sw':
                nextNode = `${(Math.abs(nodeY) % 2) === 0 ? nodeX - 1: nodeX}|${nodeY - 1}`
                break
            default:
                console.log('UNKNOWN DIRECTION')
        }
        if (!this.data[nextNode]) {
            this.data[nextNode] =  { color: 'white' }
        }
        this.data[node][direction] = nextNode
        return nextNode
    }

    flip(node) {
        this.data[node].color = this.data[node].color === 'white' ? 'black' : 'white'
    }

    // add() {
    //     const id = this.nextId
    //     this.nextId = this.nextId + 1
    //     this.data[id] = {
    //         color: 'white',
    //         e: null,
    //         w: null,
    //         ne: null,
    //         se: null,
    //         nw: null,
    //         sw: null,
    //     }
    //     return id
    // }
    // hasAllNeighbors(node) {
    //     return this.data[node].e !== null &&
    //         this.data[node].w !== null &&
    //         this.data[node].nw !== null &&
    //         this.data[node].sw !== null &&
    //         this.data[node].ne !== null &&
    //         this.data[node].se !== null 
    // }

    // addMissingNeighbors(node) {
    //     if (this.data[node].ne === null) {
    //         this.data[node].ne = this.add()
    //     }
    //     if (this.data[node].e === null) {
    //         this.data[node].e = this.add()
    //     }
    //     if (this.data[node].se === null) {
    //         this.data[node].se = this.add()
    //     }
    //     if (this.data[node].sw === null) {
    //         this.data[node].sw = this.add()
    //     }
    //     if (this.data[node].w === null) {
    //         this.data[node].w = this.add()
    //     }
    //     if (this.data[node].nw === null) {
    //         this.data[node].nw = this.add()
    //     }
    // }

    // updateNeighbors(target) {        
    //     // east node
    //     this.data[this.data[target].e].nw = this.data[target].ne
    //     this.data[this.data[target].e].w = target
    //     this.data[this.data[target].e].sw = this.data[target].se
        
    //     // southeast node
    //     this.data[this.data[target].se].nw = target
    //     this.data[this.data[target].se].ne = this.data[target].e
    //     this.data[this.data[target].se].w = this.data[target].sw
        
    //     // southwest node
    //     this.data[this.data[target].sw].e = this.data[target].se
    //     this.data[this.data[target].sw].ne = target
    //     this.data[this.data[target].sw].nw = this.data[target].w
        
    //     // west node
    //     this.data[this.data[target].w].se = this.data[target].sw
    //     this.data[this.data[target].w].e = target
    //     this.data[this.data[target].w].ne = this.data[target].nw
        
    //     // northwest node
    //     this.data[this.data[target].nw].sw = this.data[target].w
    //     this.data[this.data[target].nw].se = target
    //     this.data[this.data[target].nw].e = this.data[target].ne
        
    //     // northeast node
    //     this.data[this.data[target].ne].w = this.data[target].nw
    //     this.data[this.data[target].ne].sw = target
    //     this.data[this.data[target].ne].se = this.data[target].e  
    // }

    // getNeighbors(node) {
    //     if (this.data[node].ne === null) {
    //         if (this.data[node].nw !== null) {
    //             this.data[node].ne = this.data[this.data[node].nw].e
    //         } else if (this.data[node].e !== null) {
    //             this.data[node].ne = this.data[this.data[node].e].nw
    //         }
    //     }
    //     if (this.data[node].e === null) {
    //         if (this.data[node].ne !== null) {
    //             this.data[node].e = this.data[this.data[node].ne].se
    //         } else if (this.data[node].se !== null) {
    //             this.data[node].e = this.data[this.data[node].se].ne
    //         }
    //     }
    //     if (this.data[node].se === null) {
    //         if (this.data[node].e !== null) {
    //             this.data[node].se = this.data[this.data[node].e].sw
    //         } else if (this.data[node].sw !== null) {
    //             this.data[node].se = this.data[this.data[node].sw].e
    //         }
    //     }
    //     if (this.data[node].sw === null) {
    //         if (this.data[node].se !== null) {
    //             this.data[node].sw = this.data[this.data[node].se].w
    //         } else if (this.data[node].w !== null) {
    //             this.data[node].sw = this.data[this.data[node].w].se
    //         }
    //     }
    //     if (this.data[node].w === null) {
    //         if (this.data[node].nw !== null) {
    //             this.data[node].w = this.data[this.data[node].nw].sw
    //         } else if (this.data[node].sw !== null) {
    //             this.data[node].w = this.data[this.data[node].sw].ne
    //         }
    //     }
    //     if (this.data[node].nw === null) {
    //         if (this.data[node].ne !== null) {
    //             this.data[node].nw = this.data[this.data[node].ne].w
    //         } else if (this.data[node].w !== null) {
    //             this.data[node].nw = this.data[this.data[node].w].ne
    //         }
    //     }

    // }
}

module.exports = {
    HexTree
} 