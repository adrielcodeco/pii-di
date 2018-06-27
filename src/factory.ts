/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Class } from './util'

export default class ServiceInstanceFactory<T> {
  type: Class<T>
  lazyInstance: boolean

  _instance?: T

  constructor (type: Class<T>, lazyInstance: boolean = false) {
    this.type = type
    this.lazyInstance = lazyInstance
  }

  newInstance (): T {
    if (!this.lazyInstance || !this._instance) {
      const Type = this.type
      this._instance = new Type()
    }
    return this._instance
  }
}
