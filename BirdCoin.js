const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, previousHash = '') {
        this.nonce = 0;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.nonce + 
            this.previousHash + 
            this.timestamp
        ).toString();
    }

    mineBlock(difficulty) {
        const goalPrefix = Array(difficulty + 1).join('0');
        while (this.hash.substring(0, difficulty) !== goalPrefix) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.buildGenesisBlock()];
        this.difficulty = 5;
        this.miningReward = 100;
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    buildGenesisBlock() {
        return new Block(new Date().toISOString());
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

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}

let birdcoin = new Blockchain();
console.log("Mining block 1...");
birdcoin.addBlock(new Block(new Date().toISOString()));
console.log();

console.log("Mining block 2...");
birdcoin.addBlock(new Block(new Date().toISOString()));
console.log();

console.log("Mining block 3...");
birdcoin.addBlock(new Block(new Date().toISOString()));
console.log();

console.log("The current BirdCoin chain: ", birdcoin);
console.log();