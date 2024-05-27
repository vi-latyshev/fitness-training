import { usePagination } from './usePagination';

import type { Pagination } from '@/lib/api/redis/types';
import type { EngineId } from '@/lib/models/engine';
import type { UsePaginationResult } from './usePagination';
import type { Maintenance } from '@/lib/models/maintenance';

export const useMaintenances = (
    engineId: EngineId,
    paginationParams?: Pagination<Maintenance>,
): UsePaginationResult<Maintenance, Maintenance> => {
    const pagination = usePagination<Maintenance>(
        typeof engineId === 'string' ? `/api/engines/${engineId}/maintenances` : null,
        { order: 'DESC', ...paginationParams }
    );

    return pagination;
};
