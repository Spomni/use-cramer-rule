const { isMatrixOfNumbers } = require('./check')

class NotMatrixOfNummbersError extends TypeError {
  constructor() {
    super('Passed param must be a matrix of numbers')
  }
}

function useCramerRule(augmentedMatrix) {

  if (!isMatrixOfNumbers(augmentedMatrix)) {
    throw new NotMatrixOfNummbersError()
  }
}

module.exports = {
  useCramerRule,
}