/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ServiceInstanceFactory from './factory'
import Token from './token'
import KeyValue from './keyValue'
import { isString, isSymbol, isClass, Nullable, Class, cast } from '@pii/utils'

type ContainerType < T > = KeyValue<any, T>[]

const globalContainerKey: string = 'pii_di_container'
const initializeGLobal = (_global: any) => {
  _global[globalContainerKey] = []
}
initializeGLobal(global)
const globalContainer = Reflect.get(global, globalContainerKey)
const singletonContainer: ContainerType<any> = []
const transientContainer: ContainerType<any> = []

type ContainerFieldTypes < T > = T | T[] | undefined | Function | Class<T>

function findService<T> (
  container: ContainerType<any>,
  service: any
): Nullable<KeyValue<any, T>> {
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

function addOneOrMany (
  container: ContainerType<any>,
  service: any,
  value: any
): void {
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

function removeService (container: ContainerType<any>, service: any): boolean {
  const keyValue = findService(container, service)
  if (keyValue) {
    container.splice(container.indexOf(keyValue), 1)
    return true
  } else {
    return false
  }
}

function getInstanceOrValue<T> (
  container: ContainerType<any>,
  service: any
): T[] {
  const keyValue = findService<ContainerFieldTypes<T>>(
    container,
    service
  ) as KeyValue<any, ContainerFieldTypes<T>>
  let values =
    keyValue.value instanceof Array ? keyValue.value : [keyValue.value]
  const mapValues = (Value: Function | T | Class<T> | undefined) => {
    if (Value instanceof ServiceInstanceFactory) {
      return cast<ServiceInstanceFactory<T>>(Value).newInstance()
    } else if (isClass(Value)) {
      return new (Value as Class<T>)()
    } else {
      return cast<T>(Value)
    }
  }
  return values.map<T>(mapValues).filter(value => !!value)
}

function getContainer<T> (service?: string | Symbol): ContainerType<T>[] {
  const containers = []
  if (scopeService(service)) {
    containers.push(globalContainer)
  }
  if (singletonService(service)) {
    containers.push(singletonContainer)
  }
  if (transientService(service)) {
    containers.push(transientContainer)
  }
  return containers
}

export type Maker < T > = (() => T)
export type Factory < T > = {
  service: string | Symbol | Class<T>
  maker: Maker<T>
}

function isFactory<T> (service: any): service is Factory<T> {
  return service.service && service.maker
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
  ): Nullable<T> {
    const service =
      isString(identifier) || isSymbol(identifier)
        ? cast<string | Symbol>(identifier)
        : Token(cast<Class<T> | Function>(identifier))
    const container = getContainer(service).find(() => true)
    if (!container) return undefined
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
    const results: T[] = []
    container.forEach(c => {
      getInstanceOrValue<T>(c, service).forEach(r => results.push(r))
    })
    return results
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

  // tslint:disable unified-signatures
  public static addTransient<T> (factory: Factory<T>): void
  public static addTransient<T> (
    service: string | Symbol | Class<T>,
    value?: T | any
  ): void
  // tslint:enable unified-signatures
  public static addTransient<T> (
    service: string | Symbol | Class<T> | Factory<T>,
    value?: T | any
  ): void {
    if (isFactory<T>(service)) {
      const factory = service
      service = isClass(factory.service)
        ? Token(factory.service as Class<T>)
        : factory.service
      value = new ServiceInstanceFactory(undefined, true, factory.maker)
    }
    if (!value && isClass(service)) {
      value = service
      service = Token(service as Class<T>)
    }
    addOneOrMany(transientContainer, service, value)
  }

  public static addSingleton<T> (
    service: string | Symbol | Class<T>,
    value: T | any,
    replace: boolean = true
  ): void {
    if (Container.has(service) && replace) {
      Container.removeSingleton(service)
    }
    addOneOrMany(singletonContainer, service, value)
  }

  /**
   * Remove service from Scoped container
   * @param {string | Symbol | { new (...args: any[]): T}} service service identifier
   */
  public static removeScoped<T> (service: string | Symbol | Class<T>): boolean {
    return removeService(globalContainer, service)
  }

  /**
   * Remove service from Transient container
   * @param {string | Symbol | { new (...args: any[]): T}} service service identifier
   */
  public static removeTransient<T> (
    service: string | Symbol | Class<T>
  ): boolean {
    return removeService(transientContainer, service)
  }

  /**
   * Remove service from Singleton container
   * @param {string | Symbol | { new (...args: any[]): T}} service service identifier
   */
  public static removeSingleton<T> (
    service: string | Symbol | Class<T>
  ): boolean {
    return removeService(singletonContainer, service)
  }
}
