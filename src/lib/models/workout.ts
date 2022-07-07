import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { User } from './user';

export enum WorkoutsStatus {
    UnDone = 'undone',
    Done = 'done',
}

export enum WorkoutsCountType {
    Amount = 'amount',
    Time = 'time',
}

export type WorkoutsCounts = {
    type: WorkoutsCountType;
    value: number;
};

export type Workout = {
    id: string;
    name: string;
    counts: WorkoutsCounts;
    date: number;
    status: WorkoutsStatus;
};

export type WorkoutCreateDataDB = Omit<Workout, 'id'> & {
    owner: User['username'];
};

export type WorkoutCreateData = Omit<WorkoutCreateDataDB, 'status'>;

export type ListWorkoutsDBParams = Pagination<Workout>;

export type ListWorkoutsDBRes = PaginationResp<Workout>;

// --------------------------------------------------------
// @TODO move to another file

// type WorkoutTypeHumanType = {
//     [T in WorkoutType]: string;
// };

// export const WorkoutTypeHuman: WorkoutTypeHumanType = {
//     [WorkoutType.PushUpsFloor]: 'Отжимание от пола',
//     [WorkoutType.PushUpsWideArm]: 'Отжимание с широким упором',
//     [WorkoutType.PushUpsKnee]: 'Отжимание с упором на колени',
//     [WorkoutType.JumpJack]: 'Прыжки',
// };

type WorkoutStatusHumanType = {
    [T in WorkoutsStatus]: string;
};

export const WorkoutsStatusHuman: WorkoutStatusHumanType = {
    [WorkoutsStatus.UnDone]: 'Не выполнено',
    [WorkoutsStatus.Done]: 'Выполнено',
};

export const workoutCountTypeToHuman = (countType: WorkoutsCounts): string => {
    const { type, value } = countType;

    switch (type) {
        case WorkoutsCountType.Time: {
            const duration = dayjs.duration(value, 'm');

            return duration.format('HH:mm');
        }
        case WorkoutsCountType.Amount: {
            return `x${value}`;
        }
        default: throw new Error(`Not implemented count type: ${type}`);
    }
};

// @TODO to server
export const workouts: Workout[] = [
    {
        id: uuidv4(),
        name: 'Отжимание от пола',
        counts: {
            type: WorkoutsCountType.Amount,
            value: 20,
        },
        date: dayjs().subtract(1, 'd').valueOf(),
        status: WorkoutsStatus.Done,
    },
    {
        id: uuidv4(),
        name: 'Отжимание с упором на колени',
        counts: {
            type: WorkoutsCountType.Amount,
            value: 5,
        },
        date: dayjs().startOf('day').subtract(1, 'd').valueOf(),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        name: 'Отжимание с широким упором',
        counts: {
            type: WorkoutsCountType.Amount,
            value: 10,
        },
        date: dayjs().startOf('day').valueOf(),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        name: 'Отжимание с широким упором',
        counts: {
            type: WorkoutsCountType.Amount,
            value: 10,
        },
        date: dayjs().startOf('day').add(1, 'd').valueOf(),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        name: 'Прыжки',
        counts: {
            type: WorkoutsCountType.Time,
            value: 20,
        },
        date: dayjs().startOf('day').add(1, 'd').valueOf(),
        status: WorkoutsStatus.UnDone,
    },
];
