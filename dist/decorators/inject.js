"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("../container");
const token_1 = require("../token");
function Inject(option) {
    return function (target, propertyName, index) {
        if (typeof option !== 'string' &&
            typeof option !== 'symbol' &&
            option &&
            option.constructor) {
            option = token_1.default(option);
        }
        const service = option || propertyName;
        let getter = function () {
            return container_1.default.get(service);
        };
        let setter = function (newVal) {
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
exports.Inject = Inject;

//# sourceMappingURL=inject.js.map
