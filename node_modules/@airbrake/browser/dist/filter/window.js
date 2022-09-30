"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowFilter = void 0;
function windowFilter(notice) {
    if (window.navigator && window.navigator.userAgent) {
        notice.context.userAgent = window.navigator.userAgent;
    }
    if (window.location) {
        notice.context.url = String(window.location);
        // Set root directory to group errors on different subdomains together.
        notice.context.rootDirectory =
            window.location.protocol + '//' + window.location.host;
    }
    return notice;
}
exports.windowFilter = windowFilter;
//# sourceMappingURL=window.js.map