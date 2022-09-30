import { IMetric, NoopMetric } from './metrics';
interface IHistoryRecord {
    type: string;
    date?: Date;
    [key: string]: any;
}
interface IMap {
    [key: string]: any;
}
export declare class Scope {
    _noopMetric: NoopMetric;
    _routeMetric: IMetric;
    _queueMetric: IMetric;
    _context: IMap;
    _historyMaxLen: number;
    _history: IHistoryRecord[];
    _lastRecord: IHistoryRecord;
    clone(): Scope;
    setContext(context: IMap): void;
    context(): IMap;
    pushHistory(state: IHistoryRecord): void;
    private _isDupState;
    routeMetric(): IMetric;
    setRouteMetric(metric: IMetric): void;
    queueMetric(): IMetric;
    setQueueMetric(metric: IMetric): void;
}
export {};
//# sourceMappingURL=scope.d.ts.map