import dayjs from 'dayjs';

import { durationParse, validateTime } from 'utils/durationParse';

import { WorkoutsCountType } from '../workout';

import { StatsType } from './model';

import type { RegisterOptions } from 'react-hook-form';

export const statsTypeList = Object.values(StatsType);

type StatsByWorkoutType = {
    [T in StatsType]: WorkoutsCountType;
};

export const StatsByType: StatsByWorkoutType = {
    [StatsType.PushUps]: WorkoutsCountType.Amount,
    [StatsType.Squats]: WorkoutsCountType.Amount,
    [StatsType.LongJump]: WorkoutsCountType.Distance,
    [StatsType.PullUps]: WorkoutsCountType.Amount,
    [StatsType.Press]: WorkoutsCountType.Amount,
    [StatsType.ShuttleRun]: WorkoutsCountType.Time,
    [StatsType.Cross1000m]: WorkoutsCountType.Time,
};

type StatsTypeToHumanType = {
    [T in StatsType]: string;
};

export const StatsTypeToHuman: StatsTypeToHumanType = {
    [StatsType.PushUps]: 'Отжимания',
    [StatsType.Squats]: 'Приседания',
    [StatsType.LongJump]: 'Прыжки в длину',
    [StatsType.PullUps]: 'Подтягивания',
    [StatsType.Press]: 'Пресс',
    [StatsType.ShuttleRun]: 'Челночный бег',
    [StatsType.Cross1000m]: 'Кросс 1000м',
};

const statsValueTimeFormat: dayjs.OptionType = 'mm:ss:SSS';
const statsValueTimeFormatHuman: dayjs.OptionType = `${statsValueTimeFormat}[мс]`;

export const statsTypeValueParse = (type: StatsType, typeValue: number) => {
    switch (StatsByType[type]) {
        case WorkoutsCountType.Time: {
            return durationParse(typeValue, statsValueTimeFormat, 'ms');
        }
        case WorkoutsCountType.Distance:
        case WorkoutsCountType.Amount: {
            return typeValue;
        }
        default: throw new Error(`Not implemented count type: ${type}`);
    }
};

export const statsTypeValueToHuman = (type: StatsType, typeValue: number | undefined): string => {
    if (!typeValue) {
        return '-';
    }
    switch (StatsByType[type]) {
        case WorkoutsCountType.Time: {
            const duration = dayjs.duration(typeValue, 'ms');

            return duration.format(statsValueTimeFormatHuman);
        }
        case WorkoutsCountType.Amount: {
            return `x${typeValue}`;
        }
        case WorkoutsCountType.Distance: {
            return `${typeValue}м`;
        }
        default: throw new Error(`Not implemented count type: ${type}`);
    }
};

type StatsResultReverseType = StatsType[];

const StatsResult: StatsResultReverseType = [
    StatsType.ShuttleRun,
    StatsType.Cross1000m,
];

export const calculateStatsDiff = (type: StatsType, start?: number, last?: number): boolean | null => {
    if (!start || !last || start === last) {
        return null;
    }
    const isReverse = StatsResult.includes(type);

    return isReverse ? start > last : start < last;
};

type StatsTypeRegisterFieldsType = {
    [T in StatsType]: {
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
        inputRegister?: RegisterOptions;
    };
};

export const StatsTypeRegisterFields: StatsTypeRegisterFieldsType = {
    [StatsType.PushUps]: {},
    [StatsType.Squats]: {},
    [StatsType.LongJump]: {
        inputProps: {
            min: 0.01,
            step: 0.01,
        },
    },
    [StatsType.PullUps]: {},
    [StatsType.Press]: {},
    [StatsType.ShuttleRun]: {
        inputProps: {
            type: 'text',
            pattern: '[0-9]{2}:[0-9]{2}:[0-9]{3}',
            defaultValue: '00:00:000',
        },
        inputRegister: {
            valueAsNumber: false,
            validate: (value) => validateTime(value, statsValueTimeFormat) || 'Неверное время',
            pattern: {
                value: /^[0-9]{2}:[0-9]{2}:[0-9]{3}/,
                message: 'Неверный формат',
            },
        },
    },
    [StatsType.Cross1000m]: {
        inputProps: {
            type: 'text',
            pattern: '[0-9]{2}:[0-9]{2}:[0-9]{3}',
            defaultValue: '00:00:000',
        },
        inputRegister: {
            valueAsNumber: false,
            validate: (value) => validateTime(value, statsValueTimeFormat) || 'Неверное время',
            pattern: {
                value: /^[0-9]{2}:[0-9]{2}:[0-9]{3}/,
                message: 'Неверный формат',
            },
        },
    },
};
