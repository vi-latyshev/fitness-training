import { combineKey } from './combine-key';

// ------------- users

const USERS = 'users';
const USERS_AUTH = 'auth';
const USERS_METADATA = 'meta';
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
const WORKOUTS_LIST = 'list';
const WORKOUTS_BY_USER = 'u';
export const WORKOUTS_ITEM_KEY = (workoutId: string) => combineKey(WORKOUTS, WORKOUTS_LIST, workoutId);
export const WORKOUTS_BY_USER_KEY = (userId: string) => combineKey(WORKOUTS, WORKOUTS_BY_USER, userId);
