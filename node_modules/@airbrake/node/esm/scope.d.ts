/// <reference types="node" />
import { Scope } from '@airbrake/browser';
import * as asyncHooks from 'async_hooks';
export { Scope };
export declare class ScopeManager {
    _asyncHook: asyncHooks.AsyncHook;
    _scopes: {
        [id: number]: Scope;
    };
    constructor();
    setActive(scope: Scope): void;
    active(): Scope;
    _init(aid: number): void;
    _destroy(aid: number): void;
}
//# sourceMappingURL=scope.d.ts.map