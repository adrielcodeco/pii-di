"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __importDefault(require("./container"));
var container_2 = require("./container");
exports.Container = container_2.default;
var token_1 = require("./token");
exports.Token = token_1.default;
__export(require("./decorators"));
var containerKey = '(@pii/di).filename';
var containers = container_1.default.getServices(containerKey);
if (!containers.includes(__filename)) {
    container_1.default.addTransient(containerKey, __filename);
}

//# sourceMappingURL=index.js.map
