import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export enum WorkoutType {
    PushUpsFloor,
    PushUpsWideArm,
    PushUpsKnee,
    JumpJack,
    // @TODO
}

export enum WorkoutsStatus {
    UnDone = 'undone',
    Done = 'done',
}

export interface WorkoutsCountType {
    type: 'amount' | 'time';
    value: number;
}

export interface Workout {
    id: string;
    type: WorkoutType;
    counts: WorkoutsCountType;
    date: dayjs.Dayjs;
    status: WorkoutsStatus;
}

// --------------------------------------------------------
// @TODO move to another file

type WorkoutTypeHumanType = {
    [T in WorkoutType]: string;
};

export const WorkoutTypeHuman: WorkoutTypeHumanType = {
    [WorkoutType.PushUpsFloor]: 'Отжимание от пола',
    [WorkoutType.PushUpsWideArm]: 'Отжимание с широким упором',
    [WorkoutType.PushUpsKnee]: 'Отжимание с упором на колени',
    [WorkoutType.JumpJack]: 'Прыжки',
};

type WorkoutStatusHumanType = {
    [T in WorkoutsStatus]: string;
};

export const WorkoutsStatusHuman: WorkoutStatusHumanType = {
    [WorkoutsStatus.UnDone]: 'Не выполнено',
    [WorkoutsStatus.Done]: 'Выполнено',
};

export const workoutCountTypeToHuman = (countType: WorkoutsCountType): string => {
    const { type, value } = countType;

    switch (type) {
        case 'time': {
            const duration = dayjs.duration(value, 'm');

            return duration.format('HH:mm');
        }
        case 'amount': {
            return `x${value}`;
        }
        default: throw new Error(`Not implemented count type: ${type}`);
    }
};

// @TODO to server
export const workouts: Workout[] = [
    {
        id: uuidv4(),
        type: WorkoutType.PushUpsFloor,
        counts: {
            type: 'amount',
            value: 20,
        },
        date: dayjs().subtract(1, 'd'),
        status: WorkoutsStatus.Done,
    },
    {
        id: uuidv4(),
        type: WorkoutType.PushUpsKnee,
        counts: {
            type: 'amount',
            value: 5,
        },
        date: dayjs().startOf('day'),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        type: WorkoutType.PushUpsWideArm,
        counts: {
            type: 'amount',
            value: 10,
        },
        date: dayjs().startOf('day').add(1, 'd'),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        type: WorkoutType.PushUpsWideArm,
        counts: {
            type: 'amount',
            value: 10,
        },
        date: dayjs().startOf('day').add(1, 'd'),
        status: WorkoutsStatus.UnDone,
    },
    {
        id: uuidv4(),
        type: WorkoutType.JumpJack,
        counts: {
            type: 'time',
            value: 20,
        },
        date: dayjs().startOf('day').add(1, 'd'),
        status: WorkoutsStatus.UnDone,
    },
];
