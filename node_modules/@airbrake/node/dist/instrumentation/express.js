"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeErrorHandler = exports.makeMiddleware = void 0;
function makeMiddleware(airbrake) {
    return function airbrakeMiddleware(req, res, next) {
        var _a, _b, _c;
        var route = (_c = (_b = (_a = req.route) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 'UNKNOWN';
        var metric = airbrake.routes.start(req.method, route);
        if (!metric.isRecording()) {
            next();
            return;
        }
        var origEnd = res.end;
        res.end = function abEnd() {
            var _a, _b, _c;
            metric.route = (_c = (_b = (_a = req.route) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 'UNKNOWN';
            metric.statusCode = res.statusCode;
            metric.contentType = res.get('Content-Type');
            airbrake.routes.notify(metric);
            return origEnd.apply(this, arguments);
        };
        next();
    };
}
exports.makeMiddleware = makeMiddleware;
function makeErrorHandler(airbrake) {
    return function airbrakeErrorHandler(err, req, _res, next) {
        var url = req.protocol + '://' + req.headers.host + req.originalUrl;
        var notice = {
            error: err,
            context: {
                userAddr: req.ip,
                userAgent: req.headers['user-agent'],
                url: url,
                httpMethod: req.method,
                component: 'express',
            },
        };
        if (req.route) {
            if (req.route.path) {
                notice.context.route = req.route.path.toString();
            }
            if (req.route.stack && req.route.stack.length) {
                notice.context.action = req.route.stack[0].name;
            }
        }
        var referer = req.headers.referer;
        if (referer) {
            notice.context.referer = referer;
        }
        airbrake.notify(notice);
        next(err);
    };
}
exports.makeErrorHandler = makeErrorHandler;
//# sourceMappingURL=express.js.map