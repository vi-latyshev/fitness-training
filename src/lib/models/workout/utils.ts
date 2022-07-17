import dayjs from 'dayjs';

import { durationParse, validateTime } from 'utils/durationParse';

import { WorkoutsCountType } from './model';

export const workoutsCountTypeList = Object.values(WorkoutsCountType);

type WotkoutCountTypeHumanType = {
    [T in WorkoutsCountType]: string;
};

export const WotkoutCountTypeHuman: WotkoutCountTypeHumanType = {
    [WorkoutsCountType.Amount]: 'Повторения',
    [WorkoutsCountType.Time]: 'Время',
    [WorkoutsCountType.Distance]: 'Дистанция',
};

const workoutCountTimeFormat: dayjs.OptionType = 'mm:ss';

export const workoutCountTimeValidate = (value: string | number): boolean => (
    validateTime(value, workoutCountTimeFormat)
);

export const workoutCountTimeParse = (countType: WorkoutsCountType, countValue: number): number => {
    switch (countType) {
        case WorkoutsCountType.Time: {
            return durationParse(countValue, workoutCountTimeFormat, 's');
        }
        case WorkoutsCountType.Distance:
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
        case WorkoutsCountType.Distance: {
            return `${countValue}м`;
        }
        default: throw new Error(`Not implemented count type: ${countType}`);
    }
};
