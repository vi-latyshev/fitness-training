import { useCallback } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';

import { getColorDate, Workout, workoutCountTypeToHuman } from 'lib/models/workout';

import { useWorkouts } from 'hooks/useWorkouts';

import Table from 'components/Table';
import { Button, Checkbox } from 'components/controls';

import type { RemoveWorkoutRes } from 'lib/api/routes/workouts/remove';

interface WorkoutRowProps extends Workout { }

export const WorkoutRow = ({
    id,
    owner,
    name,
    countsType,
    countsValue,
    date,
    isDone,
}: WorkoutRowProps) => {
    const { mutate } = useWorkouts(owner);

    const classesCell = clsx({
        'cursor-pointer': isDone,
    });

    const handleUnDoneWorkout = useCallback((_e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('undone workout', id);
    }, []);

    const handleChangeWorkout = useCallback(() => {
        // if (status === WorkoutsStatus.Done) {
        //     return;
        // }
        // console.log('select workout', id);
    }, [isDone]);

    const handleRemoveWorkout = useCallback(async () => {
        try {
            await axios.delete<RemoveWorkoutRes>(`/api/workouts/${owner}/${id}`);
            mutate();
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
            <Table.Cell onClick={handleChangeWorkout} className={classesCell}>
                <Checkbox disabled checked={isDone} onChange={handleUnDoneWorkout} />
            </Table.Cell>
            <Table.Cell
                full
                disabled={isDone}
                onClick={handleChangeWorkout}
                className={classesCell}
            >
                {name}
            </Table.Cell>
            <Table.Cell disabled={isDone} onClick={handleChangeWorkout} className={classesCell}>
                {workoutCountTypeToHuman(countsType, countsValue)}
            </Table.Cell>
            <Table.Cell disabled={isDone} onClick={handleChangeWorkout} className="px-0">
                <Button
                    hover={false}
                    variant="soft"
                    disabled={isDone}
                    color={getColorDate(date, isDone)}
                >
                    {dayjs.unix(date).format('DD.MM.YY HH:mm')}
                </Button>
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
