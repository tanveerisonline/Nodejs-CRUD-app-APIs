"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopMetric = exports.BaseMetric = exports.Span = void 0;
var Span = /** @class */ (function () {
    function Span(metric, name, startTime) {
        this._dur = 0;
        this._level = 0;
        this._metric = metric;
        this.name = name;
        this.startTime = startTime || new Date();
    }
    Span.prototype.end = function (endTime) {
        this.endTime = endTime ? endTime : new Date();
        this._dur += this.endTime.getTime() - this.startTime.getTime();
        this._metric._incGroup(this.name, this._dur);
        this._metric = null;
    };
    Span.prototype._pause = function () {
        if (this._paused()) {
            return;
        }
        var now = new Date();
        this._dur += now.getTime() - this.startTime.getTime();
        this.startTime = null;
    };
    Span.prototype._resume = function () {
        if (!this._paused()) {
            return;
        }
        this.startTime = new Date();
    };
    Span.prototype._paused = function () {
        return this.startTime == null;
    };
    return Span;
}());
exports.Span = Span;
var BaseMetric = /** @class */ (function () {
    function BaseMetric() {
        this._spans = {};
        this._groups = {};
        this.startTime = new Date();
    }
    BaseMetric.prototype.end = function (endTime) {
        if (!this.endTime) {
            this.endTime = endTime || new Date();
        }
    };
    BaseMetric.prototype.isRecording = function () {
        return true;
    };
    BaseMetric.prototype.startSpan = function (name, startTime) {
        var span = this._spans[name];
        if (span) {
            span._level++;
        }
        else {
            span = new Span(this, name, startTime);
            this._spans[name] = span;
        }
    };
    BaseMetric.prototype.endSpan = function (name, endTime) {
        var span = this._spans[name];
        if (!span) {
            console.error('airbrake: span=%s does not exist', name);
            return;
        }
        if (span._level > 0) {
            span._level--;
        }
        else {
            span.end(endTime);
            delete this._spans[span.name];
        }
    };
    BaseMetric.prototype._incGroup = function (name, ms) {
        this._groups[name] = (this._groups[name] || 0) + ms;
    };
    BaseMetric.prototype._duration = function () {
        if (!this.endTime) {
            this.endTime = new Date();
        }
        return this.endTime.getTime() - this.startTime.getTime();
    };
    return BaseMetric;
}());
exports.BaseMetric = BaseMetric;
var NoopMetric = /** @class */ (function () {
    function NoopMetric() {
    }
    NoopMetric.prototype.isRecording = function () {
        return false;
    };
    NoopMetric.prototype.startSpan = function (_name, _startTime) { };
    NoopMetric.prototype.endSpan = function (_name, _startTime) { };
    NoopMetric.prototype._incGroup = function (_name, _ms) { };
    return NoopMetric;
}());
exports.NoopMetric = NoopMetric;
//# sourceMappingURL=metrics.js.map