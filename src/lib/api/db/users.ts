import { v4 as uuidv4 } from 'uuid';

import { APIError } from 'lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    USERS_AUTH_KEY,
    USERS_METADATA_KEY,
    USERS_USERNAME_TO_ID_KEY,
    USERS_ID_TO_USERNAME_KEY,
} from 'lib/api/redis';

import type { User, UserAuth, UserAuthData } from 'lib/models/user';

export const createUser = async (userAuth: UserAuthData): Promise<User> => {
    const { auth, meta } = userAuth;
    const { username } = auth;

    const isExists = await redis.hexists(USERS_USERNAME_TO_ID_KEY, username);

    if (isExists === 1) {
        throw new APIError(`User (${username}) already exists`, 409);
    }
    const user: User = meta;
    const userIternalID = uuidv4();

    const pipe = redis.pipeline();

    pipe.hset(USERS_USERNAME_TO_ID_KEY, username, userIternalID);
    pipe.hset(USERS_ID_TO_USERNAME_KEY, userIternalID, username);

    pipe.hset(USERS_AUTH_KEY(userIternalID), auth);
    pipe.hset(USERS_METADATA_KEY(userIternalID), Serializer.serialize(user));

    handlePipeline(await pipe.exec());

    return user;
};

export const getUser = async (username: string): Promise<User> => {
    const userIternalID = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userIternalID === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }
    const user = await redis.hgetall(USERS_METADATA_KEY(userIternalID))
        .then<User>(Serializer.deserialize);

    return user;
};

export const getAuthUser = async (username: string): Promise<UserAuth> => {
    const userIternalID = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userIternalID === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }
    const user = await redis.hgetall(USERS_AUTH_KEY(userIternalID))
        .then<UserAuth>(Serializer.deserialize);

    return user;
};
