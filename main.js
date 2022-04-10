const SHA256 = require('crypto-js/sha256');

class BirdBlock {
    constructor(species, index, timestamp, previousHash = '') {
        let bird = null;
        if (species === 'bluebird')
            bird = { call: 'Tweet!', species: 'Bluebird' };
        else if (species === 'crow')
            bird = { call: 'Caw caw', species: 'Crow' };
        else if (species === 'duck')
            bird = { call: 'Quack quack', species: 'Duck' };
        else if (species === 'goose')
            bird = { call: 'Honk honk', species: 'Goose' };
        else if (species === 'impostor')
            bird = { call: 'Moo', species: 'Impostor' };
        else if (species === 'mockingbird')
            bird = { call: 'Ya call this a block?', species: 'Mockingbird' };
        else if (species === 'owl')
            bird = { call: 'Hoot hoot', species: 'Owl' };
        else if (species === 'raven')
            bird = { call: 'Nevermore', species: 'Raven' };
        else if (species === 'roadrunner')
            bird = { call: 'Beep beep', species: 'Roadrunner' };
        else if (species === 'turkey')
            bird = { call: 'Gobble gobble', species: 'Turkey'};
        else
            bird = { call: '...', species: '...' };

        this.data = bird;
        this.index = index;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.data.call +
            this.data.species + 
            this.index + 
            this.nonce +
            this.previousHash + 
            this.timestamp
        ).toString();
    }

    hatchBlock(difficulty) {
        const goalPrefix = Array(difficulty + 1).join('0');
        while (this.hash.substring(0, difficulty) !== goalPrefix) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block hatched: ' + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.hatchGenesisBlock()];
        this.difficulty = 5;
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hatchBlock(this.difficulty)
        this.chain.push(newBlock);
    }

    checkChainValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (previousBlock?.hash !== previousBlock.calculateHash())
                return false;
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
        }

        return true;
    }

    hatchGenesisBlock() {
        return !this.chain
            ? new BirdBlock(
                null,
                0,
                new Date().toISOString(),
                '0')
            : null;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}

let birdblock = new Blockchain();

console.log('Hatching block 1...')
birdblock.addBlock(new BirdBlock('raven', 1, new Date().toISOString()));
console.log();

console.log("Hatching block 2...")
birdblock.addBlock(new BirdBlock('crow', 2, new Date().toISOString()));
console.log();

console.log('Original blockchain with a raven and crow added.')
console.log('Is the blockchain valid?: ', birdblock.checkChainValidity());
console.log();

birdblock.chain[1].data.species = 'goose';
console.log('Going goose mode on a previous block.');
console.log('Is the blockchain valid?: ', birdblock.checkChainValidity());
console.log();

birdblock.chain[1].hash = birdblock.chain[1].calculateHash();
console.log('Splicing a new hash onto a middle block.');
console.log('Is the blockchain valid?: ', birdblock.checkChainValidity());
console.log();
