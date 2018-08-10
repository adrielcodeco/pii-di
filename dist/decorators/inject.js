"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("../container");
const injectLogic_1 = require("./injectLogic");
function Inject(identifier) {
    return injectLogic_1.default(container_1.default.get, identifier);
}
exports.Inject = Inject;

//# sourceMappingURL=inject.js.map
