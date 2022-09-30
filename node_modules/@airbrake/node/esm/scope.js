import { Scope } from '@airbrake/browser';
import * as asyncHooks from 'async_hooks';
export { Scope };
var ScopeManager = /** @class */ (function () {
    function ScopeManager() {
        this._scopes = {};
        this._asyncHook = asyncHooks
            .createHook({
            init: this._init.bind(this),
            destroy: this._destroy.bind(this),
            promiseResolve: this._destroy.bind(this),
        })
            .enable();
    }
    ScopeManager.prototype.setActive = function (scope) {
        var eid = asyncHooks.executionAsyncId();
        this._scopes[eid] = scope;
    };
    ScopeManager.prototype.active = function () {
        var eid = asyncHooks.executionAsyncId();
        return this._scopes[eid];
    };
    ScopeManager.prototype._init = function (aid) {
        this._scopes[aid] = this._scopes[asyncHooks.executionAsyncId()];
    };
    ScopeManager.prototype._destroy = function (aid) {
        delete this._scopes[aid];
    };
    return ScopeManager;
}());
export { ScopeManager };
//# sourceMappingURL=scope.js.map