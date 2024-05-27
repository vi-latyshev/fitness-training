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

// ------------- engines
const ENGINES = 'engines';
const ENGINES_LIST = 'list';
const ENGINES_IDX = 'idx';
const ENGINES_ID_TO_HUMAN_ID = 'id-to-human-id';
const ENGINES_HUMAN_ID_TO_ID = 'human-id-to-id';

export const ENGINES_ITEM_KEY = (engineId: string): string => combineKey(ENGINES, ENGINES_LIST, engineId);
export const ENGINES_LIST_IDX_KEY = combineKey(ENGINES, ENGINES_IDX);
export const ENGINES_ID_TO_HUMAN_ID_KEY = combineKey(ENGINES, ENGINES_ID_TO_HUMAN_ID);
export const ENGINES_HUMAN_ID_TO_ID_KEY = combineKey(ENGINES, ENGINES_HUMAN_ID_TO_ID);

// ------------- maintenance
const MAINTENANCE = 'maintenance';
const MAINTENANCE_LIST = 'list';
const MAINTENANCE_IDX = 'idx';
const MAINTENANCE_LAST_ID = 'last-id';

export const MAINTENANCE_ITEM_KEY = (engineId: string, maintenanceId: string): string => (
    combineKey(MAINTENANCE, engineId, MAINTENANCE_LIST, maintenanceId)
);
export const MAINTENANCE_LIST_IDX_KEY = (engineId: string): string => (
    combineKey(MAINTENANCE, engineId, MAINTENANCE_IDX)
);
export const MAINTENANCE_LAST_ID_KEY = (engineId: string): string => (
    combineKey(MAINTENANCE, engineId, MAINTENANCE_LAST_ID)
);

// ------------- AUTH TOKENS

const AUTH_TOKENS = 'auth-tokens';

export const AUTH_TOKENS_KEY = (token: string): string => combineKey(AUTH_TOKENS, token);

// ------------- rate limit

const RATE_LIMIT = 'rate-limit';

export const RATE_LIMIT_TYPE_KEY = (type: string, key: string): string => (
    combineKey(RATE_LIMIT, type, key)
);
