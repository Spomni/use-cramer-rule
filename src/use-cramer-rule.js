const {
  isMatrixOfNumbers,
  isAugmentedMatrix,
} = require('./check')

const { determinant: det } = require('determinant')

class NotMatrixOfNummbersError extends TypeError {
  constructor() {
    super('Passed param must be a matrix of numbers')
  }
}

class NotAugmentedMatrixError extends TypeError {
  constructor() {
    super('Passed matrix must have size "N x (N + 1)"')
  }
}

function extractSystemMatrix(augmented) {

  const matrix = augmented.map((row) => [...row])

  const n = matrix[0].length - 1
  matrix.forEach((row) => row.splice(n, 1))

  return matrix
}

function useCramerRule(augmentedMatrix) {

  if (!isMatrixOfNumbers(augmentedMatrix)) {
    throw new NotMatrixOfNummbersError()
  }

  if (!isAugmentedMatrix(augmentedMatrix)) {
    throw new NotAugmentedMatrixError()
  }

  const matrix = extractSystemMatrix(augmentedMatrix)

  if (det(matrix) === 0) {
    return null
  }
}

module.exports = {
  useCramerRule,
}