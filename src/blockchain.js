// blockchain definition

var testnet = require('webcoin-bitcoin-testnet').blockchain
var u = require('bitcoin-util')

var genesisHeader = {
  version: 1,
  prevHash: u.nullHash,
  merkleRoot: u.toHash('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'),
  timestamp: 1296688602,
  bits: 0x207fffff,
  nonce: 2
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
