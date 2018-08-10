"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describe(Identifier) {
    const instance = Identifier.prototype
        ? new Identifier()
        : Identifier;
    const target = Identifier.prototype || Identifier;
    return Reflect.ownKeys(target)
        .concat(Object.keys(target))
        .concat(Object.getOwnPropertyNames(instance))
        .filter((v, i, a) => a.indexOf(v) === i && v !== 'constructor' && typeof v !== 'symbol');
}
function Token(identifier) {
    if (!identifier) {
        throw new Error('invalid token identifier');
    }
    if (typeof identifier === 'string') {
        return `Token(${identifier})`;
    }
    const keys = describe(identifier);
    return `Token(${identifier.name || ''}{${keys.join(',')}})`;
}
exports.default = Token;

//# sourceMappingURL=token.js.map
