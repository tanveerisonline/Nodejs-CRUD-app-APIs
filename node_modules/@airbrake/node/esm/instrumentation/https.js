import { wrapRequest } from './http';
export function patch(https, airbrake) {
    if (https.request) {
        https.request = wrapRequest(https.request, airbrake);
    }
    if (https.get) {
        https.get = wrapRequest(https.get, airbrake);
    }
}
//# sourceMappingURL=https.js.map