import { Inject } from '../src/decorators/inject'
import Container from '../src/container'

class InjectedType {
  id = 'InjectedType_id'
}

/**
 * Injecting with Type identifier
 */
Container.addTransient(InjectedType)

/**
 * Injecting with
 */
Container.addSingleton('name', 'sample_name')

export class Sample {
  /**
   * Inject with Type identifier
   * by inference
   */
  @Inject() injectedType: InjectedType
  /**
   * or naming
   */
  @Inject(InjectedType) injectedType2: any

  /**
   * Inject with propertyName identifier
   */
  @Inject() name: string
  /**
   * or naming
   */
  @Inject('name') name2: string
}
