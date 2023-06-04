import type { Pagination, PaginationResp } from '@/lib/api/redis/types';
import type { User } from '../user';

export enum WorkoutsCountType {
    Amount = 'amount',
    Time = 'time',
    Distance = 'distance',
}

export type WorkoutId = string;

export type Workout = {
    id: WorkoutId;
    name: string;
    owner: User['username'];
    countsType: WorkoutsCountType;
    countsValue: number;
    createdAt: number;
    isDone?: boolean;
};

export type WorkoutCreateDataDB = Omit<Workout, 'id'>;

export type WorkoutCreateData = Omit<WorkoutCreateDataDB, 'owner' | 'createdAt'>;

export type WorkoutUpdateData = Partial<Omit<WorkoutCreateDataDB, 'name' | 'owner' | 'createdAt'>>;

export type WorkoutCountRes = number;

export type ListWorkoutsDBParams = Pagination<Workout>;

export type ListWorkoutsDBRes = PaginationResp<Workout>;
