import { useCallback } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { getColorDate, Workout, workoutCountTypeToHuman } from 'lib/models/workout';

import Table from 'components/Table';
import { Button, Checkbox } from 'components/controls';

interface WorkoutRowProps extends Workout { }

export const WorkoutRow = ({
    id,
    name,
    countsType,
    countsValue,
    date,
    isDone,
}: WorkoutRowProps) => {
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

    return (
        <Table.Row disabled={isDone}>
            <Table.Cell onClick={handleChangeWorkout} className={classesCell}>
                <Checkbox checked={isDone} onChange={handleUnDoneWorkout} />
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
            <Table.Cell disabled={isDone} onClick={handleChangeWorkout}>
                <Button
                    hover={false}
                    variant="soft"
                    disabled={isDone}
                    color={getColorDate(date, isDone)}
                >
                    {dayjs.unix(date).format('DD.MM.YY HH:mm')}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
