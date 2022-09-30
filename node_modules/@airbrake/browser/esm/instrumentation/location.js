var lastLocation = '';
// In some environments (i.e. Cypress) document.location may sometimes be null
function getCurrentLocation() {
    return document.location && document.location.pathname;
}
export function instrumentLocation(notifier) {
    lastLocation = getCurrentLocation();
    var oldFn = window.onpopstate;
    window.onpopstate = function abOnpopstate(_event) {
        var url = getCurrentLocation();
        if (url) {
            recordLocation(notifier, url);
        }
        if (oldFn) {
            return oldFn.apply(this, arguments);
        }
    };
    var oldPushState = history.pushState;
    history.pushState = function abPushState(_state, _title, url) {
        if (url) {
            recordLocation(notifier, url.toString());
        }
        oldPushState.apply(this, arguments);
    };
}
function recordLocation(notifier, url) {
    var index = url.indexOf('://');
    if (index >= 0) {
        url = url.slice(index + 3);
        index = url.indexOf('/');
        url = index >= 0 ? url.slice(index) : '/';
    }
    else if (url.charAt(0) !== '/') {
        url = '/' + url;
    }
    notifier.scope().pushHistory({
        type: 'location',
        from: lastLocation,
        to: url,
    });
    lastLocation = url;
}
//# sourceMappingURL=location.js.map