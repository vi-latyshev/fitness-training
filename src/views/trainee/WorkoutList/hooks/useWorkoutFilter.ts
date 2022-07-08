import { useCallback, useState } from 'react';

import { Workout } from 'lib/models/workout';

export const useWorkoutFilter = () => {
    const [workoutsList, setWorkoutsList] = useState<Workout[]>([]);
    const [workoutsStatusFilter, setWorkoutsStatusFilter] = useState<boolean>(false);

    const handleChangeFilter = useCallback((status: boolean) => {
        const filtered = workoutsList.filter((workout) => (
            status === null ? true : workout.isDone
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
