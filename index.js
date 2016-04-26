var extend = require('webcoin-bitcoin-testnet')

module.exports = extend({
  blockchain: require('./lib/blockchain.js'),
  net: require('./lib/net.js'),
  structs: require('./lib/structs.js')
})
