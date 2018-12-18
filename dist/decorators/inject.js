"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var container_1 = __importDefault(require("../container"));
var injectLogic_1 = __importDefault(require("./injectLogic"));
function Inject(identifier) {
    return injectLogic_1.default(container_1.default.get, identifier);
}
exports.Inject = Inject;

//# sourceMappingURL=inject.js.map
