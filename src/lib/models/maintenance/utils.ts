import {
    BearingFaultReason, FanFaultReason, RotorFaultReason, StatorFaultReason, WildingRotorFaultReason,
} from './model';

export const rotorFaultReasonList = Object.values(RotorFaultReason);

export const wildingRotorFaultReasonList = Object.values(WildingRotorFaultReason);

export const statorFaultReasonList = Object.values(StatorFaultReason);

export const bearingFaultReasonList = Object.values(BearingFaultReason);

export const fanFaultReasonList = Object.values(FanFaultReason);
