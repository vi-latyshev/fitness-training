import { useCallback, useState } from 'react';
import axios from 'axios';

import { workoutCountTypeToHuman } from 'lib/models/workout';

import { useWorkouts } from 'hooks/useWorkouts';

import Table from 'components/Table';
import { Checkbox } from 'components/controls';

import type { Workout } from 'lib/models/workout';
import type { UpdateWorkoutRes } from 'lib/api/routes/workouts/update';

interface WorkoutRowProps extends Workout { }

export const WorkoutRow = ({
    id,
    owner,
    name,
    countsType,
    countsValue,
    isDone = false,
}: WorkoutRowProps) => {
    const { mutate } = useWorkouts(owner);
    const [isChecked, setIsChecked] = useState<boolean | undefined>(isDone);

    const handleDoneWorkout = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;

        setIsChecked(checked);

        try {
            await axios.patch<UpdateWorkoutRes>(`/api/workouts/${owner}/${id}`, { isDone: checked });
            await mutate();
            setIsChecked(checked);
        } catch (error) {
            setIsChecked(!checked);
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        }
    }, []);

    return (
        <Table.Row disabled={isChecked}>
            <Table.Cell>
                <Checkbox
                    checked={isChecked}
                    onChange={handleDoneWorkout}
                />
            </Table.Cell>
            <Table.Cell full disabled={isChecked}>
                {name}
            </Table.Cell>
            <Table.Cell disabled={isChecked}>
                {workoutCountTypeToHuman(countsType, countsValue)}
            </Table.Cell>
        </Table.Row>
    );
};
