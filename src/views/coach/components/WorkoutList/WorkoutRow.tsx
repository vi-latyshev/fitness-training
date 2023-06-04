import { useCallback } from 'react';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';

import { workoutCountTypeToHuman } from '@/lib/models/workout';
import { useWorkouts } from '@/hooks/useWorkouts';
import Table from '@/components/Table';
import { Button, Checkbox } from '@/components/controls';

import type { Workout } from '@/lib/models/workout';
import type { RemoveWorkoutRes } from '@/lib/api/routes/workouts/remove';

interface WorkoutRowProps extends Workout { }

export const WorkoutRow = ({
    id,
    owner,
    name,
    countsType,
    countsValue,
    isDone,
}: WorkoutRowProps) => {
    const { mutate } = useWorkouts(owner);

    const handleRemoveWorkout = useCallback(async () => {
        try {
            await axios.delete<RemoveWorkoutRes>(`/api/workouts/${owner}/${id}`);
            await mutate();
        } catch (error) {
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
        <Table.Row disabled={isDone}>
            <Table.Cell>
                <Checkbox disabled defaultChecked={isDone} />
            </Table.Cell>
            <Table.Cell full disabled={isDone}>
                {name}
            </Table.Cell>
            <Table.Cell disabled={isDone}>
                {workoutCountTypeToHuman(countsType, countsValue)}
            </Table.Cell>
            <Table.Cell className="px-1">
                <Button
                    color="error"
                    variant="text"
                    Icon={<XIcon />}
                    className="px-5"
                    onClick={handleRemoveWorkout}
                />
            </Table.Cell>
        </Table.Row>
    );
};
