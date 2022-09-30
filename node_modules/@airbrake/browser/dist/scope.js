"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
var metrics_1 = require("./metrics");
var Scope = /** @class */ (function () {
    function Scope() {
        this._noopMetric = new metrics_1.NoopMetric();
        this._context = {};
        this._historyMaxLen = 20;
        this._history = [];
    }
    Scope.prototype.clone = function () {
        var clone = new Scope();
        clone._context = __assign({}, this._context);
        clone._history = this._history.slice();
        return clone;
    };
    Scope.prototype.setContext = function (context) {
        this._context = __assign(__assign({}, this._context), context);
    };
    Scope.prototype.context = function () {
        var ctx = __assign({}, this._context);
        if (this._history.length > 0) {
            ctx.history = this._history.slice();
        }
        return ctx;
    };
    Scope.prototype.pushHistory = function (state) {
        if (this._isDupState(state)) {
            if (this._lastRecord.num) {
                this._lastRecord.num++;
            }
            else {
                this._lastRecord.num = 2;
            }
            return;
        }
        if (!state.date) {
            state.date = new Date();
        }
        this._history.push(state);
        this._lastRecord = state;
        if (this._history.length > this._historyMaxLen) {
            this._history = this._history.slice(-this._historyMaxLen);
        }
    };
    Scope.prototype._isDupState = function (state) {
        if (!this._lastRecord) {
            return false;
        }
        for (var key in state) {
            if (!state.hasOwnProperty(key) || key === 'date') {
                continue;
            }
            if (state[key] !== this._lastRecord[key]) {
                return false;
            }
        }
        return true;
    };
    Scope.prototype.routeMetric = function () {
        return this._routeMetric || this._noopMetric;
    };
    Scope.prototype.setRouteMetric = function (metric) {
        this._routeMetric = metric;
    };
    Scope.prototype.queueMetric = function () {
        return this._queueMetric || this._noopMetric;
    };
    Scope.prototype.setQueueMetric = function (metric) {
        this._queueMetric = metric;
    };
    return Scope;
}());
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map