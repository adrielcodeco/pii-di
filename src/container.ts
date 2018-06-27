/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ServiceInstanceFactory from './factory'
import Token from './token'
import KeyValue from './keyValue'
import { isString, isSymbol, Nullable, Class, cast } from './util'

const globalContainerKey: string = 'pii_di_container'
const initializeGLobal = (_global: any) => {
  _global[globalContainerKey] = []
}
initializeGLobal(global)
const globalContainer = Reflect.get(global, globalContainerKey)
const singletonContainer: KeyValue<any, any>[] = []
const transientContainer: KeyValue<any, any>[] = []

type ContainerFieldTypes < T > = T | T[] | undefined | Function | Class<T>

function findService<T> (
  container: KeyValue<any, any>[],
  service: any
): Nullable<KeyValue<any, T>> {
  if (!container) return undefined
  return container.filter(s => s.key === service).find(() => true)
}

function scopeService<T> (
  service?: string | Symbol
): Nullable<KeyValue<any, T>> {
  return findService(globalContainer, service)
}

function singletonService<T> (
  service?: string | Symbol
): Nullable<KeyValue<any, T>> {
  return findService(singletonContainer, service)
}

function transientService<T> (
  service?: string | Symbol
): Nullable<KeyValue<any, T>> {
  return findService(transientContainer, service)
}

function addOneOrMany (container: any, service: any, value: any): void {
  const keyValue = findService(container, service)
  if (keyValue) {
    if (keyValue.value instanceof Array) {
      keyValue.value.push(value)
    } else {
      container.splice(
        container.indexOf(keyValue),
        1,
        new KeyValue(service, [keyValue.value, value])
      )
    }
  } else {
    container.push(new KeyValue(service, value))
  }
}

function getInstanceOrValue<T> (container: any, service: any): T[] {
  const keyValue = findService<ContainerFieldTypes<T>>(container, service)
  if (!keyValue) {
    return []
  }
  let values =
    keyValue.value instanceof Array ? keyValue.value : [keyValue.value]
  const mapValues = (Value: Function | T | Class<T> | undefined) => {
    if (Value instanceof ServiceInstanceFactory) {
      return cast<ServiceInstanceFactory<T>>(Value).newInstance()
    } else if (
      typeof Value === 'function' &&
      Value.prototype &&
      Value.prototype.constructor
    ) {
      return new (Value as Class<T>)()
    } else {
      return cast<T>(Value)
    }
  }
  return values.map<T>(mapValues).filter(value => !!value)
}

function getContainer<T> (
  service?: string | Symbol
): KeyValue<any, T>[] | undefined {
  if (scopeService(service)) {
    return globalContainer
  }
  if (singletonService(service)) {
    return singletonContainer
  }
  if (transientService(service)) {
    return transientContainer
  }
  return undefined
}

export default class Container {
  public static has<T> (
    identifier: string | Symbol | Class<T> | Function
  ): boolean {
    const service: string | Symbol =
      isString(identifier) || isSymbol(identifier)
        ? cast<string | Symbol>(identifier)
        : Token(cast<Class<T> | Function>(identifier))
    return (
      !!scopeService(service) ||
      !!singletonService(service) ||
      !!transientService(service)
    )
  }

  public static get<T> (
    identifier: string | Symbol | Class<T> | Function
  ): T | undefined {
    const service =
      isString(identifier) || isSymbol(identifier)
        ? cast<string | Symbol>(identifier)
        : Token(cast<Class<T> | Function>(identifier))
    const container = getContainer(service)
    return getInstanceOrValue<T>(container, service).find(() => true)
  }

  public static getServices<T> (
    identifier: string | Symbol | Class<T> | Function
  ): T[] {
    const service =
      isString(identifier) || isSymbol(identifier)
        ? cast<string | Symbol>(identifier)
        : Token(cast<Class<T> | Function>(identifier))
    const container = getContainer(service)
    return getInstanceOrValue<T>(container, service)
  }

  public static add<T> (
    service: string | Symbol | Class<T>,
    value: T | any
  ): void {
    addOneOrMany(singletonContainer, service, value)
  }

  public static addScoped<T> (
    service: string | Symbol | Class<T>,
    value: T | any
  ): void {
    addOneOrMany(globalContainer, service, value)
  }

  public static addTransient<T> (
    service: string | Symbol | Class<T>,
    value: T | any
  ): void {
    addOneOrMany(transientContainer, service, value)
  }

  public static addSingleton<T> (
    service: string | Symbol | Class<T>,
    value: T | any
  ): void {
    addOneOrMany(singletonContainer, service, value)
  }
}
