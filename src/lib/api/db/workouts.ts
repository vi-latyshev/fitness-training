import { v4 as uuidv4 } from 'uuid';

import { APIError } from 'lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    WORKOUTS_ITEM_KEY,
    WORKOUTS_BY_USER_KEY,
} from 'lib/api/redis';

import { getInternalUserId } from './users';

import type { Workout, WorkoutCreateDataDB } from 'lib/models/workout';

export const createWorkout = async (workoutCreate: WorkoutCreateDataDB): Promise<Workout> => {
    const { owner, ...workoutData } = workoutCreate;

    const userInternalId = await getInternalUserId(owner);
    const workoutId = uuidv4();

    const workout: Workout = {
        ...workoutData,
        owner,
        id: workoutId,
    };

    const pipe = redis.pipeline();

    pipe.hset(WORKOUTS_ITEM_KEY(workoutId), Serializer.serialize(workout));
    pipe.sadd(WORKOUTS_BY_USER_KEY(userInternalId), workoutId);

    return workout;
};

export const getWorkout = async (workoutId: string): Promise<Workout> => {
    const userInternalID = await redis.hgetall(WORKOUTS_ITEM_KEY(workoutId));


};

export const removeWorkout = async (workoutId: string): Promise<void> => {

};
