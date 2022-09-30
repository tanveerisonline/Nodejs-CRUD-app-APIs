"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentDOM = void 0;
var elemAttrs = ['type', 'name', 'src'];
function instrumentDOM(notifier) {
    var handler = makeEventHandler(notifier);
    if (window.addEventListener) {
        window.addEventListener('load', handler);
        window.addEventListener('error', function (event) {
            if (getProp(event, 'error')) {
                return;
            }
            handler(event);
        }, true);
    }
    if (typeof document === 'object' && document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler);
        document.addEventListener('click', handler);
        document.addEventListener('keypress', handler);
    }
}
exports.instrumentDOM = instrumentDOM;
function makeEventHandler(notifier) {
    return function (event) {
        var target = getProp(event, 'target');
        if (!target) {
            return;
        }
        var state = { type: event.type };
        try {
            state.target = elemPath(target);
        }
        catch (err) {
            state.target = "<" + String(err) + ">";
        }
        notifier.scope().pushHistory(state);
    };
}
function elemName(elem) {
    if (!elem) {
        return '';
    }
    var s = [];
    if (elem.tagName) {
        s.push(elem.tagName.toLowerCase());
    }
    if (elem.id) {
        s.push('#');
        s.push(elem.id);
    }
    if (elem.classList && Array.from) {
        s.push('.');
        s.push(Array.from(elem.classList).join('.'));
    }
    else if (elem.className) {
        var str = classNameString(elem.className);
        if (str !== '') {
            s.push('.');
            s.push(str);
        }
    }
    if (elem.getAttribute) {
        for (var _i = 0, elemAttrs_1 = elemAttrs; _i < elemAttrs_1.length; _i++) {
            var attr = elemAttrs_1[_i];
            var value = elem.getAttribute(attr);
            if (value) {
                s.push("[" + attr + "=\"" + value + "\"]");
            }
        }
    }
    return s.join('');
}
function classNameString(name) {
    if (name.split) {
        return name.split(' ').join('.');
    }
    if (name.baseVal && name.baseVal.split) {
        // SVGAnimatedString
        return name.baseVal.split(' ').join('.');
    }
    console.error('unsupported HTMLElement.className type', typeof name);
    return '';
}
function elemPath(elem) {
    var maxLen = 10;
    var path = [];
    var parent = elem;
    while (parent) {
        var name_1 = elemName(parent);
        if (name_1 !== '') {
            path.push(name_1);
            if (path.length > maxLen) {
                break;
            }
        }
        parent = parent.parentNode;
    }
    if (path.length === 0) {
        return String(elem);
    }
    return path.reverse().join(' > ');
}
function getProp(obj, prop) {
    try {
        return obj[prop];
    }
    catch (_) {
        // Permission denied to access property
        return null;
    }
}
//# sourceMappingURL=dom.js.map