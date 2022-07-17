import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { User } from '../user';

export enum StatsType {
    PushUps = 'pushUps',
    Squats = 'squats',
    LongJump = 'longJump',
    PullUps = 'pullUps',
    Press = 'press',
    ShuttleRun = 'shuttleRun',
    Cross1000m = 'cross1000m',
}

type StatsId = string;

export type StatsWithTypes = {
    [T in StatsType]: number;
};

export type Stats = {
    id: StatsId;
    owner: User['username'];
    createdAt: number;
} & StatsWithTypes;

export type DiffStatsData = {
    start?: Stats;
    last?: Stats;
};

export type StatsCreateDataDB = Omit<Stats, 'id'>;

export type StatsCreateData = Omit<StatsCreateDataDB, 'owner' | 'createdAt'>;

export type StatsUpdateData = Partial<StatsCreateData>;

export type ListStatsDBParams = Pagination<Stats>;

export type ListStatsDBRes = PaginationResp<Stats>;
