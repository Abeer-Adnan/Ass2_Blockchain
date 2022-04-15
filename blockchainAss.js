const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(from, to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;

    }
}

class Block{
    constructor(timestamp, transaction, previousHas = ''){
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHas = previousHas;
        this.hash = this.calcHash();
        this.nonce = 0;
    }
    calcHash(){
return SHA256(this.index + this.previousHas + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();

    }
    mineingBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calcHash();
        }

        console.log("Mining Block:: \n " + this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.GeneisBlock()];
        this.difficulty = 3;
        this.pendTrans = [];
        this.reward = 150;
    }

    GeneisBlock(){
        return new Block("12/12/2021", "Genesis Block", "0");
    }

    getlatestBlock(){
        return this.chain[this.chain.length - 1];
    }
/*
    addBlock(newBlock){
        newBlock.previousHas = this.getlatestBlock().hash;
        //newBlock.hash = newBlock.calcHash();
        newBlock.mineingBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    */
   minependTrans(mineRewardAdd){
    let block = new Block(Date.now(), this.pendTrans);
    block.mineingBlock(this.difficulty);
    console.log('__Block is mined!');
    this.chain.push(block);

    this.pendTrans = [new Transaction(null, mineRewardAdd, this.reward)];
   }
   createTrans(transaction){
    this.pendTrans.push(transaction);
   }
   getBalanceOfAdd(address){
    let balance = 0;
    for(const block of this.chain){
        for(const trans of block.transaction){
            if(trans.from === address){
                balance -= trans.amount;
            }
            if(trans.to === address){
                balance += trans.amount;
            }
        }

    }
    return balance;
   }
}
let Coin = new Blockchain();
Coin.createTrans(new Transaction('Address 1', 'Adress 2', 300));
Coin.createTrans(new Transaction('Address 2', 'Adress 1', 150));

console.log('\n **Start the miner**');
Coin.minependTrans('Abeer-address');

console.log('\n *The balance of Abeer is:: ', Coin.getBalanceOfAdd('Abeer-address'));



console.log('\n **Start the miner again**');
Coin.minependTrans('Abeer-address');

console.log('\n *The balance of Abeer is:: ', Coin.getBalanceOfAdd('Abeer-address'));

/*
console.log("Mining Block 1 ::");
Coin.addBlock(new Block(1, "10/10/2020", { amount: 3 }));

console.log("Mining Block 2 ::");
Coin.addBlock(new Block(2, "11/11/2018", "BBB" ,{ amount: 8 }));
*/
//console.log(JSON.stringify(Coin, null, 4));