/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import Token from '../../src/token'

export {}

const requireTest = () => {
  jest.resetModules()
  return require('../../src/decorators/inject').Inject
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('inject without identifier', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton('id', 1000)
  class Test {
    @Inject() id
  }
  const test = new Test()
  expect(test.id).toEqual(1000)
})

test('inject with string identifier', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton('test', 1000)
  class Test {
    @Inject('test') id
  }
  const test = new Test()
  expect(test.id).toEqual(1000)
})

test('inject with symbol identifier', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton(Symbol.for('test'), 1000)
  class Test {
    @Inject(Symbol.for('test'))
    id
  }
  const test = new Test()
  expect(test.id).toEqual(1000)
})

test('inject with token identifier', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton(Token('test'), 1000)
  class Test {
    @Inject(Token('test'))
    id
  }
  const test = new Test()
  expect(test.id).toEqual(1000)
})

test('fail on set injected property', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton('test', 1000)
  class Test {
    @Inject('test') id
  }
  const test = new Test()
  expect(() => {
    test.id = 1
  }).toThrowError(/This property has been injected, can not be setted/)
})

test('fail on inject on sealed object', () => {
  expect.assertions(1)
  const Inject = requireTest()
  const Container = require('../../src/container').default
  Container.addSingleton('test', 1000)
  function sealed (target, propertyName, index) {
    Object.seal(target)
  }
  expect(() => {
    // tslint:disable-next-line: no-unused-variable
    class Test {
      @Inject('test')
      @sealed
      id
    }
  }).toThrowError(/Cannot define property id, object is not extensible/)
})
