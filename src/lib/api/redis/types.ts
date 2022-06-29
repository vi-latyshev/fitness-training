import type { Cluster, Redis } from 'ioredis';
import type { WithFAggregate, WithFsort } from 'redis-filtered-sort';

export type RedisWithFsort = (Redis | Cluster) & WithFsort & WithFAggregate;

export type RedisFSortRawFilter = {
    gte?: number;
    lte?: number;
    isempty?: boolean;
    any?: string[] | RedisFSortRawFilter[];
    some?: string[];
    exists?: boolean;
};

export type PaginationOrderType = 'ASC' | 'DESC' | undefined;

export type Pagination<T> = {
    filter?: {
        [key in keyof T]?: string | RedisFSortRawFilter
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
