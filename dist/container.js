"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = __importDefault(require("./factory"));
var token_1 = __importDefault(require("./token"));
var keyValue_1 = __importDefault(require("./keyValue"));
var utils_1 = require("@pii/utils");
var globalContainerKey = 'pii_di_global_container';
var singletonContainerKey = 'pii_di_singleton_container';
var transientContainerKey = 'pii_di_transient_container';
var initializeContainer = function (global, key) {
    if (Reflect.has(global, key)) {
        return Reflect.get(global, key);
    }
    else {
        var container = [];
        Reflect.set(global, key, container);
        return container;
    }
};
var globalContainer = initializeContainer(global, globalContainerKey);
var singletonContainer = initializeContainer(Reflect.get(global, 'mainGlobal') || global, singletonContainerKey);
var transientContainer = initializeContainer(Reflect.get(global, 'mainGlobal') || global, transientContainerKey);
function findService(container, service) {
    return container.filter(function (s) { return s.key === service; }).find(function () { return true; });
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
    service = utils_1.isClass(service) ? token_1.default(service) : service;
    var keyValue = findService(container, service);
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
    service = utils_1.isClass(service) ? token_1.default(service) : service;
    var keyValue = findService(container, service);
    if (keyValue) {
        container.splice(container.indexOf(keyValue), 1);
        return true;
    }
    else {
        return false;
    }
}
function getInstanceOrValue(container, service) {
    var keyValue = findService(container, service);
    var values = keyValue.value instanceof Array ? keyValue.value : [keyValue.value];
    var mapValues = function (Value) {
        if (Value instanceof factory_1.default) {
            return utils_1.cast(Value).newInstance();
        }
        else if (container !== singletonContainer && utils_1.isClass(Value)) {
            return new Value();
        }
        else {
            return utils_1.cast(Value);
        }
    };
    return values.map(mapValues).filter(function (value) { return !!value; });
}
function getContainer(service) {
    var containers = [];
    if (scopeService(service)) {
        containers.push(globalContainer);
    }
    if (transientService(service)) {
        containers.push(transientContainer);
    }
    if (singletonService(service)) {
        containers.push(singletonContainer);
    }
    return containers;
}
function isFactory(service) {
    return service && service.service && service.maker;
}
var Container = (function () {
    function Container() {
    }
    Container.has = function (identifier) {
        var service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        return (!!scopeService(service) ||
            !!singletonService(service) ||
            !!transientService(service));
    };
    Container.get = function (identifier) {
        var service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        var container = getContainer(service).find(function () { return true; });
        if (!container)
            return undefined;
        return getInstanceOrValue(container, service).find(function () { return true; });
    };
    Container.getServices = function (identifier) {
        var service = utils_1.isString(identifier) || utils_1.isSymbol(identifier)
            ? utils_1.cast(identifier)
            : token_1.default(utils_1.cast(identifier));
        var container = getContainer(service);
        var results = [];
        container.forEach(function (c) {
            getInstanceOrValue(c, service).forEach(function (r) { return results.push(r); });
        });
        return results;
    };
    Container.add = function (service, value) {
        Container.addSingleton(service, value);
    };
    Container.addScoped = function (service, value) {
        if (isFactory(service)) {
            var factory = service;
            service = factory.service;
            value = new factory_1.default(undefined, true, factory.maker);
        }
        if (!value && utils_1.isClass(service)) {
            value = service;
            service = token_1.default(service);
        }
        addOneOrMany(globalContainer, service, value);
    };
    Container.addTransient = function (service, value) {
        if (isFactory(service)) {
            var factory = service;
            service = factory.service;
            value = new factory_1.default(undefined, true, factory.maker);
        }
        if (!value && utils_1.isClass(service)) {
            value = service;
            service = token_1.default(service);
        }
        addOneOrMany(transientContainer, service, value);
    };
    Container.addSingleton = function (service, value, replace) {
        if (replace === void 0) { replace = true; }
        if (Container.has(service) && replace) {
            Container.removeSingleton(service);
        }
        addOneOrMany(singletonContainer, service, value);
    };
    Container.removeScoped = function (service) {
        return removeService(globalContainer, service);
    };
    Container.removeTransient = function (service) {
        return removeService(transientContainer, service);
    };
    Container.removeSingleton = function (service) {
        return removeService(singletonContainer, service);
    };
    return Container;
}());
exports.default = Container;
var containerKey = '(@pii/di/container).filename';
var containers = Container.getServices(containerKey);
if (!containers.includes(__filename)) {
    Container.addTransient(containerKey, __filename);
}

//# sourceMappingURL=container.js.map
