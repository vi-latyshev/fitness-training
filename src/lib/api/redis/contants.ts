import { combineKey } from './combine-key';

// ------------- users

const USERS = 'users';
const USERS_IDX = 'u';
const USERS_AUTH = 'auth';
const USERS_METADATA = 'meta';
const USERS_AUTH_TOKENS = 'tokens';
const USERS_USERNAME_TO_ID = 'usernames';
const USERS_ID_TO_USERNAME = 'ids';
export const USERS_AUTH_KEY = (userId: string) => combineKey(USERS, USERS_IDX, userId, USERS_AUTH);
export const USERS_METADATA_KEY = (userId: string) => combineKey(USERS, USERS_IDX, userId, USERS_METADATA);
export const USERS_AUTH_TOKENS_KEY = (userId: string) => combineKey(USERS, USERS_IDX, userId, USERS_AUTH_TOKENS);
export const USERS_USERNAME_TO_ID_KEY = combineKey(USERS, USERS_USERNAME_TO_ID);
export const USERS_ID_TO_USERNAME_KEY = combineKey(USERS, USERS_ID_TO_USERNAME);

// ------------- trainee

const TRAINEE = 'trainee';
const TRAINEE_WORKOUTS = 'workouts';
export const USERS_WORKOUTS_LIST_KEY = (userId: string) => combineKey(TRAINEE, TRAINEE_WORKOUTS, userId);

// ------------- coach

const COACH = 'coach';
const COACH_TRAINEES = 'trainees';
export const COACH_TRAINEES_LIST_KEY = (userId: string) => combineKey(COACH, COACH_TRAINEES, userId);

// ------------- workouts

export const WORKOUTS = 'workouts';
export const WORKOUTS_INDEX_KEY = (workoutId: string) => combineKey(WORKOUTS, workoutId);
