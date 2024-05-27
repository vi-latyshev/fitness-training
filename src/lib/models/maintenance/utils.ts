import {
    BearingFaultReason,
    FanFaultReason,
    RotorFaultReason,
    StatorFaultReason,
    WildingRotorFaultReason,
    WildingStatorFaultReason,
} from './model';

export const rotorFaultReasonList = Object.values(RotorFaultReason);

export const wildingRotorFaultReasonList = Object.values(WildingRotorFaultReason);

export const statorFaultReasonList = Object.values(StatorFaultReason);

export const wildingStatorFaultReasonList = Object.values(WildingStatorFaultReason);

export const bearingFaultReasonList = Object.values(BearingFaultReason);

export const fanFaultReasonList = Object.values(FanFaultReason);

type FaultReason<T extends string> = {
    [N in T]: string;
};

export const rotorFaultReasonHuman: FaultReason<RotorFaultReason> = {
    [RotorFaultReason.None]: 'Отсутствует',
    [RotorFaultReason.Other]: 'Другое',
    [RotorFaultReason.SquirrelCage]: 'Поломка стрежня беличьей клетки',
};

export const wildingRotorFaultReasonHuman: FaultReason<WildingRotorFaultReason> = {
    [WildingRotorFaultReason.None]: 'Отсутствует',
    [WildingRotorFaultReason.Other]: 'Другое',
    [WildingRotorFaultReason.Overheat]: 'Перегрев обмотки ротора',
    [WildingRotorFaultReason.Break]: 'Обрыв обмотки ротора',
};

export const statorFaultReasonHuman: FaultReason<StatorFaultReason> = {
    [StatorFaultReason.None]: 'Отсутствует',
    [StatorFaultReason.Other]: 'Другое',
    [StatorFaultReason.Overheat]: 'Повышенный нагрев активной стали статора',
};

export const wildingStatorFaultReasonHuman: FaultReason<WildingStatorFaultReason> = {
    [WildingStatorFaultReason.None]: 'Отсутствует',
    [WildingStatorFaultReason.Other]: 'Другое',
    [WildingStatorFaultReason.Overheat]: 'Перегрев обмотки статор',
    [WildingStatorFaultReason.Break]: 'Обрыв обмотки статора',
};

export const bearingFaultReasonHuman: FaultReason<BearingFaultReason> = {
    [BearingFaultReason.None]: 'Отсутствует',
    [BearingFaultReason.Other]: 'Другое',
    [BearingFaultReason.Expired]: 'Закончился срок эксплуатации',
    [BearingFaultReason.BigGap]: 'Большой зазор в подшипнике',
    [BearingFaultReason.WearOn]: 'Старение смазки',
};

export const fanFaultReasonHuman: FaultReason<FanFaultReason> = {
    [FanFaultReason.None]: 'Отсутствует',
    [FanFaultReason.Other]: 'Другое',
    [FanFaultReason.Clog]: 'Засорились каналы подачи воздуха',
    [FanFaultReason.Contamination]: 'Загрязнена поверхность двигателя',
};
