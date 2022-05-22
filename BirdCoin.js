const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.nonce = 0;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    buildGenesisBlock() {
        return new Block(new Date().toISOString(), [], 0);
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

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    logWallet(walletName) {
        console.log(
            'Balance of ' + walletName + ' is',
            birdcoin.getBalanceOfAddress(walletName)
        );
    }

    minePendingTransactions(minerRewardAddress) {
        let block = new Block(
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, minerRewardAddress, this.miningReward)
        ];
    }
}

const birdcoin = new Blockchain();

birdcoin.createTransaction(new Transaction('Wallet01', 'Wallet02', 60));
birdcoin.createTransaction(new Transaction('Wallet02', 'Wallet01', 20));

console.log("Running the miner...");
birdcoin.minePendingTransactions('MinerAddress');
console.log();

console.log("Running the miner...");
birdcoin.minePendingTransactions('MinerAddress');
console.log();

birdcoin.logWallet('Wallet01');
console.log();

birdcoin.logWallet('Wallet02');
console.log();

birdcoin.logWallet('MinerAddress');
console.log();
