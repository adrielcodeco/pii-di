import { Nullable, Class } from '@pii/utils';
export declare type Maker<T> = (() => T);
export declare type Factory<T> = {
    service: string | Symbol | Class<T>;
    maker: Maker<T>;
};
export default class Container {
    static has<T>(identifier: string | Symbol | Class<T> | Function): boolean;
    static get<T>(identifier: string | Symbol | Class<T> | Function): Nullable<T>;
    static getServices<T>(identifier: string | Symbol | Class<T> | Function): T[];
    static add<T>(service: string | Symbol | Class<T>, value: T | any): void;
    static addScoped<T>(service: string | Symbol | Class<T>, value: T | any): void;
    static addTransient<T>(factory: Factory<T>): void;
    static addTransient<T>(service: string | Symbol | Class<T>, value?: T | any): void;
    static addSingleton<T>(service: string | Symbol | Class<T>, value: T | any, replace?: boolean): void;
    static removeScoped<T>(service: string | Symbol | Class<T>): boolean;
    static removeTransient<T>(service: string | Symbol | Class<T>): boolean;
    static removeSingleton<T>(service: string | Symbol | Class<T>): boolean;
}
//# sourceMappingURL=container.d.ts.map