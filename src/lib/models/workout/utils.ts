import dayjs from 'dayjs';

import { WorkoutsCountType } from './model';

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
