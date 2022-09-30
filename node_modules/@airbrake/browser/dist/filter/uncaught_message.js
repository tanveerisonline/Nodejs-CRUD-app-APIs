"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncaughtMessageFilter = void 0;
var re = new RegExp([
    '^',
    'Uncaught\\s',
    '(.+?)',
    ':\\s',
    '(.+)',
    '$',
].join(''));
function uncaughtMessageFilter(notice) {
    var err = notice.errors[0];
    if (err.type !== '' && err.type !== 'Error') {
        return notice;
    }
    var m = err.message.match(re);
    if (m !== null) {
        err.type = m[1];
        err.message = m[2];
    }
    return notice;
}
exports.uncaughtMessageFilter = uncaughtMessageFilter;
//# sourceMappingURL=uncaught_message.js.map