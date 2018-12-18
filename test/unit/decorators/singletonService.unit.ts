/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */
import 'reflect-metadata'
import Token from '../../../src/token'

export {}

const requireTest = () => {
  jest.resetModules()
  Reflect.deleteProperty(global, 'pii_di_global_container')
  Reflect.deleteProperty(global, 'pii_di_singleton_container')
  Reflect.deleteProperty(global, 'pii_di_transient_container')
  return require('../../../src/decorators/singletonService').SingletonService
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('Add service', () => {
  expect.assertions(1)
  const SingletonService = requireTest()
  const Container: { get: <T>(k: any) => T } = require('../../../src/container')
    .default
  @SingletonService()
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get<Test>(Test)
  expect((test || {}).id).toEqual(1000)
})

test('Add service with string identifier', () => {
  expect.assertions(1)
  const SingletonService = requireTest()
  const Container: { get: <T>(k: any) => T } = require('../../../src/container')
    .default
  @SingletonService('test')
  class Test {
    id = 1000
  }
  const test = Container.get<Test>('test')
  expect((test || {}).id).toEqual(1000)
})

test('Add service with symbol identifier', () => {
  expect.assertions(1)
  const SingletonService = requireTest()
  const Container: { get: <T>(k: any) => T } = require('../../../src/container')
    .default
  @SingletonService(Symbol.for('test'))
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get<Test>(Symbol.for('test'))
  expect((test || {}).id).toEqual(1000)
})

test('Add service with token identifier', () => {
  expect.assertions(1)
  const SingletonService = requireTest()
  const Container: { get: <T>(k: any) => T } = require('../../../src/container')
    .default
  @SingletonService(Token('test'))
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get<Test>(Token('test'))
  expect((test || {}).id).toEqual(1000)
})
