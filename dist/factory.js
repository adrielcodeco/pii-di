"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceInstanceFactory = (function () {
    function ServiceInstanceFactory(type, lazyInstance, maker) {
        if (lazyInstance === void 0) { lazyInstance = false; }
        if (maker === void 0) { maker = undefined; }
        if (type) {
            this.type = type;
        }
        this.lazyInstance = lazyInstance;
        this._maker = maker;
    }
    ServiceInstanceFactory.prototype.newInstance = function () {
        if (!this.lazyInstance || !this._instance) {
            if (this._maker) {
                this._instance = this._maker();
            }
            else {
                var Type = this.type;
                this._instance = new Type();
            }
        }
        return this._instance;
    };
    return ServiceInstanceFactory;
}());
exports.default = ServiceInstanceFactory;

//# sourceMappingURL=factory.js.map
