"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeManager = exports.Scope = void 0;
var browser_1 = require("@airbrake/browser");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return browser_1.Scope; } });
var asyncHooks = __importStar(require("async_hooks"));
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
exports.ScopeManager = ScopeManager;
//# sourceMappingURL=scope.js.map