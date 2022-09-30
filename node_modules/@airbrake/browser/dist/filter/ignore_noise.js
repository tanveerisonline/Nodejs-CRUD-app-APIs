"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreNoiseFilter = void 0;
var IGNORED_MESSAGES = [
    'Script error',
    'Script error.',
    'InvalidAccessError',
];
function ignoreNoiseFilter(notice) {
    var err = notice.errors[0];
    if (err.type === '' && IGNORED_MESSAGES.indexOf(err.message) !== -1) {
        return null;
    }
    if (err.backtrace && err.backtrace.length > 0) {
        var frame = err.backtrace[0];
        if (frame.file === '<anonymous>') {
            return null;
        }
    }
    return notice;
}
exports.ignoreNoiseFilter = ignoreNoiseFilter;
//# sourceMappingURL=ignore_noise.js.map