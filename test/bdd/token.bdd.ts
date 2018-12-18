/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

export {}

const requireTest = () => {
  jest.resetModules()
  return require('../../src/token').default
}

describe('Token BDD suite', () => {
  test('with string identifier', () => {
    const test = requireTest()
    const token = test('identifier')
    expect(token).toEqual('Token(identifier)')
  })

  test('with es6 class identifier', () => {
    class Dummy {
      id = Math.random()
    }
    const test = requireTest()
    const token = test(Dummy)
    expect(token).toEqual('Token(Dummy{id})')
  })

  test('with function class identifier', () => {
    function Dummy () {
      // @ts-ignore
      this.id = Math.random()
    }
    Dummy.prototype.getId = function () {
      return this.id
    }
    const test = requireTest()
    const token = test(Dummy)
    expect(token).toEqual('Token(Dummy{getId,id})')
  })
})
