/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

const requireTest = () => {
  jest.resetModules()
  return require('../dist/token').default
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('call token with invalid argument', () => {
  expect.assertions(1)
  const Token = requireTest()
  expect(() => {
    Token()
  }).toThrowError(/invalid token identifier/)
})

test('call token with string argument', () => {
  expect.assertions(1)
  const Token = requireTest()
  const token = Token('test')
  expect(token).toEqual('Token(test)')
})

test('call token with object argument', () => {
  expect.assertions(1)
  const value = {
    test: Math.random(),
    id: ''
  }
  const Token = requireTest()
  const token = Token(value)
  expect(token).toEqual('Token({test,id})')
})

test('call token with class argument', () => {
  expect.assertions(1)
  class Test {
    constructor () {
      this.test = Math.random()
      this.id = ''
    }
  }
  const Token = requireTest()
  const token = Token(Test)
  expect(token).toEqual('Token(Test{test,id})')
})

test('call token with function argument', () => {
  expect.assertions(1)
  function Test () {
    // does nothing
  }
  Test.prototype.test = Math.random()
  Test.prototype.id = ''
  const Token = requireTest()
  const token = Token(Test)
  expect(token).toEqual('Token(Test{test,id})')
})
