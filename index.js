const Nobject = require('nobject')
const hexNobject = new Nobject

hexNobject.set(['hex', 'uint8Array'], (hex) => {
  const array = []
  for (let i = 0; i < hex.length; i += 2) {
    const hexPart = hex.substr(i,2)
    const uint8 = parseInt(hexPart, 16)
    array.push(uint8)
  }
  return new Uint8Array(array)
})

hexNobject.set(['uint8Array', 'hex'], (uint8Array) => {
  return Array.from(uint8Array).map((uint8) => {

    const hexPart = uint8.toString(16)

    if (uint8 === 0) {
      return '00'
    } else if (uint8 < 16) {
      return '0'+hexPart
    } else {
      return hexPart
    }

  }).join('')
})

hexNobject.set(['hex', 'hex.prefixed'], (hex) => {
  return '0x'+hex
})

hexNobject.set(['hex.prefixed', 'hex'], (prefixedHex) => {
  return prefixedHex.substr(2)
})


module.exports = {
  pluginVersion: 1,
  converters: hexNobject
}
