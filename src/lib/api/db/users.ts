import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import { APIError } from 'lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    USERS_IDX_KEY,
    USERS_AUTH_KEY,
    USERS_METADATA_KEY,
    USERS_USERNAME_TO_ID_KEY,
    USERS_ID_TO_USERNAME_KEY,
} from 'lib/api/redis';

import type { User, UserAuth, UserRegisterDBData } from 'lib/models/user';
import type { Pagination, PaginationResp } from '../redis/types';

export const createUser = async (userCreate: UserRegisterDBData): Promise<User> => {
    const { auth, meta } = userCreate;
    const { username } = auth;

    const isExists = await redis.hexists(USERS_USERNAME_TO_ID_KEY, username);

    if (isExists === 1) {
        throw new APIError(`User (${username}) already exists`, 409);
    }
    const user: User = meta;
    const userId = uuidv4();

    const pipe = redis.pipeline();

    pipe.sadd(USERS_IDX_KEY, userId);
    pipe.hset(USERS_USERNAME_TO_ID_KEY, username, userId);
    pipe.hset(USERS_ID_TO_USERNAME_KEY, userId, username);

    pipe.hset(USERS_AUTH_KEY(userId), auth);
    pipe.hset(USERS_METADATA_KEY(userId), Serializer.serialize(user));

    handlePipeline(await pipe.exec());
    redis.fsortBust(USERS_IDX_KEY, Date.now(), 1);

    return user;
};

export const getUser = async (username: string): Promise<User> => {
    const userId = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userId === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }
    const user = await redis.hgetall(USERS_METADATA_KEY(userId))
        .then<User>(Serializer.deserialize);

    return user;
};

export const getUserId = async (username: string): Promise<string> => {
    const userId = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userId === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }

    return userId;
};

export const getAuthUser = async (username: string): Promise<UserAuth> => {
    const userId = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userId === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }
    const userAuth = await redis.hgetall(USERS_AUTH_KEY(userId))
        .then<UserAuth>(Serializer.deserialize);

    return userAuth;
};

export const setAuthUser = async (userAuth: UserAuth): Promise<void> => {
    const { username } = userAuth;

    const userId = await redis.hget(USERS_USERNAME_TO_ID_KEY, username);

    if (userId === null) {
        throw new APIError(`User (${username}) does not exist`, 404);
    }
    await redis.hset(USERS_AUTH_KEY(userId), Serializer.serialize(userAuth));
};

type ListUsersDBParams = Pagination<User>;

type ListUsersDBRes = PaginationResp<User>;

export const getUsers = async (params: ListUsersDBParams = {}): Promise<ListUsersDBRes> => {
    const {
        sortBy = 'createdAt',
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

    const key = USERS_IDX_KEY;
    const metaKey = USERS_METADATA_KEY('*');

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
        'hgetall', USERS_METADATA_KEY(id.toString()),
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
