import { useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { Button } from 'components/controls';

import type { UsePaginationResult } from 'hooks/usePagination';
import type { Pagination } from 'lib/api/redis/types';

interface TablePaginationProps<T, Additional> extends UsePaginationResult<T, Additional> { }

export const TablePagination = <T extends Object, Additional = null>({
    query,
    error,
    isLoading,
    total,
    page,
    pages,
    handleChangeQuery,
}: TablePaginationProps<T, Additional>) => {
    const handlePrevList = useCallback(() => {
        handleChangeQuery({
            offset: (page - 2) * (query.limit ?? 1),
        } as Pagination<T, Additional>);
    }, [page, query.limit]);

    const handleNextList = useCallback(() => {
        handleChangeQuery({
            offset: page * (query.limit ?? 1),
        } as Pagination<T, Additional>);
    }, [page, query.limit]);

    return (
        <div className="flex flex-row justify-end items-center space-x-8 mb-3">
            <div>Всего: {total}</div>
            <div>Cтраница {page} / {pages}</div>
            <div className="flex flex-row space-x-2">
                <Button
                    disabled={page === 1 || !!error || isLoading}
                    variant="soft"
                    Icon={<ChevronLeftIcon />}
                    onClick={handlePrevList}
                />
                <Button
                    disabled={page === pages || !!error || isLoading}
                    variant="soft"
                    Icon={<ChevronRightIcon />}
                    onClick={handleNextList}
                />
            </div>
        </div>
    );
};
