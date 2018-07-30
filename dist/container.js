"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./factory");
const token_1 = require("./token");
const keyValue_1 = require("./keyValue");
const utils_1 = require("@pii/utils");
const globalContainerKey = 'pii_di_container';
const initializeGLobal = (_global) => {
    _global[globalContainerKey] = [];
};
initializeGLobal(global);
const globalContainer = Reflect.get(global, globalContainerKey);
const singletonContainer = [];
const transientContainer = [];
function findService(container, service) {
    return container.filter(s => s.key === service).find(() => true);
}
function scopeService(service) {
    return findService(globalContainer, service);
}
function singletonService(service) {
    return findService(singletonContainer, service);
}
function transientService(service) {
    return findService(transientContainer, service);
}
function addOneOrMany(container, service, value) {
    const keyValue = findService(container, service);
    if (keyValue) {
        if (keyValue.value instanceof Array) {
            keyValue.value.push(value);
        }
        else {
            container.splice(container.indexOf(keyValue), 1, new keyValue_1.default(service, [keyValue.value, value]));
        }
    }
    else {
        container.push(new keyValue_1.default(service, value));
    }
}
function removeService(container, service) {
    const keyValue = findService(container, service);
    if (keyValue) {
        container.splice(container.indexOf(keyValue), 1);
        return true;
    }
    else {
        return false;
    }
}
function getInstanceOrValue(container, service) {
    const keyValue = findService(container, service);
    let values = keyValue.value instanceof Array ? keyValue.value : [keyValue.value];
    const mapValues = (Value) => {
        if (Value instanceof factory_1.default) {
            return utils_1.cast(Value).newInstance();
        }
        else if (utils_1.isClass(Value)) {
            return new Value();
        }
        else {
            return utils_1.cast(Value);
        }
    };
    return values.map(mapValues).filter(value => !!value);
}
function getContainer(service) {
    const containers = [];
    if (scopeService(service)) {
        containers.push(globalContainer);
    }
    if (singletonService(service)) {
        containers.push(singletonContainer);
    }
    if (transientService(service)) {
        containers.push(transientContainer);
    }
    return containers;
}
function isFactory(service) {
    return service.service && service.maker;
}
class Container {
    static has(identifier) {
        const service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        return (!!scopeService(service) ||
            !!singletonService(service) ||
            !!transientService(service));
    }
    static get(identifier) {
        const service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        const container = getContainer(service).find(() => true);
        if (!container)
            return undefined;
        return getInstanceOrValue(container, service).find(() => true);
    }
    static getServices(identifier) {
        const service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        const container = getContainer(service);
        const results = [];
        container.forEach(c => {
            getInstanceOrValue(c, service).forEach(r => results.push(r));
        });
        return results;
    }
    static add(service, value) {
        addOneOrMany(singletonContainer, service, value);
    }
    static addScoped(service, value) {
        addOneOrMany(globalContainer, service, value);
    }
    static addTransient(service, value) {
        if (isFactory(service)) {
            const factory = service;
            service = utils_1.isClass(factory.service)
                ? token_1.default(factory.service)
                : factory.service;
            value = new factory_1.default(undefined, true, factory.maker);
        }
        if (!value && utils_1.isClass(service)) {
            value = service;
            service = token_1.default(service);
        }
        addOneOrMany(transientContainer, service, value);
    }
    static addSingleton(service, value, replace = true) {
        if (Container.has(service) && replace) {
            Container.removeSingleton(service);
        }
        addOneOrMany(singletonContainer, service, value);
    }
    static removeScoped(service) {
        return removeService(globalContainer, service);
    }
    static removeTransient(service) {
        return removeService(transientContainer, service);
    }
    static removeSingleton(service) {
        return removeService(singletonContainer, service);
    }
}
exports.default = Container;

//# sourceMappingURL=container.js.map
