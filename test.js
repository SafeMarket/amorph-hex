const converters = require('./')
const chai = require('chai')

chai.should()

describe('converters', () => {

  describe('unprefixed', () => {
    it('should .to', () => {
      converters.unprefixed.to(new Uint8Array([1, 2, 3, 4])).should.equal('01020304')
    })
    it('should .from (even)', () => {
      converters.unprefixed.from('01020304').should.deep.equal(new Uint8Array([1, 2, 3, 4]))
    })
    it('should .from (odd)', () => {
      converters.unprefixed.from('1020304').should.deep.equal(new Uint8Array([1, 2, 3, 4]))
    })
  })

  describe('prefixed', () => {
    it('should .to', () => {
      converters.prefixed.to(new Uint8Array([1, 2, 3, 4])).should.equal('0x01020304')
    })
    it('should .from', () => {
      converters.prefixed.from('0x01020304').should.deep.equal(new Uint8Array([1, 2, 3, 4]))
    })
  })

})
