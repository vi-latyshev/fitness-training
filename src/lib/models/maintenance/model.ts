import type { Pagination, PaginationResp } from '@/lib/api/redis/types';
import type { UserName } from '../user';
import type { EngineId } from '../engine/model';
import type { Tagged } from 'type-fest';

export enum RotorFaultReason {
    None,
    Other,
    SquirrelCage,
}

export enum WildingRotorFaultReason {
    None,
    Other,
    Overheat,
    Break,
}

export enum StatorFaultReason {
    None,
    Other,
    Overheat,
}

export enum BearingFaultReason {
    None,
    Other,
    Expired,
    BigGap,
    WearOn,
}

export enum FanFaultReason {
    None,
    Other,
    Сlog,
    Сontamination,
}

export type MaintenanceID = Tagged<string, 'MaintenanceID'>;

export type Maintenance = {
    id: MaintenanceID;
    engineId: EngineId;
    autor: UserName;
    createdAt: number;

    rotor: RotorFaultReason;
    rotorDescription: string;

    wildingRotor: WildingRotorFaultReason;
    wildingRotorDescription: string;

    stator: StatorFaultReason;
    statorDescription: string;

    bearing: BearingFaultReason;
    bearingDescription: string;

    fan: FanFaultReason;
    fanDescription: string;

    carriedOutDescription: string;
};

export type MaintenanceCreateDBData = Omit<Maintenance, 'id'>;

export type MaintenanceCreateData = Omit<MaintenanceCreateDBData, 'autor' | 'createdAt'>;

export type MaintenanceListDBParams = Pagination<Maintenance>;

export type MaintenanceListDBRes = PaginationResp<Maintenance>;
