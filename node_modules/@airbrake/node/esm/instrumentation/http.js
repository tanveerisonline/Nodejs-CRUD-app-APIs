var SPAN_NAME = 'http';
export function patch(http, airbrake) {
    if (http.request) {
        http.request = wrapRequest(http.request, airbrake);
    }
    if (http.get) {
        http.get = wrapRequest(http.get, airbrake);
    }
}
export function wrapRequest(origFn, airbrake) {
    return function abRequest() {
        var metric = airbrake.scope().routeMetric();
        metric.startSpan(SPAN_NAME);
        var req = origFn.apply(this, arguments);
        if (!metric.isRecording()) {
            return req;
        }
        var origEmit = req.emit;
        req.emit = function (type, _res) {
            if (type === 'response') {
                metric.endSpan(SPAN_NAME);
            }
            return origEmit.apply(this, arguments);
        };
        return req;
    };
}
//# sourceMappingURL=http.js.map