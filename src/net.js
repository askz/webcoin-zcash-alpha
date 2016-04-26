var createStructs = require('bitcoin-protocol').messages.createStructs
var structs = require('./structs.js')

exports.magic = 0x1aaa2201
exports.defaultPort = 18333
exports.protocolVersion = 70002
exports.staticPeers = [
  'alphatestnet.z.cash'
]

exports.messages = createStructs(structs)
