"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = void 0;
var http_1 = require("./http");
function patch(https, airbrake) {
    if (https.request) {
        https.request = http_1.wrapRequest(https.request, airbrake);
    }
    if (https.get) {
        https.get = http_1.wrapRequest(https.get, airbrake);
    }
}
exports.patch = patch;
//# sourceMappingURL=https.js.map