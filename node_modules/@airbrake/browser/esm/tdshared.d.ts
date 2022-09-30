export declare let hasTdigest: boolean;
interface ITDigestCentroids {
    mean: number[];
    count: number[];
}
export declare class TDigestStat {
    count: number;
    sum: number;
    sumsq: number;
    _td: any;
    add(ms: number): void;
    toJSON(): {
        count: number;
        sum: number;
        sumsq: number;
        tdigestCentroids: ITDigestCentroids;
    };
}
export declare class TDigestStatGroups extends TDigestStat {
    groups: {
        [key: string]: TDigestStat;
    };
    addGroups(totalMs: number, groups: {
        [key: string]: number;
    }): void;
    addGroup(name: string, ms: number): void;
    toJSON(): {
        count: number;
        sum: number;
        sumsq: number;
        tdigestCentroids: ITDigestCentroids;
        groups: {
            [key: string]: TDigestStat;
        };
    };
}
export {};
//# sourceMappingURL=tdshared.d.ts.map