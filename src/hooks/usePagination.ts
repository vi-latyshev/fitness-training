import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import qs from 'qs';

import type { KeyedMutator } from 'swr';
import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { APIErrorJSON } from 'lib/api/error';
import type { ParsedUrlQueryInput } from 'node:querystring';

export interface UsePaginationResult<T> extends PaginationResp<T> {
    query: Pagination<T> | null;
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
    const router = useRouter();
    const [query, setQuery] = useState<Pagination<T> | null>(null);
    const { data, error, mutate } = useSWR<PaginationResp<T>, APIErrorJSON>((
        typeof key === 'string' && query !== null ? `${key}?${qs.stringify(query)}` : null
    ));

    const {
        items = [],
        cursor = query?.limit ?? 1,
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

    useEffect(() => {
        router.replace({
            query: {
                ...router.query,
                ...query as ParsedUrlQueryInput,
            },
        }, undefined, { shallow: true });
    }, [query]);

    useEffect(() => {
        handleChangeQuery({ limit: DEFAULT_LIMIT, ...initialQuery, ...router.query });
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
