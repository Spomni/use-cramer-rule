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

function extractConstantTerms(matrix) {
  return matrix.map((row) => row[row.length - 1])
}

function replaceColumn(matrix, j, terms) {
  return matrix.map((row, i) => {
    const newRow = [...row]
    newRow.splice(j, 1, terms[i])
    return newRow
  })
}

/**
 * @returns [x1, x2, ..., xn]
 */
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

  const constantTerms = extractConstantTerms(augmentedMatrix)

  const detM = det(matrix)

  return matrix.map((row, i) => {
    const detI = det(replaceColumn(matrix, i, constantTerms))

    return detI / detM
  })
}

module.exports = {
  useCramerRule,
}