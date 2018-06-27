/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Nullable } from './util'

export default class KeyValue<K, V> {
  key: Nullable<K>
  value: Nullable<V>
  constructor (key?: K, value?: V) {
    this.key = key
    this.value = value
  }
}
