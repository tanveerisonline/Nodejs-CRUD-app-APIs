"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequester = void 0;
var fetch_1 = require("./fetch");
var node_1 = require("./node");
function makeRequester(opts) {
    if (opts.request) {
        return node_1.makeRequester(opts.request);
    }
    return fetch_1.request;
}
exports.makeRequester = makeRequester;
//# sourceMappingURL=index.js.map