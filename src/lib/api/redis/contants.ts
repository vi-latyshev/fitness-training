import { combineKey } from './combine-key';

// ------------- users

const USERS = 'users';
// users -> user
const USERS_AUTH = 'auth';
const USERS_METADATA = 'meta';
// users
const USERS_IDX = 'idx';
const USERS_USERNAME_TO_ID = 'username-to-id';
const USERS_ID_TO_USERNAME = 'id-to-username';

export const USERS_AUTH_KEY = (userId: string): string => combineKey(USERS, userId, USERS_AUTH);
export const USERS_METADATA_KEY = (userId: string): string => combineKey(USERS, userId, USERS_METADATA);
export const USERS_IDX_KEY = combineKey(USERS, USERS_IDX);
export const USERS_USERNAME_TO_ID_KEY = combineKey(USERS, USERS_USERNAME_TO_ID);
export const USERS_ID_TO_USERNAME_KEY = combineKey(USERS, USERS_ID_TO_USERNAME);

// ------------- tasks

const TASKS = 'tasks';
// tasks -> list
const TASKS_LIST = 'list';
// tasks -> user
const TASKS_BY_USER = 'u';

export const TASKS_ITEM_KEY = (taskId: string): string => combineKey(TASKS, TASKS_LIST, taskId);
export const TASKS_BY_USER_KEY = (userId: string): string => combineKey(TASKS, TASKS_BY_USER, userId);

// ------------- stats

const STATS = 'stats';
// stats -> list
const STATS_LIST = 'list';
// stats -> users
const STATS_BY_USER = 'u';
// stats -> users -> user -> all / start / end
const STATS_USER_LIST = 'list';
const STATS_USER_DIFF_START = 'start';
const STATS_USER_DIFF_LAST = 'last';

export const STATS_ITEM_KEY = (statId: string): string => combineKey(STATS, STATS_LIST, statId);
export const STATS_BY_USER_KEY = (userId: string): string => combineKey(STATS, STATS_BY_USER, userId, STATS_USER_LIST);
export const STATS_USER_DIFF_START_KEY = (userId: string): string => (
    combineKey(STATS, STATS_BY_USER, userId, STATS_USER_DIFF_START)
);
export const STATS_USER_DIFF_LAST_KEY = (userId: string): string => (
    combineKey(STATS, STATS_BY_USER, userId, STATS_USER_DIFF_LAST)
);

// ------------- AUTH TOKENS

const AUTH_TOKENS = 'auth-tokens';

export const AUTH_TOKENS_KEY = (token: string): string => combineKey(AUTH_TOKENS, token);

// ------------- rate limit

const RATE_LIMIT = 'rate-limit';

export const RATE_LIMIT_TYPE_KEY = (type: string, key: string): string => (
    combineKey(RATE_LIMIT, type, key)
);
