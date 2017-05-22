const expect = require('chai').expect
const plugin = require('../')
const converters = plugin.converters
const Nobject = require('nobject')

describe('converters', () => {

  it('should be instance of Nobject', () => {
    expect(converters).to.be.instanceOf(Nobject)
  })

  describe('hex-array', () => {
    it('test 1', () => {
      const array = converters.get(['hex', 'array'])('000102ff')
      expect(array).to.be.instanceOf(Array)
      expect(array).to.deep.equal([0, 1, 2, 255])
    })

    it('test 2', () => {
      const array = converters.get(['hex', 'array'])('000102f')
      expect(array).to.be.instanceOf(Array)
      expect(array).to.deep.equal([0, 1, 2, 15])
    })

    it('test 3', () => {
      const array = converters.get(['hex', 'array'])('000102FF')
      expect(array).to.be.instanceOf(Array)
      expect(array).to.deep.equal([0, 1, 2, 255])
    })
  })

  describe('array-hex', () => {
    it('test 1', () => {
      const hex = converters.get(['array', 'hex'])([0, 1, 2, 255])
      expect(hex).to.be.a.string
      expect(hex).to.equal('000102ff')
    })

    it('test 2', () => {
      const hex = converters.get(['array', 'hex'])([0, 1, 2, 15])
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
  describe('array', () => {
    const test = plugin.equivalenceTests.array

    it('should return false when lengths dont match', () => {
      expect(
        test([], [1])
      ).to.equal(false)
      expect(
        test([1], [])
      ).to.equal(false)
    })

    it('should return false when values dont match', () => {
      expect(
        test([0], [1])
      ).to.equal(false)
      expect(
        test([1], [0])
      ).to.equal(false)
    })
    it('should return true when values do match', () => {
      expect(
        test([1], [1])
      ).to.equal(true)
    })

  })
})
