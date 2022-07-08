import { useCallback } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

import {
    getColorDate,
    workoutCountTypeToHuman,
    WorkoutTypeHuman,
} from 'lib/models/workout';

import Table from 'components/Table';
import { Button, Checkbox } from 'components/controls';

import type { Workout } from 'lib/models/workout';
import type { ButtonProps } from 'components/controls';

interface WorkoutRowProps {
    workout: Workout;
}

export const WorkoutRow = ({ workout }: WorkoutRowProps) => {
    const {
        /* id, */ type, counts, date, status,
    } = workout;

    const classesCell = clsx({
        'cursor-pointer': status === WorkoutsStatus.UnDone,
    });
    const isDisabled = status !== WorkoutsStatus.UnDone;

    const handleUnDoneWorkout = useCallback((_e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('undone workout', id);
    }, []);

    const handleChangeWorkout = useCallback(() => {
        // if (status === WorkoutsStatus.Done) {
        //     return;
        // }
        // console.log('select workout', id);
    }, [status]);

    return (
        <Table.Row disabled={isDisabled}>
            <Table.Cell onClick={handleChangeWorkout} className={classesCell}>
                <Checkbox disabled={!isDisabled} checked={isDisabled} onChange={handleUnDoneWorkout} />
            </Table.Cell>
            <Table.Cell
                full
                disabled={isDisabled}
                onClick={handleChangeWorkout}
                className={classesCell}
            >
                {WorkoutTypeHuman[type] ?? '-'}
            </Table.Cell>
            <Table.Cell disabled={isDisabled} onClick={handleChangeWorkout} className={classesCell}>
                {workoutCountTypeToHuman(counts)}
            </Table.Cell>
            <Table.Cell disabled={isDisabled} onClick={handleChangeWorkout}>
                <Button
                    hover={false}
                    variant="soft"
                    disabled={isDisabled}
                    color={getColorDate(status, date)}
                >
                    {date.format('DD.MM HH:mm')}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
