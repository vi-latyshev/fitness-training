import {
    BearingFaultReason,
    FanFaultReason,
    RotorFaultReason,
    ShaftFaultReason,
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

export const shaftFaultReasonList = Object.values(ShaftFaultReason);

type FaultReason<T extends string> = {
    [N in T]: string;
};

export const rotorFaultReasonHuman: FaultReason<RotorFaultReason> = {
    [RotorFaultReason.None]: 'Неисправности отсутствуют',
    [RotorFaultReason.Other]: 'Другое',
    [RotorFaultReason.SquirrelCage]: 'Поломка стержня беличьей клетки',
    [RotorFaultReason.Difformation]: 'Дифформация корпуса ротора',
    [RotorFaultReason.Overheat]: 'Повреждение изоляции',
    [RotorFaultReason.UnevenRotation]: 'Неравномерное вращение',
    [RotorFaultReason.AxialShift]: 'Осевой сдвиг',
};

export const wildingRotorFaultReasonHuman: FaultReason<WildingRotorFaultReason> = {
    [WildingRotorFaultReason.None]: 'Неисправности отсутствуют',
    [WildingRotorFaultReason.Other]: 'Другое',
    [WildingRotorFaultReason.Overheat]: 'Перегрев обмотки ротора',
    [WildingRotorFaultReason.Break]: 'Обрыв обмотки ротора',
};

export const statorFaultReasonHuman: FaultReason<StatorFaultReason> = {
    [StatorFaultReason.None]: 'Неисправности отсутствуют',
    [StatorFaultReason.Other]: 'Другое',
    [StatorFaultReason.Overheat]: 'Повышенный нагрев активной стали статора',
    [StatorFaultReason.Vibration]: 'Вибрация и удары в статоре',
    [StatorFaultReason.Corrosion]: 'Коррозия металлических частей статора',
};

export const wildingStatorFaultReasonHuman: FaultReason<WildingStatorFaultReason> = {
    [WildingStatorFaultReason.None]: 'Неисправности отсутствуют',
    [WildingStatorFaultReason.Other]: 'Другое',
    [WildingStatorFaultReason.Overheat]: 'Перегрев обмотки статор',
    [WildingStatorFaultReason.Break]: 'Обрыв обмотки статора',
};

export const bearingFaultReasonHuman: FaultReason<BearingFaultReason> = {
    [BearingFaultReason.None]: 'Неисправности отсутствуют',
    [BearingFaultReason.Other]: 'Другое',
    [BearingFaultReason.Fluctuation]: 'Колебание крутящего момента',
    [BearingFaultReason.LoadsOnSupports]: 'Нагрузка на опоры',
    [BearingFaultReason.ExceedingSpeed]: 'Превышение скорости вращения',
    [BearingFaultReason.WearOn]: 'Старение смазки',
};

export const fanFaultReasonHuman: FaultReason<FanFaultReason> = {
    [FanFaultReason.None]: 'Неисправности отсутствуют',
    [FanFaultReason.Other]: 'Другое',
    [FanFaultReason.Clog]: 'Засорились каналы подачи воздуха',
    [FanFaultReason.Contamination]: 'Загрязнена поверхность двигателя',
};

export const shaftFaultReasonHuman: FaultReason<ShaftFaultReason> = {
    [ShaftFaultReason.None]: 'Неисправности отсутствуют',
    [ShaftFaultReason.Other]: 'Другое',
    [ShaftFaultReason.Magnetization]: 'Намагничивание вала',
};
