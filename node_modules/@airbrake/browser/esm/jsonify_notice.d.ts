import { INotice } from './notice';
export declare function jsonifyNotice(notice: INotice, { maxLength, keysBlocklist }?: {
    maxLength?: number;
    keysBlocklist?: any[];
}): string;
interface ITruncatorOptions {
    level?: number;
    keysBlocklist?: any[];
}
export declare function truncate(value: any, opts?: ITruncatorOptions): any;
export {};
//# sourceMappingURL=jsonify_notice.d.ts.map