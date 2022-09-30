import * as request_lib from 'request';
import { Requester } from './api';
declare type requestAPI = request_lib.RequestAPI<request_lib.Request, request_lib.CoreOptions, request_lib.RequiredUriUrl>;
export declare function makeRequester(api: requestAPI): Requester;
export {};
//# sourceMappingURL=node.d.ts.map