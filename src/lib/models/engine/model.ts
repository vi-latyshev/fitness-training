import type { Tagged } from 'type-fest';
import type { Pagination, PaginationResp } from '@/lib/api/redis/types';

export type EngineId = Tagged<string, 'EngineId'>;

export type EngineHumanId = Tagged<string, 'HumanId'>;

export type Engine = {
    id: EngineId;
    humanId: EngineHumanId;
    createdAt: number;
    maxSpeedPm: number;
    power: number;
    nominalVoltage: number
    nominalCurrent: number,
    weight: number;
};

export type EngineCreateDBData = Omit<Engine, 'id'>;

export type EngineCreateData = Omit<EngineCreateDBData, 'createdAt'>;

export type EngineUpdateData = Partial<Omit<Engine, 'id'>>;

export type EngineListDBParams = Pagination<Engine>;

export type EngineListDBRes = PaginationResp<Engine>;
