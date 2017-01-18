const expect = require('chai').expect
const plugin = require('../')
const converters = plugin.converters
const Nobject = require('nobject')

describe('converters', () => {

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('hex-uint8array', () => {
    it('test 1', () => {
      const uint8array = converters.get(['hex', 'uint8Array'])('000102ff')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 255]))
    })

    it('test 2', () => {
      const uint8array = converters.get(['hex', 'uint8Array'])('000102f')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 15]))
    })

    it('test 3', () => {
      const uint8array = converters.get(['hex', 'uint8Array'])('000102FF')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 255]))
    })
  })

  describe('uint8array-hex', () => {
    it('test 1', () => {
      const hex = converters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 255]))
      expect(hex).to.be.a.string
      expect(hex).to.equal('000102ff')
    })

    it('test 2', () => {
      const hex = converters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 15]))
      expect(hex).to.be.a.string
      expect(hex).to.equal('0001020f')
    })
  })

  describe('hex-hex.prefixed', () => {
    it('test 1', () => {
      const prefixedHex = converters.get(['hex', 'hex.prefixed'])('00ff')
      expect(prefixedHex).to.be.a.string
      expect(prefixedHex).to.equal('0x00ff')
    })

    it('test 2', () => {
      const hex = converters.get(['hex.prefixed', 'hex'])('0x00ff')
      expect(hex).to.be.a.string
      expect(hex).to.equal('00ff')
    })
  })

})

describe('equivalenceTests', () => {
  describe('uint8Array', () => {
    const test = plugin.equivalenceTests.uint8Array

    it('should return false when lengths dont match', () => {
      expect(
        test(new Uint8Array([]), new Uint8Array([1]))
      ).to.equal(false)
      expect(
        test(new Uint8Array([1]), new Uint8Array([]))
      ).to.equal(false)
    })

    it('should return false when values dont match', () => {
      expect(
        test(new Uint8Array([0]), new Uint8Array([1]))
      ).to.equal(false)
      expect(
        test(new Uint8Array([1]), new Uint8Array([0]))
      ).to.equal(false)
    })
    it('should return true when values do match', () => {
      expect(
        test(new Uint8Array([1]), new Uint8Array([1]))
      ).to.equal(true)
    })

  })
})
