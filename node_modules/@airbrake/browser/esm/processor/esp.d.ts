import { INoticeError } from '../notice';
export interface IStackFrame {
    functionName?: string;
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
}
export interface IError extends Error, IStackFrame {
    noStack?: boolean;
}
export declare function espProcessor(err: IError): INoticeError;
//# sourceMappingURL=esp.d.ts.map