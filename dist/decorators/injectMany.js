"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("../container");
const injectLogic_1 = require("./injectLogic");
function InjectMany(identifier) {
    return injectLogic_1.default((identifier) => {
        if (container_1.default.has(identifier)) {
            return container_1.default.getServices(identifier);
        }
        return undefined;
    }, identifier);
}
exports.InjectMany = InjectMany;

//# sourceMappingURL=injectMany.js.map
