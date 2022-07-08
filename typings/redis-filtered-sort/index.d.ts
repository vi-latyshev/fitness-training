declare module 'redis-filtered-sort' {
    export function attach(redis: Redis | Cluster, name?: string, useSnakeCase = false): void;
    export function filter(obj: RedisFSortRawFilter): string;
    export type WithFsort = {
        fsort(
            idSet: string,
            meta: string,
            hashKey?: string,
            order?: 'ASC' | 'DESC',
            filter?: string,
            curTime: number,
            offset?: number,
            limit?: number,
            expiration?: number,
        ): Promise<[...string[], number]>;

        fsort(
            idSet: string,
            meta: string,
            hashKey?: string,
            order?: 'ASC' | 'DESC',
            filter?: string,
            curTime: number,
            offset?: number,
            limit?: number,
            expiration?: number,
            returnKeyOnly: true,
        ): Promise<string>;
    };

    export type WithFAggregate = {
        fsortAggregate(
            idListKey: string,
            meta: string,
            aggregates: string,
        );
    };

    export type WithFListBust = {
        fsortBust(
            idSet: string,
            curTime: number,
            expiration?: number,
        );
    };
}
