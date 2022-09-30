"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularMessageFilter = void 0;
var re = new RegExp([
    '^',
    '\\[(\\$.+)\\]',
    '\\s',
    '([\\s\\S]+)',
    '$',
].join(''));
function angularMessageFilter(notice) {
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
exports.angularMessageFilter = angularMessageFilter;
//# sourceMappingURL=angular_message.js.map