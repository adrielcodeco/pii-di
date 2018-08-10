import { Nullable, Class } from '@pii/utils';
declare type Identifier<T> = string | Symbol | Class<T> | Function;
export declare type Maker<T> = (() => T);
export declare type Factory<T> = {
    service: string | Symbol | Class<T>;
    maker: Maker<T>;
};
export default class Container {
    static has<T>(identifier: Identifier<T>): boolean;
    static get<T>(identifier: Identifier<T>): Nullable<T>;
    static getServices<T>(identifier: Identifier<T>): T[];
    static add<T>(service: Identifier<T>, value: T | any): void;
    static addScoped<T>(factory: Factory<T>): void;
    static addScoped<T>(service: Identifier<T>, value?: T | any): void;
    static addTransient<T>(factory: Factory<T>): void;
    static addTransient<T>(service: Identifier<T>, value?: T | any): void;
    static addSingleton<T>(service: Identifier<T>, value: T | any, replace?: boolean): void;
    static removeScoped<T>(service: Identifier<T>): boolean;
    static removeTransient<T>(service: Identifier<T>): boolean;
    static removeSingleton<T>(service: Identifier<T>): boolean;
}
export {};
//# sourceMappingURL=container.d.ts.map