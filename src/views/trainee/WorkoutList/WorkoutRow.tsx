import { useCallback } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

import {
    getColorDate,
    workoutCountTypeToHuman,
    // WorkoutTypeHuman,
} from 'lib/models/workout';

import Table from 'components/Table';
import { Button, Checkbox } from 'components/controls';

import type { Workout } from 'lib/models/workout';
// import type { ButtonProps } from 'components/controls';

interface WorkoutRowProps {
    workout: Workout;
}

export const WorkoutRow = ({ workout }: WorkoutRowProps) => {
    const {
        /* id, */ name, countsType, countsValue, date, isDone,
    } = workout;

    const classesCell = clsx({
        'cursor-pointer': !isDone,
    });
    const isDisabled = isDone;

    const handleUnDoneWorkout = useCallback((_e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('undone workout', id);
    }, []);

    const handleChangeWorkout = useCallback(() => {
        // if (status === WorkoutsStatus.Done) {
        //     return;
        // }
        // console.log('select workout', id);
    }, [isDone]);

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
                {name}
            </Table.Cell>
            <Table.Cell disabled={isDisabled} onClick={handleChangeWorkout} className={classesCell}>
                {workoutCountTypeToHuman(countsType, countsValue)}
            </Table.Cell>
            <Table.Cell disabled={isDisabled} onClick={handleChangeWorkout}>
                <Button
                    hover={false}
                    variant="soft"
                    disabled={isDisabled}
                    color={getColorDate(date, isDone)}
                >
                    {dayjs(date).format('DD.MM HH:mm')}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
