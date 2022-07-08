import dayjs from 'dayjs';

import { WorkoutsCountType } from './model';

import type { ButtonProps } from 'components/controls';

// type WorkoutTypeHumanType = {
//     [T in WorkoutType]: string;
// };

// export const WorkoutTypeHuman: WorkoutTypeHumanType = {
//     [WorkoutType.PushUpsFloor]: 'Отжимание от пола',
//     [WorkoutType.PushUpsWideArm]: 'Отжимание с широким упором',
//     [WorkoutType.PushUpsKnee]: 'Отжимание с упором на колени',
//     [WorkoutType.JumpJack]: 'Прыжки',
// };

type WotkoutCountTypeHumanType = {
    [T in WorkoutsCountType]: string;
};

export const WotkoutCountTypeHuman: WotkoutCountTypeHumanType = {
    [WorkoutsCountType.Amount]: 'Повторения',
    [WorkoutsCountType.Time]: 'Время',
};

const workoutCountTimeFormat: dayjs.OptionType = 'mm:ss';

export const workoutCountTimeValidate = (value: string | number): boolean => (
    dayjs(value, workoutCountTimeFormat, true).isValid()
);

export const workoutCountTimeParse = (countType: WorkoutsCountType, countValue: number): number => {
    switch (countType) {
        case WorkoutsCountType.Time: {
            const time = dayjs(countValue, workoutCountTimeFormat, true);
            const duration = dayjs.duration({
                minutes: time.minute(),
                seconds: time.second(),
            });

            return duration.as('seconds');
        }
        case WorkoutsCountType.Amount: {
            return countValue;
        }
        default: throw new Error(`Not implemented count type: ${countType}`);
    }
};

export const workoutCountTypeToHuman = (countType: WorkoutsCountType, countValue: number): string => {
    switch (countType) {
        case WorkoutsCountType.Time: {
            const duration = dayjs.duration(countValue, 's');

            return duration.format(workoutCountTimeFormat);
        }
        case WorkoutsCountType.Amount: {
            return `x${countValue}`;
        }
        default: throw new Error(`Not implemented count type: ${countType}`);
    }
};

/**
 * yesterday+ = red
 * today = green
 * tomorrow+ = default
 */
export const getColorDate = (date: number, isDone?: boolean): ButtonProps['color'] => {
    if (isDone) {
        return 'default';
    }
    const dateNow = dayjs().startOf('day');
    const dateDayjs = dayjs.unix(date);

    if (dateDayjs.isBefore(dateNow, 'day')) {
        return 'error';
    }
    if (dateDayjs.isSame(dateNow, 'day')) {
        return 'success';
    }

    return 'default';
};
