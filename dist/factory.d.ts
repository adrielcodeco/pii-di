import { Class } from './util';
export default class ServiceInstanceFactory<T> {
    type: Class<T>;
    lazyInstance: boolean;
    _instance?: T;
    constructor(type: Class<T>, lazyInstance?: boolean);
    newInstance(): T;
}
//# sourceMappingURL=factory.d.ts.map