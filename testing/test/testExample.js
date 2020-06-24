const { sum } = require('../example')
const { assert } = require('chai')

describe('Test sum(): ', () => {
  it('sum() success 1 + 1 = 2', () => {
    let result = sum(1, 1)
    assert.equal(result, 2, '1 + 1 must equal 2!')
  })

  it('sum() failed when input string', () => {
    let result = sum('abc', 'xyz')
    assert.notTypeOf(result, 'number', 'do not return number when input string!')
  })
})