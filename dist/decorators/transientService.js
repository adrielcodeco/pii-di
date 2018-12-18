"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __importDefault(require("../container"));
var token_1 = __importDefault(require("../token"));
function TransientService(id) {
    return function (target) {
        var service = id || token_1.default(target);
        container_1.default.addTransient(service, target);
    };
}
exports.TransientService = TransientService;

//# sourceMappingURL=transientService.js.map
