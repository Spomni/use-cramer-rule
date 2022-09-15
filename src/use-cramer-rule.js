const {
  isMatrixOfNumbers,
  isAugmentedMatrix,
} = require('./check')

class NotMatrixOfNummbersError extends TypeError {
  constructor() {
    super('Passed param must be a matrix of numbers')
  }
}

class NotAugmentedMatrixError extends TypeError {
  constructor() {
    super('Passed matrix must have size "N x (N + 1)"'
  }
}

function useCramerRule(augmentedMatrix) {

  if (!isMatrixOfNumbers(augmentedMatrix)) {
    throw new NotMatrixOfNummbersError()
  }

  if (!isAugmentedMatrix(augmentedMatrix)) {
    throw new NotAugmentedMatrixError()
  }
}

module.exports = {
  useCramerRule,
}