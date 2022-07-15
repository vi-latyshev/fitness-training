import { useCallback, useState } from 'react';
import useSWR from 'swr';
import qs from 'qs';

import type { KeyedMutator } from 'swr';
import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { APIErrorJSON } from 'lib/api/error';

export interface UsePaginationResult<T> extends PaginationResp<T> {
    query: Pagination<T>;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<PaginationResp<T>>;
    handleChangeQuery: (query: Pagination<T>) => void;
}

const DEFAULT_LIMIT = 15;

export const usePagination = <T extends Object>(
    key: string | null,
    initialQuery: Pagination<T> = {},
): UsePaginationResult<T> => {
    const [query, setQuery] = useState<Pagination<T>>({ limit: DEFAULT_LIMIT, ...initialQuery });
    const { data, error, mutate } = useSWR<PaginationResp<T>, APIErrorJSON>((
        typeof key === 'string' ? `${key}?${qs.stringify(query)}` : null
    ));

    const {
        items = [],
        cursor = query.limit ?? 1,
        total = 0,
        page = 1,
        pages = 1,
    } = data ?? {};

    const handleChangeQuery = useCallback((newQuery: Pagination<T>) => {
        setQuery((currQuery) => ({
            ...currQuery,
            ...newQuery,
        }));
    }, []);

    return {
        items,
        cursor,
        total,
        page,
        pages,
        error,
        isLoading: !error && !data,
        mutate,
        query,
        handleChangeQuery,
    };
};
