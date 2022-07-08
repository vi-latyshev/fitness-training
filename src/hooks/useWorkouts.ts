import { usePagination } from './usePagination';

import type { Workout } from 'lib/models/workout';

export const useWorkouts = (owner: Workout['owner']) => {
    const pagination = usePagination<Workout>(`/api/workouts/${owner}`);

    return pagination;
};
