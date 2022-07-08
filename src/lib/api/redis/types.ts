import type { Cluster, Redis } from 'ioredis';
import type { WithFAggregate, WithFListBust, WithFsort } from 'redis-filtered-sort';

export type RedisWithFsort = (Redis | Cluster) & WithFsort & WithFAggregate & WithFListBust;

export type RedisFSortRawFilter = {
    gte?: number;
    lte?: number;
    isempty?: boolean;
    any?: string[] | RedisFSortRawFilter[];
    some?: string[];
    exists?: boolean;
    match?: string;
};

export type RedisFSortFilter<T> = {
    '#multi'?: {
        fields: (keyof T)[];
        match: string;
    };
};

export type PaginationOrderType = 'ASC' | 'DESC' | undefined;

export type Pagination<T> = {
    filter?: RedisFSortFilter<T> & {
        [key in keyof T]?: string | RedisFSortRawFilter;
    };
    sortBy?: string;
    order?: PaginationOrderType;
    offset?: number;
    limit?: number;
    expiration?: number;
};

export type PaginationResp<T> = {
    items: T[];
    cursor: number;
    page: number;
    pages: number;
    total: number;
};
