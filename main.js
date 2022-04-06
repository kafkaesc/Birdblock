const SHA256 = require('crypto-js/sha256');

class BirdBlock {
    constructor(species, index, timestamp, previousHash = '') {
        let bird = null;
        if (species === 'bluebird')
            bird = { call: 'Tweet!', species: 'Bluebird' };
        else if (species === 'crow')
            bird = { call: 'Caw caw', species: 'Crow' };
        else if (species === 'duck')
            bird = { call: 'Quack quack', species: ' Duck' };
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
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.data.call +
            this.data.species + 
            this.index + 
            this.previousHash + 
            this.timestamp
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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

    generateGenesisBlock() {
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
birdblock.addBlock(new BirdBlock('raven', 1, new Date().toISOString()));
birdblock.addBlock(new BirdBlock('crow', 2, new Date().toISOString()));

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