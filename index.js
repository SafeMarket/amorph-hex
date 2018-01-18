const AmorphConverter = require('amorph-converter')

const unprefixed = new AmorphConverter((uint8Array) => {
  return Array.from(uint8Array).map((int) => {
    const hexPart = int.toString(16)
    if (int === 0) {
      return '00'
    } else if (int < 16) {
      return '0'+hexPart
    } else {
      return hexPart
    }
  }).join('')
}, (hex) => {
  const array = []
  for (let i = 0; i < hex.length; i += 2) {
    const hexPart = hex.substr(i,2)
    const int = parseInt(hexPart, 16)
    array.push(int)
  }
  return new Uint8Array(array)
})

const prefixed = new AmorphConverter((uint8Array) => {
  return '0x' + unprefixed.to(uint8Array)
}, (hex) => {
  return unprefixed.from(hex.slice(2))
})

module.exports = { prefixed, unprefixed }
