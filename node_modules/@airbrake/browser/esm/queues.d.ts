import { Requester } from './http_req';
import { BaseMetric } from './metrics';
import { IOptions } from './options';
import { TDigestStatGroups } from './tdshared';
export declare class QueueMetric extends BaseMetric {
    queue: string;
    constructor(queue: string);
}
export declare class QueuesStats {
    _opt: IOptions;
    _url: string;
    _requester: Requester;
    _m: {
        [key: string]: TDigestStatGroups;
    };
    _timer: any;
    constructor(opt: IOptions);
    notify(q: QueueMetric): void;
    _flush(): void;
}
//# sourceMappingURL=queues.d.ts.map