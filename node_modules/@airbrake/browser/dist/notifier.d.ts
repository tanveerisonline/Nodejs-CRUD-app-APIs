/// <reference types="promise-polyfill" />
import { BaseNotifier } from './base_notifier';
import { INotice } from './notice';
import { IInstrumentationOptions, IOptions } from './options';
interface ITodo {
    err: any;
    resolve: (notice: INotice) => void;
    reject: (err: Error) => void;
}
export declare class Notifier extends BaseNotifier {
    protected offline: boolean;
    protected todo: ITodo[];
    _ignoreWindowError: number;
    _ignoreNextXHR: number;
    constructor(opt: IOptions);
    _instrument(opt?: IInstrumentationOptions): void;
    notify(err: any): Promise<INotice>;
    protected onOnline(): void;
    protected onOffline(): void;
    protected onUnhandledrejection(e: any): void;
    onerror(message: string, filename?: string, line?: number, column?: number, err?: Error): void;
    _ignoreNextWindowError(): void;
}
export {};
//# sourceMappingURL=notifier.d.ts.map