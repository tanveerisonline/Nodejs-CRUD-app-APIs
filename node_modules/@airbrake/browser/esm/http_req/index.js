import { request as fetchRequest } from './fetch';
import { makeRequester as makeNodeRequester } from './node';
export function makeRequester(opts) {
    if (opts.request) {
        return makeNodeRequester(opts.request);
    }
    return fetchRequest;
}
//# sourceMappingURL=index.js.map