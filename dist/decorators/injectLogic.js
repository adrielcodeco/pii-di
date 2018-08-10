"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const utils_1 = require("@pii/utils");
const token_1 = require("../token");
function InjectFunction(containerServiceGetter, identifier) {
    return function (target, propertyName, index) {
        let type;
        let services;
        if (typeof identifier !== 'string' &&
            typeof identifier !== 'symbol' &&
            utils_1.isClass(identifier)) {
            services = [identifier, token_1.default(identifier)];
        }
        else {
            type = Reflect.getMetadata('design:type', target, propertyName);
            services = [identifier, type, token_1.default(type), propertyName];
        }
        let getter = function () {
            return services
                .filter(s => s)
                .map(s => containerServiceGetter(s))
                .find((s) => s);
        };
        let setter = function (newVal) {
            if (!newVal)
                return;
            throw new Error('This property has been injected, can not be setted');
        };
        Reflect.deleteProperty(target, propertyName);
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
exports.default = InjectFunction;

//# sourceMappingURL=injectLogic.js.map
