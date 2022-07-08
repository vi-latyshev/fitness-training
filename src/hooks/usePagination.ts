import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import qs from 'qs';

import type { KeyedMutator } from 'swr';
import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { APIErrorJSON } from 'lib/api/error';

export interface UsePaginationResult<T, Additional = null> extends PaginationResp<T> {
    query: Pagination<T, Additional>;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<PaginationResp<T>>;
    handleChangeQuery: (query: Pagination<T, Additional>) => void;
}

const DEFAULT_LIMIT = 1;

export const usePagination = <T extends Object, Additional = null>(
    key: string,
    initialQuery: Pagination<T, Additional> = {} as Pagination<T, Additional>,
): UsePaginationResult<T, Additional> => {
    const router = useRouter();
    const [query, setQuery] = useState<Pagination<T, Additional>>({ limit: DEFAULT_LIMIT, ...initialQuery });
    const { data, error, mutate } = useSWR<PaginationResp<T>, APIErrorJSON>(`${key}?${qs.stringify(query)}`);
    console.log(data, 'data usePagination');
    console.log(error, 'data error');
    const {
        items = [],
        cursor = query.limit ?? 1,
        total = 0,
        page = 1,
        pages = 1,
    } = data ?? {};

    console.log(router, 'router');

    const handleChangeQuery = useCallback((newQuery: Pagination<T, Additional>) => {
        setQuery((currQuery) => ({
            ...currQuery,
            ...newQuery,
        }));
    }, []);

    useEffect(() => {
        router.replace({
            query: {
                ...router.query,
                ...query,
            },
        }, undefined, { shallow: true });
    }, [query]);

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
