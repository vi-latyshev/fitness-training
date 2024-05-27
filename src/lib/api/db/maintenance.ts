import { filter as fSortFilter } from 'redis-filtered-sort';

import {
    handlePipeline, MAINTENANCE_ITEM_KEY, MAINTENANCE_LAST_ID_KEY, MAINTENANCE_LIST_IDX_KEY, redis, Serializer,
} from '../redis';

import type { EngineId } from '@/lib/models/engine';
import type {
    Maintenance, MaintenanceCreateDBData, MaintenanceID, MaintenanceListDBParams, MaintenanceListDBRes,
} from '@/lib/models/maintenance/model';

export const getNextMaintenanceId = async (engineId: EngineId): Promise<MaintenanceID> => {
    const nextId = await redis.incr(MAINTENANCE_LAST_ID_KEY(engineId));

    return String(nextId) as MaintenanceID;
};

export const createMaintenance = async (maintenanceData: MaintenanceCreateDBData): Promise<Maintenance> => {
    const { engineId } = maintenanceData;

    const maintenanceId = await getNextMaintenanceId(engineId);

    const maintenance: Maintenance = {
        ...maintenanceData,
        id: maintenanceId,
    };

    const pipe = redis.pipeline();

    pipe.hset(MAINTENANCE_ITEM_KEY(engineId, maintenanceId), Serializer.serialize(maintenance));
    pipe.sadd(MAINTENANCE_LIST_IDX_KEY(engineId), maintenanceId);

    await redis.fsortBust(MAINTENANCE_LIST_IDX_KEY(engineId), Date.now(), 0);
    handlePipeline(await pipe.exec());

    return maintenance;
};

export const checkExistsMaintenance = async (engineId: EngineId, maintenanceId: MaintenanceID): Promise<boolean> => {
    const exists = await redis.sismember(MAINTENANCE_LIST_IDX_KEY(engineId), maintenanceId);

    return exists === 1;
};

export const getMaintenance = async (engineId: EngineId, maintenanceId: MaintenanceID): Promise<Maintenance> => {
    await checkExistsMaintenance(engineId, maintenanceId);

    const maintenance = await redis.hgetall(MAINTENANCE_ITEM_KEY(engineId, maintenanceId))
        .then<Maintenance>(Serializer.deserialize);

    return maintenance;
};

export const updateMaintenance = async (
    engineId: EngineId,
    maintenanceId: MaintenanceID,
    maintenanceData: Maintenance
): Promise<void> => {
    await checkExistsMaintenance(engineId, maintenanceId);

    const pipe = redis.pipeline();

    pipe.hset(MAINTENANCE_ITEM_KEY(engineId, maintenanceId), Serializer.serialize(maintenanceData));

    handlePipeline(await pipe.exec());
};

export const deleteMaintenance = async (engineId: EngineId, maintenanceId: MaintenanceID): Promise<void> => {
    checkExistsMaintenance(engineId, maintenanceId);

    const pipe = redis.pipeline();

    pipe.srem(MAINTENANCE_LIST_IDX_KEY(engineId), maintenanceId);

    pipe.del(MAINTENANCE_ITEM_KEY(engineId, maintenanceId));

    handlePipeline(await pipe.exec());
};

export const getMaintenances = async (
    engineId: EngineId,
    params: MaintenanceListDBParams
): Promise<MaintenanceListDBRes> => {
    const {
        sortBy = 'createdAt',
        order = 'ASC',
        filter,
        offset: offsetRaw = 0,
        limit: limitRaw = 20,
        expiration: expirationRaw = 30000, // 30 sec
    } = params;
    // @ts-ignore @TODO valide & parse to type
    const offset = parseInt(offsetRaw);
    // @ts-ignore @TODO valide & parse to type
    const limit = parseInt(limitRaw);
    // @ts-ignore @TODO valide & parse to type
    const expiration = parseInt(expirationRaw);

    const key = MAINTENANCE_LIST_IDX_KEY(engineId);
    const metaKey = MAINTENANCE_ITEM_KEY(engineId, '*');

    const found = await redis.fsort(
        key,
        metaKey,
        sortBy,
        order,
        fSortFilter(filter ?? {}),
        Date.now(),
        offset,
        limit,
        expiration
    );
    const total = +(found.pop() || 0);

    const cmds = found.map((id: string | number) => ([
        'hgetall', MAINTENANCE_ITEM_KEY(engineId, id.toString()),
    ]));
    const items = handlePipeline(await redis.pipeline(cmds).exec());

    return {
        items: items.map((data) => Serializer.deserialize(data)),
        cursor: offset + limit,
        page: Math.floor(offset / limit) + 1,
        pages: Math.ceil(total / limit) || 1,
        total,
    };
};
