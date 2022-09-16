function isArray(value) {
  return value instanceof Array
}

function isMatrix(value) {

  // is not empty array
  if (!isArray(value) || !value.length) return false

  // array items are not empty arrays
  for (let i=0; i<value.length; i++) {
    const item = value[i]
    if (!isArray(item) || !item.length) return false
  }

  // inner arrays have equal lengths
  const length = value[0].length

  for (let i=0; i<value.length; i++) {
    const item = value[i]
    if (item.length !== length) return false
  }
  
  // true
  return true
}

function isMatrixOfNumbers(matrix) {
  
  if (!isMatrix(matrix)) return false
  
  const m = matrix.length
  const n = matrix[0].length

  for (let i=0; i<m; i++) {
    for (let j=0; j<n; j++) {
      if (typeof matrix[i][j] !== 'number') return false
    }
  }
  
  return true
}

function isAugmentedMatrix(matrix) {

  const m = matrix.length
  const n = matrix[0].length

  return m === n - 1
}

module.exports = {
  isMatrixOfNumbers,
  isAugmentedMatrix,
}