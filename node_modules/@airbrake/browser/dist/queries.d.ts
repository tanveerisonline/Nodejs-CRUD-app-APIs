import { Requester } from './http_req';
import { IOptions } from './options';
import { TDigestStat } from './tdshared';
export declare class QueryInfo {
    method: string;
    route: string;
    query: string;
    func: string;
    file: string;
    line: number;
    startTime: Date;
    endTime: Date;
    constructor(query?: string);
    _duration(): number;
}
export declare class QueriesStats {
    _opt: IOptions;
    _url: string;
    _requester: Requester;
    _m: {
        [key: string]: TDigestStat;
    };
    _timer: any;
    constructor(opt: IOptions);
    start(query?: string): QueryInfo;
    notify(q: QueryInfo): void;
    _flush(): void;
}
//# sourceMappingURL=queries.d.ts.map