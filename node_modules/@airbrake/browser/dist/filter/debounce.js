"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDebounceFilter = void 0;
function makeDebounceFilter() {
    var lastNoticeJSON;
    var timeout;
    return function (notice) {
        var s = JSON.stringify(notice.errors);
        if (s === lastNoticeJSON) {
            return null;
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        lastNoticeJSON = s;
        timeout = setTimeout(function () {
            lastNoticeJSON = '';
        }, 1000);
        return notice;
    };
}
exports.makeDebounceFilter = makeDebounceFilter;
//# sourceMappingURL=debounce.js.map