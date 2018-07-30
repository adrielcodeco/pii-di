"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const utils_1 = require("@pii/utils");
const token_1 = require("../token");
function InjectFunction(containerServiceGetter, option) {
    return function (target, propertyName, index) {
        let type;
        let service;
        if (typeof option !== 'string' &&
            typeof option !== 'symbol' &&
            utils_1.isClass(option)) {
            option = token_1.default(option);
            service = option;
        }
        else {
            if (!propertyName && index && typeof index === 'number') {
                propertyName = utils_1.functionArgs(target)[index];
                type = Reflect.getMetadata('design:paramtypes', target)[index];
                service = (type ? token_1.default(type) : undefined) || propertyName;
            }
            else {
                type = Reflect.getMetadata('design:type', target, propertyName);
                service = [
                    option,
                    (type ? token_1.default(type) : ''),
                    propertyName
                ];
            }
        }
        let getter = function () {
            if (service instanceof Array) {
                return service
                    .map(s => (s ? containerServiceGetter(s) : undefined))
                    .find((s) => s);
            }
            return containerServiceGetter(service);
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
