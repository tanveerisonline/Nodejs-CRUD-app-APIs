export interface IMetric {
    isRecording(): boolean;
    startSpan(name: string, startTime?: Date): void;
    endSpan(name: string, endTime?: Date): void;
    _incGroup(name: string, ms: number): void;
}
export declare class Span {
    _metric: IMetric;
    name: string;
    startTime: Date;
    endTime: Date;
    _dur: number;
    _level: number;
    constructor(metric: IMetric, name: string, startTime?: Date);
    end(endTime?: Date): void;
    _pause(): void;
    _resume(): void;
    _paused(): boolean;
}
export declare class BaseMetric implements IMetric {
    startTime: Date;
    endTime: Date;
    _spans: {};
    _groups: {};
    constructor();
    end(endTime?: Date): void;
    isRecording(): boolean;
    startSpan(name: string, startTime?: Date): void;
    endSpan(name: string, endTime?: Date): void;
    _incGroup(name: string, ms: number): void;
    _duration(): number;
}
export declare class NoopMetric implements IMetric {
    isRecording(): boolean;
    startSpan(_name: string, _startTime?: Date): void;
    endSpan(_name: string, _startTime?: Date): void;
    _incGroup(_name: string, _ms: number): void;
}
//# sourceMappingURL=metrics.d.ts.map