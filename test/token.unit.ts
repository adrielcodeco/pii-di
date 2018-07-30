/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/token').default
}

/**
 * require file without exceptions
 */
test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

/**
 * call Token function without argument
 */
test('call token with invalid argument', () => {
  expect.assertions(1)
  const Token = requireTest()
  expect(() => {
    Token()
  }).toThrowError(/invalid token identifier/)
})

/**
 * call Token function with string identifier
 */
test('call token with string argument', () => {
  expect.assertions(1)
  const Token = requireTest()
  const token = Token('test')
  expect(token).toEqual('Token(test)')
})

/**
 * call Token function with object identifier
 */
test('call token with object argument', () => {
  expect.assertions(1)
  const value = {
    id: '',
    test: Math.random()
  }
  const Token = requireTest()
  const token = Token(value)
  expect(token).toEqual('Token({id,test})')
})

/**
 * call Token function with cass identifier
 */
test('call token with class argument', () => {
  expect.assertions(1)
  class Test {
    id = ''
    test = Math.random()
  }
  const Token = requireTest()
  const token = Token(Test)
  expect(token).toEqual('Token(Test{id,test})')
})

/**
 * call Token function with function identifier
 */
test('call token with function argument', () => {
  expect.assertions(1)
  function Test () {
    // does nothing
  }
  Test.prototype.id = ''
  Test.prototype.test = Math.random()
  const Token = requireTest()
  const token = Token(Test)
  expect(token).toEqual('Token(Test{id,test})')
})
