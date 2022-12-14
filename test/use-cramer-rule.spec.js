const { assert } = require('chai')

const { useCramerRule } = require('../')

const {
  notMatrixArray,
  notMatrixOfNumbersArray,
  notAugmentedMatrixArray,

  notOnceSolutionMatrixArray,

  rank2SystemArray,
  rank3SystemArray,
  anyRankSystemArray,

  assertThrowsCustomTypeError,
} = require('./use-cramer-rule.fixture.js')

describe('useCramerRule():', () => {
  
  it('should throw a custom type error if passed param is not a matrix of numbers', () => {

    const dataList = [
      ...notMatrixArray,
      ...notMatrixOfNumbersArray,
    ]

    dataList.forEach((value) => {
      assertThrowsCustomTypeError(() => useCramerRule(value))
    })
  })

  it('should throw a custom type error if size of the passed matrix is not N x (N+1)', () => {
    notAugmentedMatrixArray.forEach((matrix) => {
      assertThrowsCustomTypeError(() => useCramerRule(matrix))
    })
  })

  it('should return null if the system matrix determinant equal to 0', () => {
    notOnceSolutionMatrixArray.forEach((matrix) => {
      assert.strictEqual(useCramerRule(matrix), null)
    })
  })

  it('should solve systems with rank 2', () => {
    rank2SystemArray.forEach(([matrix, solution]) => {
      assert.deepEqual(useCramerRule(matrix), solution)
    })
  })

  it('should solve systems with rank 3', () => {
    rank3SystemArray.forEach(([matrix, solution]) => {
      assert.deepEqual(useCramerRule(matrix), solution)
    })
  })

  it('should solve systems with any rank', () => {
    anyRankSystemArray.forEach(([matrix, solution]) => {
      assert.deepEqual(useCramerRule(matrix), solution)
    })
  })
})