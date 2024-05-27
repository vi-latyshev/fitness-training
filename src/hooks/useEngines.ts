import { usePagination } from './usePagination';

import type { UsePaginationResult } from './usePagination';
import type { Engine } from '@/lib/models/engine';

export const useEngines = (): UsePaginationResult<Engine, Engine> => {
    const pagination = usePagination<Engine>('/api/engines');

    return pagination;
};
