"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var container_1 = __importDefault(require("../container"));
var injectLogic_1 = __importDefault(require("./injectLogic"));
function InjectMany(identifier) {
    return injectLogic_1.default(function (identifier) {
        if (container_1.default.has(identifier)) {
            return container_1.default.getServices(identifier);
        }
        return undefined;
    }, identifier);
}
exports.InjectMany = InjectMany;

//# sourceMappingURL=injectMany.js.map
