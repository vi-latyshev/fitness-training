import { usePagination } from './usePagination';

import type { Stats } from 'lib/models/stats';

export const useStatsList = (owner: Stats['owner']) => {
    const pagination = usePagination<Stats>(typeof owner === 'string' ? `/api/stats/${owner}` : null);

    return pagination;
};
