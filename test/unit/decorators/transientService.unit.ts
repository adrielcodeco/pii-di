/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

import 'reflect-metadata'
import Token from '../../../src/token'

const requireTest = () => {
  jest.resetModules()
  return require('../../../src/decorators/transientService').TransientService
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('Add service', () => {
  expect.assertions(1)
  const TransientService = requireTest()
  const Container = require('../../../src/container').default
  @TransientService()
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get(Test)
  expect((test || {}).id).toEqual(1000)
})

test('Add service with string identifier', () => {
  expect.assertions(1)
  const TransientService = requireTest()
  const Container = require('../../../src/container').default
  @TransientService('test')
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get('test')
  expect((test || {}).id).toEqual(1000)
})

test('Add service with symbol identifier', () => {
  expect.assertions(1)
  const TransientService = requireTest()
  const Container = require('../../../src/container').default
  @TransientService(Symbol.for('test'))
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get(Symbol.for('test'))
  expect((test || {}).id).toEqual(1000)
})

test('Add service with token identifier', () => {
  expect.assertions(1)
  const TransientService = requireTest()
  const Container = require('../../../src/container').default
  @TransientService(Token('test'))
  // tslint:disable-next-line: no-unused-variable
  class Test {
    id = 1000
  }
  const test = Container.get(Token('test'))
  expect((test || {}).id).toEqual(1000)
})
