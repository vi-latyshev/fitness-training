import { useCallback, useState } from 'react';
import useSWR from 'swr';
import qs from 'qs';

import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { APIErrorJSON } from 'lib/api/error';

export interface UsePaginationResult<T> extends PaginationResp<T> {
    query: Pagination<T>;
    error?: APIErrorJSON;
    isLoading: boolean;
    handleChangeQuery: (query: Pagination<T>) => void;
}

export const usePagination = <T extends Object, InitQuery extends Object = {}>(
    key: string,
    initialQuery: Pagination<T> & InitQuery,
): UsePaginationResult<T> => {
    const [query, setQuery] = useState<Pagination<T>>(initialQuery);
    const { data, error } = useSWR<PaginationResp<T>, APIErrorJSON>(`${key}?${qs.stringify(query)}`);

    const {
        items = [],
        cursor = query.limit ?? 1,
        total = 0,
        page = 1,
        pages = 1,
    } = data ?? {};

    const handleChangeQuery = useCallback((newQuery: Pagination<T>) => {
        setQuery((currQuery) => ({ ...currQuery, ...newQuery }));
    }, []);

    return {
        items,
        cursor,
        total,
        page,
        pages,
        error,
        isLoading: !error && !data,
        query,
        handleChangeQuery,
    };
};
