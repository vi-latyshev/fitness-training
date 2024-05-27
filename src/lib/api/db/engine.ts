import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import {
    ENGINES_HUMAN_ID_TO_ID_KEY,
    ENGINES_ID_TO_HUMAN_ID_KEY,
    ENGINES_ITEM_KEY, ENGINES_LIST_IDX_KEY, handlePipeline, redis, Serializer,
} from '../redis';
import { APIError } from '../error';

import type {
    Engine, EngineCreateDBData, EngineHumanId, EngineId, EngineListDBParams, EngineListDBRes, EngineUpdateData,
} from '@/lib/models/engine';

export const createEngine = async (engineData: EngineCreateDBData): Promise<Engine> => {
    const engineId = uuidv4() as EngineId;
    const { humanId } = engineData;

    const engine: Engine = {
        ...engineData,
        id: engineId,
    };

    const pipe = redis.pipeline();

    pipe.hset(ENGINES_ITEM_KEY(engineId), Serializer.serialize(engine));
    pipe.sadd(ENGINES_LIST_IDX_KEY, engineId);
    pipe.hset(ENGINES_HUMAN_ID_TO_ID_KEY, humanId, engineId);
    pipe.hset(ENGINES_ID_TO_HUMAN_ID_KEY, engineId, humanId);

    await redis.fsortBust(ENGINES_LIST_IDX_KEY, Date.now(), 0);
    handlePipeline(await pipe.exec());

    return engine;
};

export const checkExistsEngine = async (engineId: EngineId): Promise<void> => {
    const isExists = await redis.sismember(ENGINES_LIST_IDX_KEY, engineId);

    if (isExists === 0) {
        throw new APIError(`Engine (${engineId}) does not exist`, 404);
    }
};

export const checkExistsEngineByHumanId = async (engineHumanId: EngineHumanId): Promise<boolean> => {
    const isExists = await redis.hexists(ENGINES_HUMAN_ID_TO_ID_KEY, engineHumanId);

    return isExists === 1;
};

export const getEngine = async (engineId: EngineId): Promise<Engine> => {
    await checkExistsEngine(engineId);

    const engine = await redis.hgetall(ENGINES_ITEM_KEY(engineId))
        .then<Engine>(Serializer.deserialize);

    return engine;
};

export const updateEngine = async (engineId: EngineId, updateEngineData: EngineUpdateData): Promise<void> => {
    await checkExistsEngine(engineId);

    const pipe = redis.pipeline();

    pipe.hset(ENGINES_ITEM_KEY(engineId), Serializer.serialize(updateEngineData));

    handlePipeline(await pipe.exec());
};

export const deleteEngine = async (engineId: EngineId): Promise<void> => {
    await checkExistsEngine(engineId);

    const humanId = await redis.hget(ENGINES_ID_TO_HUMAN_ID_KEY, engineId);

    if (humanId === null) {
        throw new Error(`Engine (${engineId}) does not have human id`);
    }
    const pipe = redis.pipeline();

    pipe.srem(ENGINES_LIST_IDX_KEY, engineId);
    pipe.hdel(ENGINES_ID_TO_HUMAN_ID_KEY, engineId);
    pipe.hdel(ENGINES_HUMAN_ID_TO_ID_KEY, humanId);

    pipe.del(ENGINES_ITEM_KEY(engineId));

    await redis.fsortBust(ENGINES_LIST_IDX_KEY, Date.now(), 0);
    handlePipeline(await pipe.exec());
};

export const getEngines = async (params: EngineListDBParams): Promise<EngineListDBRes> => {
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

    const key = ENGINES_LIST_IDX_KEY;
    const metaKey = ENGINES_ITEM_KEY('*');

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
        'hgetall', ENGINES_ITEM_KEY(id.toString()),
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
