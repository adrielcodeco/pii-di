"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var utils_1 = require("@pii/utils");
var token_1 = __importDefault(require("../token"));
function InjectFunction(containerServiceGetter, identifier) {
    return function (target, propertyName, index) {
        var type;
        var services;
        if (typeof identifier !== 'string' &&
            typeof identifier !== 'symbol' &&
            utils_1.isClass(identifier)) {
            services = [identifier, token_1.default(identifier)];
        }
        else {
            type = Reflect.getMetadata('design:type', target, propertyName);
            services = [identifier, type, token_1.default(type), propertyName];
        }
        var getter = function () {
            return services
                .filter(function (s) { return s; })
                .map(function (s) { return containerServiceGetter(s); })
                .find(function (s) { return s; });
        };
        var setter = function (newVal) {
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
