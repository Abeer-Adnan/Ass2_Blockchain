const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHas = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHas = previousHas;
        this.hash = '';
    }
    calcHash(){
return SHA256(this.index + this.previousHas + this.timestamp + JSON.stringify(this.data)).toString();

    }
}
class Blockchain{
    constructor(){
        this.chain = [this.GeneisBlock()];
    }

    GeneisBlock(){
        return new Block(0, "12/12/2021", "Genesis Block", "0");
    }

    getlatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHas = this.getlatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }
}
let Coin = new Blockchain();
Coin.addBlock(new Block(1, "10/10/2020", { amount: 3 }));
Coin.addBlock(new Block(2, "11/11/2018", "BBB" ,{ amount: 8 }));
console.log(JSON.stringify(Coin, null, 4));