const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.currentHash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block('0','1/1/2022',{amount: 4}, '0')
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().currentHash;
        newBlock.currentHash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    isChainValid(){
        for (let i =1; i < this.chain.length - 1; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]

            if (currentBlock.currentHash !== currentBlock.calculateHash()){
                return false
            }
            if (currentBlock.previousHash !== previousBlock.currentHash){
                return false
            }
            return true
        }
    }
}

let noirCoin = new Blockchain();
noirCoin.addBlock(new Block(1,'3/1/2022', {amount:10}))
noirCoin.addBlock(new Block(2,'4/1/2022', {amount:15}))
// noirCoin.chain[1].data = { amount: 20} // false
// noirCoin.chain[1].currentHash = noirCoin.chain[2].previousHash // true
console.log(noirCoin.isChainValid());
console.log(JSON.stringify(noirCoin, null, 4));