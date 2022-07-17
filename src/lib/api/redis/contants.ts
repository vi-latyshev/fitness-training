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

export const USERS_AUTH_KEY = (userId: string) => combineKey(USERS, userId, USERS_AUTH);
export const USERS_METADATA_KEY = (userId: string) => combineKey(USERS, userId, USERS_METADATA);
export const USERS_IDX_KEY = combineKey(USERS, USERS_IDX);
export const USERS_USERNAME_TO_ID_KEY = combineKey(USERS, USERS_USERNAME_TO_ID);
export const USERS_ID_TO_USERNAME_KEY = combineKey(USERS, USERS_ID_TO_USERNAME);

// ------------- workouts

const WORKOUTS = 'workouts';
// workouts -> list
const WORKOUTS_LIST = 'list';
// workouts -> user
const WORKOUTS_BY_USER = 'u';

export const WORKOUTS_ITEM_KEY = (workoutId: string) => combineKey(WORKOUTS, WORKOUTS_LIST, workoutId);
export const WORKOUTS_BY_USER_KEY = (userId: string) => combineKey(WORKOUTS, WORKOUTS_BY_USER, userId);

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

export const STATS_ITEM_KEY = (statId: string) => combineKey(STATS, STATS_LIST, statId);
export const STATS_BY_USER_KEY = (userId: string) => combineKey(STATS, STATS_BY_USER, userId, STATS_USER_LIST);
export const STATS_USER_DIFF_START_KEY = (userId: string) => (
    combineKey(STATS, STATS_BY_USER, userId, STATS_USER_DIFF_START)
);
export const STATS_USER_DIFF_LAST_KEY = (userId: string) => (
    combineKey(STATS, STATS_BY_USER, userId, STATS_USER_DIFF_LAST)
);
