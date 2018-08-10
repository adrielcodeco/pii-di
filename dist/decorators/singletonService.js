"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container");
const factory_1 = require("../factory");
const token_1 = require("../token");
function SingletonService(id) {
    return function (target) {
        const service = id || token_1.default(target);
        container_1.default.addSingleton(service, new factory_1.default(target, true));
    };
}
exports.SingletonService = SingletonService;

//# sourceMappingURL=singletonService.js.map
