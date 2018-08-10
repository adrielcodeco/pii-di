"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceInstanceFactory {
    constructor(type, lazyInstance = false, maker = undefined) {
        if (type) {
            this.type = type;
        }
        this.lazyInstance = lazyInstance;
        this._maker = maker;
    }
    newInstance() {
        if (!this.lazyInstance || !this._instance) {
            if (this._maker) {
                this._instance = this._maker();
            }
            else {
                const Type = this.type;
                this._instance = new Type();
            }
        }
        return this._instance;
    }
}
exports.default = ServiceInstanceFactory;

//# sourceMappingURL=factory.js.map
