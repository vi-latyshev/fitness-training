import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import { APIError } from '@/lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    TASKS_ITEM_KEY,
    TASKS_BY_USER_KEY,
} from '@/lib/api/redis';

import { getUserId } from './users';

import type { UserName } from '@/lib/models/user';
import type {
    Workout,
    WorkoutId,
    WorkoutCountRes,
    WorkoutUpdateData,
    WorkoutCreateDataDB,
    ListWorkoutsDBRes,
    ListWorkoutsDBParams,
} from '@/lib/models/workout';

export const createWorkout = async (workoutCreate: WorkoutCreateDataDB): Promise<Workout> => {
    const { owner } = workoutCreate;

    const userId = await getUserId(owner);
    const workoutId = uuidv4();

    const workout: Workout = {
        ...workoutCreate,
        id: workoutId,
    };
    const pipe = redis.pipeline();

    pipe.hset(TASKS_ITEM_KEY(workoutId), Serializer.serialize(workout));
    pipe.sadd(TASKS_BY_USER_KEY(userId), workoutId);

    await redis.fsortBust(TASKS_BY_USER_KEY(userId), Date.now(), 0);
    handlePipeline(await pipe.exec());

    return workout;
};

export const getWorkout = async (owner: UserName, workoutId: Workout['id']): Promise<Workout> => {
    const userId = await getUserId(owner);

    const isExists = await redis.sismember(TASKS_BY_USER_KEY(userId), workoutId);

    if (isExists === 0) {
        throw new APIError(`Workout (${workoutId}) of (${owner}) does not exist`, 404);
    }
    const workout = await redis.hgetall(TASKS_ITEM_KEY(workoutId))
        .then<Workout>(Serializer.deserialize);

    return workout;
};

export const getCountWorkouts = async (owner: UserName): Promise<WorkoutCountRes> => {
    const userId = await getUserId(owner);

    const count = await redis.scard(TASKS_BY_USER_KEY(userId));

    return count;
};

export const updateWorkout = async (
    owner: UserName,
    workoutId: WorkoutId,
    workoutUpdate: WorkoutUpdateData
): Promise<void> => {
    const userId = await getUserId(owner);

    const isExists = await redis.sismember(TASKS_BY_USER_KEY(userId), workoutId);

    if (isExists === 0) {
        throw new APIError(`Workout (${workoutId}) of (${owner}) does not exist`, 404);
    }
    await redis.hset(TASKS_ITEM_KEY(workoutId), Serializer.serialize(workoutUpdate));
};

export const removeWorkout = async (owner: UserName, workoutId: Workout['id']): Promise<void> => {
    const userId = await getUserId(owner);

    const isExists = await redis.sismember(TASKS_BY_USER_KEY(userId), workoutId);

    if (isExists === 0) {
        throw new APIError(`Workout (${workoutId}) of (${owner}) does not exist`, 404);
    }
    const pipe = redis.pipeline();

    pipe.del(TASKS_ITEM_KEY(workoutId));
    pipe.srem(TASKS_BY_USER_KEY(userId), workoutId);

    await redis.fsortBust(TASKS_BY_USER_KEY(userId), Date.now(), 0);
    handlePipeline(await pipe.exec());
};

export const getWorkouts = async (owner: UserName, params: ListWorkoutsDBParams): Promise<ListWorkoutsDBRes> => {
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

    const key = TASKS_BY_USER_KEY(userId);
    const metaKey = TASKS_ITEM_KEY('*');

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
        'hgetall', TASKS_ITEM_KEY(id.toString()),
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
