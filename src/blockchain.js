// blockchain definition

var testnet = require('webcoin-bitcoin-testnet').blockchain
var u = require('bitcoin-util')

var genesisHeader = {
  version: 1,
  prevHash: u.nullHash,
  merkleRoot: u.toHash('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'),
  timestamp: 1296688602,
  bits: 0x207fffff,
  nonce: new Buffer('0000000000000000000000000000000000000000000000000000000000000000', 'hex'),
  solution: [ 2461, 50717, 47695, 123428, 26341, 33143, 72062, 77602, 3698, 124246, 70379, 103049, 15704, 26158, 85636, 130587, 3279, 10889, 9205, 26873, 28311, 31643, 30534, 121007, 3517, 25943, 36612, 45442, 9578, 67150, 61295, 82248 ]
}

function calculateTarget (block, chain, cb) {
  if (block.height === 2016) {
    // we just hardcode the first new difficulty since zcash modifies the
    // timestamp for the genesis block
    return cb(null, u.expandTarget(0x1e09debb))
  }
  testnet.calculateTarget.call(this, block, chain, cb)
}

module.exports = Object.assign({}, testnet, {
  genesisHeader,
  checkpoints: null,
  calculateTarget
})
