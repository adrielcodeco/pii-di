"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../container");
const token_1 = require("../token");
function ScopeService(id) {
    return function (target) {
        const service = id || token_1.default(target);
        container_1.default.addScoped(service, target);
    };
}
exports.ScopeService = ScopeService;

//# sourceMappingURL=scopeService.js.map
