const Nobject = require('nobject')
const converters = new Nobject
const arrayEquals = require('array-equal')

converters.set(['hex', 'array'], (hex) => {
  const array = []
  for (let i = 0; i < hex.length; i += 2) {
    const hexPart = hex.substr(i,2)
    const int = parseInt(hexPart, 16)
    array.push(int)
  }
  return array
})

converters.set(['array', 'hex'], (array) => {
  return array.map((int) => {

    const hexPart = int.toString(16)

    if (int === 0) {
      return '00'
    } else if (int < 16) {
      return '0'+hexPart
    } else {
      return hexPart
    }

  }).join('')
})

converters.set(['hex', 'hex.prefixed'], (hex) => {
  return '0x'+hex
})

converters.set(['hex.prefixed', 'hex'], (prefixedHex) => {
  return prefixedHex.substr(2)
})


module.exports = {
  pluginVersion: 1,
  converters: converters,
  equivalenceTests: {
    array: arrayEquals
  }
}
