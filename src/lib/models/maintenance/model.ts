import type { Pagination, PaginationResp } from '@/lib/api/redis/types';
import type { UserName } from '../user';
import type { EngineId } from '../engine/model';
import type { Tagged } from 'type-fest';

export enum RotorFaultReason {
    None = 'None',
    SquirrelCage = 'SquirrelCage',
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
    Expired = 'Expired',
    BigGap = 'BigGap',
    WearOn = 'WearOn',
    Other = 'Other',
}

export enum FanFaultReason {
    None = 'None',
    Clog = 'Clog',
    Contamination = 'Contamination',
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

    carriedOutDescription: string;
};

export type MaintenanceCreateDBData = Omit<Maintenance, 'id'>;

export type MaintenanceCreateData = Omit<MaintenanceCreateDBData, 'engineId' | 'autor' | 'createdAt'>;

export type MaintenanceListDBParams = Pagination<Maintenance>;

export type MaintenanceListDBRes = PaginationResp<Maintenance>;
