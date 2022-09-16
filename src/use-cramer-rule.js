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

/**
 * Extract a matrix of the equations system from the augmented matrix of the one
 *
 * @param {array[]} augmented - augmented matrix of the system
 *
 * @returns {array[]} - matrix of the system
 *
 * Example:
 *   | a11 a12 a13 b1 |    | a11 a12 a13 |
 *   | a21 a22 a23 b2 | => | a21 a22 a23 |
 *   | a31 a32 a33 b3 |    | a31 a32 a33 |
 */
function extractSystemMatrix(augmented) {

  const matrix = augmented.map((row) => [...row])

  const n = matrix[0].length - 1
  matrix.forEach((row) => row.splice(n, 1))

  return matrix
}

/**
 * Extract constantterms from the augmented matrix of the equations system
 *
 * @param {array[]} matrix - augmented matrix of the system
 *
 * @returns {number} - array of constant terms
 *
 * Example:
 *   | a11 a12 a13 b1 |
 *   | a21 a22 a23 b2 | => [b1, b2, b3]
 *   | a31 a32 a33 b3 |
 */
function extractConstantTerms(matrix) {
  return matrix.map((row) => row[row.length - 1])
}

/**
 * Replace j-column of the equations system matrix with constant terms
 *
 * @param {array[]} matrix - matrix of the equations system
 * @param {number} j - column number
 * @param {array} terms - constant terms of the system
 *
 * @return {array[]}
 *
 * Example:
 *   j = 1; terms = [b1, b2, b3];
 *
 *   | a11 a12 a13 |    | a11 b1 a13 |
 *   | a21 a22 a23 | => | a21 b2 a23 |
 *   | a31 a32 a33 |    | a31 b3 a33 |
 */
function replaceColumn(matrix, j, terms) {
  return matrix.map((row, i) => {
    const newRow = [...row]
    newRow.splice(j, 1, terms[i])
    return newRow
  })
}

/**
 * Solve system of linear algebraic equations by Cramer's rule
 *
 * @param {array[]} augmentedMatrix - augmented matrix of the system
 *
 * @returns {number[]} - [x1, x2, ..., xn]
 *
 * @throws {TypeError} - if param is not augmented matrix of the system
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
