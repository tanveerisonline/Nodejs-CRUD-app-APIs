"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentFetch = void 0;
function instrumentFetch(notifier) {
    // tslint:disable-next-line:no-this-assignment
    var oldFetch = window.fetch;
    window.fetch = function (req, options) {
        var state = {
            type: 'xhr',
            date: new Date(),
        };
        state.method = options && options.method ? options.method : 'GET';
        if (typeof req === 'string') {
            state.url = req;
        }
        else {
            state.method = req.method;
            state.url = req.url;
        }
        // Some platforms (e.g. react-native) implement fetch via XHR.
        notifier._ignoreNextXHR++;
        setTimeout(function () { return notifier._ignoreNextXHR--; });
        return oldFetch
            .apply(this, arguments)
            .then(function (resp) {
            state.statusCode = resp.status;
            state.duration = new Date().getTime() - state.date.getTime();
            notifier.scope().pushHistory(state);
            return resp;
        })
            .catch(function (err) {
            state.error = err;
            state.duration = new Date().getTime() - state.date.getTime();
            notifier.scope().pushHistory(state);
            throw err;
        });
    };
}
exports.instrumentFetch = instrumentFetch;
//# sourceMappingURL=fetch.js.map