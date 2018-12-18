"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __importDefault(require("../container"));
var factory_1 = __importDefault(require("../factory"));
var token_1 = __importDefault(require("../token"));
function SingletonService(id) {
    return function (target) {
        var service = id || token_1.default(target);
        container_1.default.addSingleton(service, new factory_1.default(target, true));
    };
}
exports.SingletonService = SingletonService;

//# sourceMappingURL=singletonService.js.map
