var seeds = require('bitcoin-net').seeds

var magic = 0x1799120c
var defaultPort = 18333
var protocolVersion = 70002

var getSeeds = function (opts) {
  return [
    seeds.fixed('alphatestnet.z.cash', { defaultPort })
  ]
}

module.exports = {
  magic,
  defaultPort,
  protocolVersion,
  getSeeds
}
