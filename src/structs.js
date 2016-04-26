var proto = require('bitcoin-protocol')
var struct = proto.struct
var types = proto.types
var varint = proto.varint

var NUM_POUR_INPUTS = 2
var NUM_POUR_OUTPUTS = 2

exports.header = struct([
  { name: 'version', type: struct.Int32LE },
  { name: 'prevHash', type: types.buffer32 },
  { name: 'merkleRoot', type: types.buffer32 },
  { name: 'timestamp', type: struct.UInt32LE },
  { name: 'bits', type: struct.UInt32LE },
  { name: 'nonce', type: types.buffer32 },
  { name: 'solution', type: struct.VarArray(varint, struct.UInt32LE) }
])

exports.transaction = (() => {
  var baseStruct = struct([
    { name: 'version', type: struct.Int32LE },
    { name: 'ins', type: struct.VarArray(varint, struct([
      { name: 'hash', type: types.buffer32 },
      { name: 'index', type: struct.UInt32LE },
      { name: 'script', type: types.varBuffer },
      { name: 'sequence', type: struct.UInt32LE }
    ])) },
    { name: 'outs', type: struct.VarArray(varint, struct([
      { name: 'valueBuffer', type: types.buffer8 },
      { name: 'script', type: types.varBuffer }
    ])) },
    { name: 'locktime', type: struct.UInt32LE }
  ])

  var pourStruct = struct.VarArray(varint, struct([
    { name: 'pubOld', type: types.buffer8 },
    { name: 'pubNew', type: types.buffer8 },
    { name: 'scriptPubKey', type: types.varBuffer },
    { name: 'scriptSig', type: types.varBuffer },
    { name: 'anchor', type: types.buffer8 },
    { name: 'serials', type: struct.Array(NUM_POUR_INPUTS, types.buffer8) },
    { name: 'commitments', type: struct.Array(NUM_POUR_OUTPUTS, types.buffer8) },
    { name: 'ciphertexts', type: struct.Array(NUM_POUR_OUTPUTS, struct.VarBuffer(varint)) },
    { name: 'macs', type: struct.Array(NUM_POUR_INPUTS, types.buffer8) },
    { name: 'proof', type: struct.VarBuffer(varint) }
  ]))

  function encode (value, buffer, offset) {
    if (!buffer) buffer = new Buffer(encodingLength(value))
    if (!offset) offset = 0
    baseStruct.encode(value, buffer, offset)
    encode.bytes = baseStruct.encode.bytes
    if (value.version >= 2) {
      pourStruct.encode(value.pour, buffer, offset + encode.bytes)
      encode.bytes += pourStruct.encode.bytes
    }
    return buffer
  }

  function decode (buffer, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buffer.length
    var value = baseStruct.decode(buffer, offset, end)
    decode.bytes = baseStruct.decode.bytes
    if (value.version >= 2) {
      value.pour = pourStruct.decode(buffer, buffer + decode.bytes, end)
      decode.bytes += pourStruct.decode.bytes
    }
    return value
  }

  function encodingLength (value) {
    var pourLength = value.version >= 2 ? pourStruct.encodingLength(value.pour) : 0
    return baseStruct.encodingLength(value) + pourLength
  }

  return { encode, decode, encodingLength }
})()
