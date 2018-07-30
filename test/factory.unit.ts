/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../src/factory').default
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('call newInstance', () => {
  expect.assertions(2)
  const value = class Test {
    test = Math.random()
  }
  const ServiceInstanceFactory = requireTest()
  const factory = new ServiceInstanceFactory(value)
  expect(factory.newInstance()).toBeInstanceOf(value)
  expect(factory.newInstance()).not.toStrictEqual(factory.newInstance())
})

test('call newInstance with lazyInstance = true', () => {
  expect.assertions(2)
  const value = class Test {
    test = Math.random()
  }
  const ServiceInstanceFactory = requireTest()
  const factory = new ServiceInstanceFactory(value, true)
  expect(factory.newInstance()).toBeInstanceOf(value)
  expect(factory.newInstance()).toStrictEqual(factory.newInstance())
})

test('call newInstance with maker', () => {
  expect.assertions(2)
  const value = class Test {
    test = Math.random()
  }
  const newValue = new value()
  const ServiceInstanceFactory = requireTest()
  const factory = new ServiceInstanceFactory(undefined, true, () => newValue)
  expect(factory.newInstance()).toBeInstanceOf(value)
  expect(factory.newInstance()).toStrictEqual(newValue)
})
