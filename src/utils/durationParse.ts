import dayjs from 'dayjs';

import type { DurationUnitType } from 'dayjs/plugin/duration';

export const durationParse = (value: dayjs.ConfigType, format: dayjs.OptionType, toConvert: DurationUnitType) => {
    const time = dayjs(value, format, true);
    const duration = dayjs.duration({
        minutes: time.minute(),
        seconds: time.second(),
        milliseconds: time.millisecond(),
    });

    return duration.as(toConvert);
};

export const validateTime = (value: dayjs.ConfigType, format: dayjs.OptionType): boolean => (
    dayjs(value, format, true).isValid()
);
