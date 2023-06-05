import { filter as fSortFilter } from 'redis-filtered-sort';
import { v4 as uuidv4 } from 'uuid';

import { APIError } from '@/lib/api/error';
import {
    redis,
    Serializer,
    handlePipeline,
    TASKS_ITEM_KEY,
    TASKS_LIST_IDX_KEY,
    // TASKS_BY_USER_KEY,
} from '@/lib/api/redis';

import type {
    Task, TaskCreateDataDB, TaskListDBParams, TaskListDBRes, TaskUpdateData,
} from '@/lib/models/task';

export const createTask = async (taskCreate: TaskCreateDataDB): Promise<Task> => {
    const taskId = uuidv4();

    const task: Task = {
        ...taskCreate,
        id: taskId,
    };

    const pipe = redis.pipeline();

    pipe.hset(TASKS_ITEM_KEY(taskId), Serializer.serialize(task));
    pipe.sadd(TASKS_LIST_IDX_KEY, taskId);

    await redis.fsortBust(TASKS_LIST_IDX_KEY, Date.now(), 0);
    handlePipeline(await pipe.exec());

    return task;
};

export const getTask = async (taskId: Task['id']): Promise<Task> => {
    const isExists = await redis.sismember(TASKS_LIST_IDX_KEY, taskId);

    if (isExists === 0) {
        throw new APIError(`Task (${taskId}) does not exist`, 404);
    }
    const task = await redis.hgetall(TASKS_ITEM_KEY(taskId))
        .then<Task>(Serializer.deserialize);

    return task;
};

// export const getCountTasks = async (assignee: Task['assignee']): Promise<number> => {
//     const userId = await getUserId(assignee);

//     const count = await redis.scard(TASKS_BY_USER_KEY(userId));

//     return count;
// };

export const updateTask = async (taskId: Task['id'], taskUpdate: TaskUpdateData): Promise<void> => {
    const isExists = await redis.sismember(TASKS_LIST_IDX_KEY, taskId);

    if (isExists === 0) {
        throw new APIError(`Task (${taskId}) does not exist`, 404);
    }
    await redis.hset(TASKS_ITEM_KEY(taskId), Serializer.serialize(taskUpdate));
};

export const removeTask = async (taskId: Task['id']): Promise<void> => {
    const isExists = await redis.sismember(TASKS_LIST_IDX_KEY, taskId);

    if (isExists === 0) {
        throw new APIError(`Task (${taskId}) does not exist`, 404);
    }
    const pipe = redis.pipeline();

    pipe.del(TASKS_ITEM_KEY(taskId));
    pipe.srem(TASKS_LIST_IDX_KEY, taskId);

    await redis.fsortBust(TASKS_LIST_IDX_KEY, Date.now(), 0);
    handlePipeline(await pipe.exec());
};

export const getTasks = async (params: TaskListDBParams): Promise<TaskListDBRes> => {
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

    const key = TASKS_LIST_IDX_KEY;
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
