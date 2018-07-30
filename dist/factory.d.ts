import { Class } from '@pii/utils';
export default class ServiceInstanceFactory<T> {
    type: Class<T>;
    lazyInstance: boolean;
    _instance?: T;
    _maker?: () => T;
    constructor(type: Class<T> | undefined, lazyInstance?: boolean, maker?: undefined | (() => T));
    newInstance(): T;
}
//# sourceMappingURL=factory.d.ts.map