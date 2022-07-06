import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import { APIError } from 'lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    WORKOUTS_ITEM_KEY,
    WORKOUTS_BY_USER_KEY,
} from 'lib/api/redis';

import { getUserId } from './users';

import type {
    ListWorkoutsDBParams,
    ListWorkoutsDBRes,
    Workout,
    WorkoutCreateDataDB,
} from 'lib/models/workout';

export const createWorkout = async (workoutCreate: WorkoutCreateDataDB): Promise<Workout> => {
    const { owner, ...workoutData } = workoutCreate;

    const userId = await getUserId(owner);
    const workoutId = uuidv4();

    const workout: Workout = {
        ...workoutData,
        id: workoutId,
    };
    const pipe = redis.pipeline();

    pipe.hset(WORKOUTS_ITEM_KEY(workoutId), Serializer.serialize(workout));
    pipe.sadd(WORKOUTS_BY_USER_KEY(userId), workoutId);

    return workout;
};

export const getWorkout = async (owner: string, workoutId: string): Promise<Workout> => {
    const userId = await getUserId(owner);

    const isExists = await redis.sismember(WORKOUTS_BY_USER_KEY(userId), workoutId);

    if (isExists === 0) {
        throw new APIError(`Workout (${workoutId}) of (${owner}) does not exist`, 404);
    }
    const workout = await redis.hgetall(WORKOUTS_ITEM_KEY(workoutId))
        .then<Workout>(Serializer.deserialize);

    return workout;
};

export const removeWorkout = async (owner: string, workoutId: string): Promise<void> => {
    const userId = await getUserId(owner);

    const isExists = await redis.sismember(WORKOUTS_BY_USER_KEY(userId), workoutId);

    if (isExists === 0) {
        throw new APIError(`Workout (${workoutId}) of (${owner}) does not exist`, 404);
    }
    await redis.del(WORKOUTS_ITEM_KEY(workoutId), WORKOUTS_BY_USER_KEY(userId));
};

export const getWorkouts = async (owner: string, params: ListWorkoutsDBParams): Promise<ListWorkoutsDBRes> => {
    const {
        sortBy = 'date',
        order = 'DESC',
        filter,
        offset: offsetRaw = 0,
        limit: limitRaw = 20,
        expiration: expirationRaw = 10 * 60 * 1000, // 10 min cache
    } = params;
    // @ts-ignore @TODO valide & parse to type
    const offset = parseInt(offsetRaw);
    // @ts-ignore @TODO valide & parse to type
    const limit = parseInt(limitRaw);
    // @ts-ignore @TODO valide & parse to type
    const expiration = parseInt(expirationRaw);

    const userId = await getUserId(owner);

    const key = WORKOUTS_BY_USER_KEY(userId);
    const metaKey = WORKOUTS_ITEM_KEY('*');

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
        'hgetall', WORKOUTS_ITEM_KEY(id.toString()),
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
