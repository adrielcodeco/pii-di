/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

import 'reflect-metadata'
import Token from '../../dist/token'

const requireTest = () => {
  jest.resetModules()
  return require('../../dist/decorators/injectMany').InjectMany
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('inject without identifier', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton('id', 1000)
  Container.addSingleton('id', 1001)
  Container.addSingleton('id', 1002)
  class Test {
    @InjectMany() id
  }
  const test = new Test()
  expect(test.id).toEqual([1000, 1001, 1002])
})

test('inject with string identifier', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton('test', 1000)
  Container.addSingleton('test', 1001)
  Container.addSingleton('test', 1002)
  class Test {
    @InjectMany('test') id
  }
  const test = new Test()
  expect(test.id).toEqual([1000, 1001, 1002])
})

test('inject with symbol identifier', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton(Symbol.for('test'), 1000)
  Container.addSingleton(Symbol.for('test'), 1001)
  Container.addSingleton(Symbol.for('test'), 1002)
  class Test {
    @InjectMany(Symbol.for('test'))
    id
  }
  const test = new Test()
  expect(test.id).toEqual([1000, 1001, 1002])
})

test('inject with token identifier', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton(Token('test'), 1000)
  Container.addSingleton(Token('test'), 1001)
  Container.addSingleton(Token('test'), 1002)
  class Test {
    @InjectMany(Token('test'))
    id
  }
  const test = new Test()
  expect(test.id).toEqual([1000, 1001, 1002])
})

test('fail on set injected property', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton('test', 1000)
  Container.addSingleton('test', 1001)
  Container.addSingleton('test', 1002)
  class Test {
    @InjectMany('test') id
  }
  const test = new Test()
  expect(() => {
    test.id = 1
  }).toThrowError(/This property has been injected, can not be setted/)
})

test('fail on inject on sealed object', () => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../dist/container').default
  Container.addSingleton('test', 1000)
  Container.addSingleton('test', 1001)
  Container.addSingleton('test', 1002)
  function sealed (
    target,
    propertyName,
    index
  ) {
    Object.seal(target)
  }
  expect(() => {
    // tslint:disable-next-line: no-unused-variable
    class Test {
      @InjectMany('test') @sealed id
    }
  }).toThrowError(/Cannot define property id, object is not extensible/)
})
