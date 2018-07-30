/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Class } from '@pii/utils'

export default class ServiceInstanceFactory<T> {
  type!: Class<T>
  lazyInstance: boolean

  _instance?: T
  _maker?: () => T

  constructor (
    type: Class<T> | undefined,
    lazyInstance: boolean = false,
    maker: undefined | (() => T) = undefined
  ) {
    if (type) {
      this.type = type
    }
    this.lazyInstance = lazyInstance
    this._maker = maker
  }

  newInstance (): T {
    if (!this.lazyInstance || !this._instance) {
      if (this._maker) {
        this._instance = this._maker()
      } else {
        const Type = this.type
        this._instance = new Type()
      }
    }
    return this._instance
  }
}
