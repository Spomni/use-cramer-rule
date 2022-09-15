const { assert } = require('chai')

const notMatrixArray = [
  1,
  undefined,
  null,
  'string',
  [['ku'], 4],
  [
    [0, 1, 2],
    [3, 2]
  ],
  [],
  [[]],
]

const notMatrixOfNumbersArray = [
  [
    ['11']
  ],
  [
    [11, 12],
    [21, null]
  ],
  [
    [11, 12, 13],
    [21, true, 23],
    [31, 32, 33]
  ]
]

const notAugmentedMatrixArray = [
  [
    [0]
  ],
  [
    [0, 0, 0]
  ],
  [
    [0],
    [0],
    [0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]
]

const notOnceSolutionMatrixArray = [
  [
    [1, 2, 4],
    [3, 6, 7],
  ],
  [
    [1, 2, 3, 8],
    [4, 5, 6, 4],
    [7, 8, 9, 12],
  ],
  [
    [1, 2, 3, 4, 8],
    [0, 1, 2, 3, 10],
    [0, 4, 5, 6, -4],
    [0, 7, 8, 9, 5],
  ]
]

function assertThrowsCustomTypeError(func) {
  
  assert.throws(func, TypeError)
      
  try {
    func()
  } catch (error) {
    assert(
      error.__proto__.constructor !== TypeError,
      'expect the function throws a custom TypeError'
      )
    }
}

module.exports = {
  notMatrixArray,
  notMatrixOfNumbersArray,
  notAugmentedMatrixArray,

  notOnceSolutionMatrixArray,

  assertThrowsCustomTypeError,
}