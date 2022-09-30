import { Requester } from './http_req';
import { BaseMetric } from './metrics';
import { IOptions } from './options';
import { TDigestStat, TDigestStatGroups } from './tdshared';
export declare class RouteMetric extends BaseMetric {
    method: string;
    route: string;
    statusCode: number;
    contentType: string;
    constructor(method?: string, route?: string, statusCode?: number, contentType?: string);
}
export declare class RoutesStats {
    _opt: IOptions;
    _url: string;
    _requester: Requester;
    _m: {
        [key: string]: TDigestStat;
    };
    _timer: any;
    constructor(opt: IOptions);
    notify(req: RouteMetric): void;
    _flush(): void;
}
export declare class RoutesBreakdowns {
    _opt: IOptions;
    _url: string;
    _requester: Requester;
    _m: {
        [key: string]: TDigestStatGroups;
    };
    _timer: any;
    constructor(opt: IOptions);
    notify(req: RouteMetric): void;
    _flush(): void;
    _responseType(req: RouteMetric): string;
}
//# sourceMappingURL=routes.d.ts.map