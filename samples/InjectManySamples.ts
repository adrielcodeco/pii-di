import { InjectMany } from '../src/decorators/injectMany'
import Container from '../src/container'

class InjectedType {
  id = 'InjectedType_id'
}

/**
 * Injecting with Type identifier
 */
Container.addTransient(InjectedType, new InjectedType())
Container.addTransient(InjectedType, new InjectedType())

/**
 * Injecting with
 */
Container.addSingleton('name', 'sample_name_1', false)
Container.addSingleton('name', 'sample_name_2', false)

export class Sample {
  /**
   * Inject with Type identifier
   * by inference
   */
  @InjectMany() injectedType: InjectedType[]
  /**
   * or naming
   */
  @InjectMany(InjectedType) injectedType2: any[]

  /**
   * Inject with propertyName identifier
   */
  @InjectMany() names: string[]
  /**
   * or naming
   */
  @InjectMany('name') names2: string[]
}
