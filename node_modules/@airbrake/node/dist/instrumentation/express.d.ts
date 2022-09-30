import { Notifier } from '../notifier';
export declare function makeMiddleware(airbrake: Notifier): (req: any, res: any, next: any) => void;
export declare function makeErrorHandler(airbrake: Notifier): (err: Error, req: any, _res: any, next: any) => void;
//# sourceMappingURL=express.d.ts.map