import { useCallback, useState } from 'react';

import { workouts, Workout, WorkoutsStatus } from 'lib/models/workout';

export const useWorkoutFilter = () => {
    const [workoutsList, setWorkoutsList] = useState<Workout[]>(workouts);
    const [workoutsStatusFilter, setWorkoutsStatusFilter] = useState<WorkoutsStatus | null>(null);

    const handleChangeFilter = useCallback((status: WorkoutsStatus | null) => {
        const filtered = workouts.filter((workout) => (
            status === null ? true : workout.status === status
        ));

        setWorkoutsStatusFilter(status);
        setWorkoutsList(filtered);
    }, []);

    return [
        workoutsList,
        workoutsStatusFilter,
        handleChangeFilter,
    ] as [typeof workoutsList, typeof workoutsStatusFilter, typeof handleChangeFilter];
};
