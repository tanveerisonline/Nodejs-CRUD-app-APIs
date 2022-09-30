"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentXHR = void 0;
function instrumentXHR(notifier) {
    function recordReq(req) {
        var state = req.__state;
        state.statusCode = req.status;
        state.duration = new Date().getTime() - state.date.getTime();
        notifier.scope().pushHistory(state);
    }
    var oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function abOpen(method, url, _async, _user, _password) {
        if (notifier._ignoreNextXHR === 0) {
            this.__state = {
                type: 'xhr',
                method: method,
                url: url,
            };
        }
        oldOpen.apply(this, arguments);
    };
    var oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function abSend(_data) {
        var oldFn = this.onreadystatechange;
        this.onreadystatechange = function (_ev) {
            if (this.readyState === 4 && this.__state) {
                recordReq(this);
            }
            if (oldFn) {
                return oldFn.apply(this, arguments);
            }
        };
        if (this.__state) {
            this.__state.date = new Date();
        }
        return oldSend.apply(this, arguments);
    };
}
exports.instrumentXHR = instrumentXHR;
//# sourceMappingURL=xhr.js.map