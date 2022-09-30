var CONSOLE_METHODS = ['debug', 'log', 'info', 'warn', 'error'];
export function instrumentConsole(notifier) {
    var _loop_1 = function (m) {
        if (!(m in console)) {
            return "continue";
        }
        var oldFn = console[m];
        var newFn = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            oldFn.apply(console, args);
            notifier.scope().pushHistory({
                type: 'log',
                severity: m,
                arguments: args,
            });
        });
        newFn.inner = oldFn;
        console[m] = newFn;
    };
    // tslint:disable-next-line:no-this-assignment
    for (var _i = 0, CONSOLE_METHODS_1 = CONSOLE_METHODS; _i < CONSOLE_METHODS_1.length; _i++) {
        var m = CONSOLE_METHODS_1[_i];
        _loop_1(m);
    }
}
//# sourceMappingURL=console.js.map