import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import {
    redis,
    Serializer,
    handlePipeline,
    STATS_ITEM_KEY,
    STATS_BY_USER_KEY,
    STATS_USER_DIFF_START_KEY,
    STATS_USER_DIFF_LAST_KEY,
} from '@/lib/api/redis';

import { getUserId } from './users';

import type { UserName } from '@/lib/models/user';
import type {
    Stats,
    StatsCountRes,
    DiffStatsData,
    ListStatsDBRes,
    ListStatsDBParams,
    StatsCreateDataDB,
} from '@/lib/models/stats';

export const createStats = async (statsCreate: StatsCreateDataDB): Promise<Stats> => {
    const { owner } = statsCreate;

    const userId = await getUserId(owner);
    const statsId = uuidv4();

    const stats: Stats = {
        ...statsCreate,
        id: statsId,
    };
    const hasStart = await redis.exists(STATS_USER_DIFF_START_KEY(userId));

    const pipe = redis.pipeline();

    pipe.hset(STATS_ITEM_KEY(statsId), Serializer.serialize(stats));
    pipe.sadd(STATS_BY_USER_KEY(userId), statsId);

    if (hasStart === 0) {
        pipe.set(STATS_USER_DIFF_START_KEY(userId), statsId);
    }
    pipe.set(STATS_USER_DIFF_LAST_KEY(userId), statsId);

    await redis.fsortBust(STATS_BY_USER_KEY(userId), Date.now(), 0);
    handlePipeline(await pipe.exec());

    return stats;
};

export const getCountStats = async (owner: UserName): Promise<StatsCountRes> => {
    const userId = await getUserId(owner);

    const count = await redis.scard(STATS_BY_USER_KEY(userId));

    return count;
};

export const getDiffStats = async (owner: UserName): Promise<DiffStatsData> => {
    const userId = await getUserId(owner);

    const diffKeys = await redis.mget(
        STATS_USER_DIFF_START_KEY(userId),
        STATS_USER_DIFF_LAST_KEY(userId)
    ) as [string, string];

    if (diffKeys[0] === null) {
        return {};
    }
    const cmds = diffKeys.map((key) => ([
        'hgetall', STATS_ITEM_KEY(key),
    ]));
    const items = handlePipeline(await redis.pipeline(cmds).exec());

    const [start, last] = items.map((data) => Serializer.deserialize(data as unknown)) as [Stats, Stats];

    return {
        start,
        last,
    };
};

export const getStatsList = async (owner: UserName, params: ListStatsDBParams): Promise<ListStatsDBRes> => {
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

    const userId = await getUserId(owner);

    const key = STATS_BY_USER_KEY(userId);
    const metaKey = STATS_ITEM_KEY('*');

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
        'hgetall', STATS_ITEM_KEY(id.toString()),
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
