"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequester = void 0;
var promise_polyfill_1 = __importDefault(require("promise-polyfill"));
var api_1 = require("./api");
function makeRequester(api) {
    return function (req) {
        return request(req, api);
    };
}
exports.makeRequester = makeRequester;
var rateLimitReset = 0;
function request(req, api) {
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        return promise_polyfill_1.default.reject(api_1.errors.ipRateLimited);
    }
    return new promise_polyfill_1.default(function (resolve, reject) {
        api({
            url: req.url,
            method: req.method,
            body: req.body,
            headers: {
                'content-type': 'application/json',
            },
            timeout: req.timeout,
        }, function (error, resp, body) {
            if (error) {
                reject(error);
                return;
            }
            if (!resp.statusCode) {
                error = new Error("airbrake: request: response statusCode is " + resp.statusCode);
                reject(error);
                return;
            }
            if (resp.statusCode === 401) {
                reject(api_1.errors.unauthorized);
                return;
            }
            if (resp.statusCode === 429) {
                reject(api_1.errors.ipRateLimited);
                var h = resp.headers['x-ratelimit-delay'];
                if (!h) {
                    return;
                }
                var s = void 0;
                if (typeof h === 'string') {
                    s = h;
                }
                else if (h instanceof Array) {
                    s = h[0];
                }
                else {
                    return;
                }
                var n = parseInt(s, 10);
                if (n > 0) {
                    rateLimitReset = Date.now() / 1000 + n;
                }
                return;
            }
            if (resp.statusCode === 204) {
                resolve({ json: null });
                return;
            }
            if (resp.statusCode >= 200 && resp.statusCode < 300) {
                var json = void 0;
                try {
                    json = JSON.parse(body);
                }
                catch (err) {
                    reject(err);
                    return;
                }
                resolve(json);
                return;
            }
            if (resp.statusCode >= 400 && resp.statusCode < 500) {
                var json = void 0;
                try {
                    json = JSON.parse(body);
                }
                catch (err) {
                    reject(err);
                    return;
                }
                error = new Error(json.message);
                reject(error);
                return;
            }
            body = body.trim();
            error = new Error("airbrake: node: unexpected response: code=" + resp.statusCode + " body='" + body + "'");
            reject(error);
        });
    });
}
//# sourceMappingURL=node.js.map