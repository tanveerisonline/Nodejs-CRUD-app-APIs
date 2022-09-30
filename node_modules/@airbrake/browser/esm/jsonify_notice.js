var FILTERED = '[Filtered]';
var MAX_OBJ_LENGTH = 128;
// jsonifyNotice serializes notice to JSON and truncates params,
// environment and session keys.
export function jsonifyNotice(notice, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.maxLength, maxLength = _c === void 0 ? 64000 : _c, _d = _b.keysBlocklist, keysBlocklist = _d === void 0 ? [] : _d;
    if (notice.errors) {
        for (var i = 0; i < notice.errors.length; i++) {
            var t = new Truncator({ keysBlocklist: keysBlocklist });
            notice.errors[i] = t.truncate(notice.errors[i]);
        }
    }
    var s = '';
    var keys = ['context', 'params', 'environment', 'session'];
    for (var level = 0; level < 8; level++) {
        var opts = { level: level, keysBlocklist: keysBlocklist };
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var obj = notice[key];
            if (obj) {
                notice[key] = truncate(obj, opts);
            }
        }
        s = JSON.stringify(notice);
        if (s.length < maxLength) {
            return s;
        }
    }
    var params = {
        json: s.slice(0, Math.floor(maxLength / 2)) + '...',
    };
    keys.push('errors');
    for (var _e = 0, keys_2 = keys; _e < keys_2.length; _e++) {
        var key = keys_2[_e];
        var obj = notice[key];
        if (!obj) {
            continue;
        }
        s = JSON.stringify(obj);
        params[key] = s.length;
    }
    var err = new Error("airbrake: notice exceeds max length and can't be truncated");
    err.params = params;
    throw err;
}
function scale(num, level) {
    return num >> level || 1;
}
var Truncator = /** @class */ (function () {
    function Truncator(opts) {
        this.maxStringLength = 1024;
        this.maxObjectLength = MAX_OBJ_LENGTH;
        this.maxArrayLength = MAX_OBJ_LENGTH;
        this.maxDepth = 8;
        this.keys = [];
        this.keysBlocklist = [];
        this.seen = [];
        var level = opts.level || 0;
        this.keysBlocklist = opts.keysBlocklist || [];
        this.maxStringLength = scale(this.maxStringLength, level);
        this.maxObjectLength = scale(this.maxObjectLength, level);
        this.maxArrayLength = scale(this.maxArrayLength, level);
        this.maxDepth = scale(this.maxDepth, level);
    }
    Truncator.prototype.truncate = function (value, key, depth) {
        if (key === void 0) { key = ''; }
        if (depth === void 0) { depth = 0; }
        if (value === null || value === undefined) {
            return value;
        }
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'function':
                return value;
            case 'string':
                return this.truncateString(value);
            case 'object':
                break;
            default:
                return this.truncateString(String(value));
        }
        if (value instanceof String) {
            return this.truncateString(value.toString());
        }
        if (value instanceof Boolean ||
            value instanceof Number ||
            value instanceof Date ||
            value instanceof RegExp) {
            return value;
        }
        if (value instanceof Error) {
            return this.truncateString(value.toString());
        }
        if (this.seen.indexOf(value) >= 0) {
            return "[Circular " + this.getPath(value) + "]";
        }
        var type = objectType(value);
        depth++;
        if (depth > this.maxDepth) {
            return "[Truncated " + type + "]";
        }
        this.keys.push(key);
        this.seen.push(value);
        switch (type) {
            case 'Array':
                return this.truncateArray(value, depth);
            case 'Object':
                return this.truncateObject(value, depth);
            default:
                var saved = this.maxDepth;
                this.maxDepth = 0;
                var obj = this.truncateObject(value, depth);
                obj.__type = type;
                this.maxDepth = saved;
                return obj;
        }
    };
    Truncator.prototype.getPath = function (value) {
        var index = this.seen.indexOf(value);
        var path = [this.keys[index]];
        for (var i = index; i >= 0; i--) {
            var sub = this.seen[i];
            if (sub && getAttr(sub, path[0]) === value) {
                value = sub;
                path.unshift(this.keys[i]);
            }
        }
        return '~' + path.join('.');
    };
    Truncator.prototype.truncateString = function (s) {
        if (s.length > this.maxStringLength) {
            return s.slice(0, this.maxStringLength) + '...';
        }
        return s;
    };
    Truncator.prototype.truncateArray = function (arr, depth) {
        if (depth === void 0) { depth = 0; }
        var length = 0;
        var dst = [];
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            dst.push(this.truncate(el, i.toString(), depth));
            length++;
            if (length >= this.maxArrayLength) {
                break;
            }
        }
        return dst;
    };
    Truncator.prototype.truncateObject = function (obj, depth) {
        if (depth === void 0) { depth = 0; }
        var length = 0;
        var dst = {};
        for (var key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            if (isBlocklisted(key, this.keysBlocklist)) {
                dst[key] = FILTERED;
                continue;
            }
            var value = getAttr(obj, key);
            if (value === undefined || typeof value === 'function') {
                continue;
            }
            dst[key] = this.truncate(value, key, depth);
            length++;
            if (length >= this.maxObjectLength) {
                break;
            }
        }
        return dst;
    };
    return Truncator;
}());
export function truncate(value, opts) {
    if (opts === void 0) { opts = {}; }
    var t = new Truncator(opts);
    return t.truncate(value);
}
function getAttr(obj, attr) {
    // Ignore browser specific exception trying to read an attribute (#79).
    try {
        return obj[attr];
    }
    catch (_) {
        return;
    }
}
function objectType(obj) {
    var s = Object.prototype.toString.apply(obj);
    return s.slice('[object '.length, -1);
}
function isBlocklisted(key, keysBlocklist) {
    for (var _i = 0, keysBlocklist_1 = keysBlocklist; _i < keysBlocklist_1.length; _i++) {
        var v = keysBlocklist_1[_i];
        if (v === key) {
            return true;
        }
        if (v instanceof RegExp) {
            if (key.match(v)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=jsonify_notice.js.map