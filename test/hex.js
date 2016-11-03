const expect = require('chai').expect
const hexConverters = require('../')
const Nobject = require('nobject')

describe('hexConverters', () => {

  it('should be instance of Nobject', () => {
    expect(hexConverters).to.be.instanceOf(Nobject)
  })

  describe('hex.uint8array', () => {
    it('test 1', () => {
      const uint8array = hexConverters.get(['hex', 'uint8Array'])('000102ff')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 255]))
    })

    it('test 2', () => {
      const uint8array = hexConverters.get(['hex', 'uint8Array'])('000102f')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 15]))
    })

    it('test 3', () => {
      const uint8array = hexConverters.get(['hex', 'uint8Array'])('000102FF')
      expect(uint8array).to.be.instanceOf(Uint8Array)
      expect(uint8array).to.deep.equal(new Uint8Array([0, 1, 2, 255]))
    })
  })

  describe('uint8array.hex', () => {
    it('test 1', () => {
      const hex = hexConverters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 255]))
      expect(hex).to.be.a.string
      expect(hex).to.equal('000102ff')
    })

    it('test 2', () => {
      const hex = hexConverters.get(['uint8Array', 'hex'])(new Uint8Array([0, 1, 2, 15]))
      expect(hex).to.be.a.string
      expect(hex).to.equal('0001020f')
    })
  })

  describe('hex.prefixedHex', () => {
    it('test 1', () => {
      const prefixedHex = hexConverters.get(['hex', 'hex.prefixed'])('00ff')
      expect(prefixedHex).to.be.a.string
      expect(prefixedHex).to.equal('0x00ff')
    })

    it('test 2', () => {
      const hex = hexConverters.get(['hex.prefixed', 'hex'])('0x00ff')
      expect(hex).to.be.a.string
      expect(hex).to.equal('00ff')
    })
  })


})