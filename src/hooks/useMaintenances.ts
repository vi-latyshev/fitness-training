import { DEFAULT_PAGINATION_LIMIT, usePagination } from './usePagination';

import type { EngineId } from '@/lib/models/engine';
import type { UsePaginationResult } from './usePagination';
import type { Maintenance } from '@/lib/models/maintenance';

export const useMaintenances = (
    engineId: EngineId,
    limit: number = DEFAULT_PAGINATION_LIMIT
): UsePaginationResult<Maintenance, Maintenance> => {
    const pagination = usePagination<Maintenance>(
        typeof engineId === 'string' ? `/api/engines/${engineId}/maintenances` : null,
        { limit }
    );

    return pagination;
};
