import type { Pagination, PaginationResp } from '@/lib/api/redis/types';
import type { UserName } from '../user';
import type { EngineId } from '../engine/model';
import type { Tagged } from 'type-fest';

export enum RotorFaultReason {
    None = 'None',
    SquirrelCage = 'SquirrelCage',
    Difformation = 'Difformation',
    UnevenRotation = 'UnevenRotation',
    Overheat = 'Overheat',
    AxialShift = 'AxialShift',
    Other = 'Other',
}

export enum WildingRotorFaultReason {
    None = 'None',
    Overheat = 'Overheat',
    Break = 'Break',
    Other = 'Other',
}

export enum StatorFaultReason {
    None = 'None',
    Overheat = 'Overheat',
    Vibration = 'Vibration',
    Corrosion = 'Corrosion',
    Other = 'Other',
}

export enum WildingStatorFaultReason {
    None = 'None',
    Overheat = 'Overheat',
    Break = 'Break',
    Other = 'Other',
}

export enum BearingFaultReason {
    None = 'None',
    Fluctuation = 'Fluctuation',
    LoadsOnSupports = 'LoadsOnSupports',
    ExceedingSpeed = 'ExceedingSpeed',
    WearOn = 'WearOn',
    Other = 'Other',
}

export enum FanFaultReason {
    None = 'None',
    Clog = 'Clog',
    Contamination = 'Contamination',
    Other = 'Other',
}

export enum ShaftFaultReason {
    None = 'None',
    Magnetization = 'Намагничивание',
    Other = 'Other',
}

export type MaintenanceID = Tagged<string, 'MaintenanceID'>;

export type Maintenance = {
    id: MaintenanceID;
    engineId: EngineId;
    autor: UserName;
    createdAt: number;

    rotor: RotorFaultReason;
    rotorDescription?: string;

    wildingRotor: WildingRotorFaultReason;
    wildingRotorDescription?: string;

    wildingStator: WildingStatorFaultReason;
    wildingStatorDescription?: string;

    stator: StatorFaultReason;
    statorDescription?: string;

    bearing: BearingFaultReason;
    bearingDescription?: string;

    fan: FanFaultReason;
    fanDescription?: string;

    shaft: ShaftFaultReason;
    shaftDescription?: string;

    carriedOutDescription: string;
};

export type MaintenanceCreateDBData = Omit<Maintenance, 'id'>;

export type MaintenanceCreateData = Omit<MaintenanceCreateDBData, 'engineId' | 'autor' | 'createdAt'>;

export type MaintenanceListDBParams = Pagination<Maintenance>;

export type MaintenanceListDBRes = PaginationResp<Maintenance>;
