"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("../container");
const injectLogic_1 = require("./injectLogic");
function InjectMany(option) {
    return injectLogic_1.default(container_1.default.getServices, option);
}
exports.InjectMany = InjectMany;

//# sourceMappingURL=injectMany.js.map
