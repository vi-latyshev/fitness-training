import { usePagination } from './usePagination';

import type { User } from '@/lib/models/user';

export const useUsers = () => {
    const pagination = usePagination<User>('/api/users');

    return pagination;
};
