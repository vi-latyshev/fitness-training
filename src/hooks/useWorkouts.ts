import { usePagination } from './usePagination';

import type { Workout } from 'lib/models/workout';

export const useWorkouts = (owner: Workout['owner']) => {
    const pagination = usePagination<Workout>(typeof owner === 'string' ? `/api/workouts/${owner}` : null);

    return pagination;
};
