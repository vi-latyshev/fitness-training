import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { APIErrorJSON } from 'lib/api/error';
import type { Workout } from 'lib/models/workout';
import type { CountWorkoutRes } from 'lib/api/routes/workouts/count';

type UseCountWorkoutsResult = {
    wourkoutsCount: CountWorkoutRes;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<CountWorkoutRes>;
};

export const useCountWorkouts = (owner: Workout['owner']): UseCountWorkoutsResult => {
    const {
        data,
        error,
        mutate,
    } = useSWR<CountWorkoutRes, APIErrorJSON>(
        typeof owner === 'string' ? `/api/workouts/${owner}/count` : null,
        { revalidateOnMount: true },
    );

    return {
        wourkoutsCount: data ?? 0,
        error,
        isLoading: error === undefined && data === undefined,
        mutate,
    };
};
