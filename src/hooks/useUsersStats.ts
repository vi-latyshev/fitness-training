import { usePagination } from './usePagination';

import type { User } from '@/lib/models/user';
import type { FetchFullStatsUserResData } from '@/lib/api/routes/users/stats';

export const useUsersStats = () => {
    const pagination = usePagination<User, FetchFullStatsUserResData>('/api/users/stats');

    return pagination;
};
