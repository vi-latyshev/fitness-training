import { v4 as uuidv4 } from 'uuid';

import {
    redis,
    handlePipeline,
    USERS_AUTH_KEY,
    USERS_METADATA_KEY,
    USERS_USERNAME_TO_ID_KEY,
    USERS_ID_TO_USERNAME_KEY,
} from '../redis';

import type { User, UserAuthData } from 'lib/models/user';

export const createUser = async (userAuth: UserAuthData): Promise<User> => {
    const { auth, meta } = userAuth;
    const { username } = auth;

    const user: User = {
        ...meta,
        username,
    };
    const userIternalID = uuidv4();

    const pipe = redis.pipeline();

    pipe.hset(USERS_USERNAME_TO_ID_KEY, username, userIternalID);
    pipe.hset(USERS_ID_TO_USERNAME_KEY, userIternalID, username);

    pipe.hset(USERS_AUTH_KEY(userIternalID), auth);
    pipe.hset(USERS_METADATA_KEY(userIternalID), user);

    handlePipeline(await pipe.exec());

    return user;
};
