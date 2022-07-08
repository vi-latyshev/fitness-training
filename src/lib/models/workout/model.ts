import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { User } from '../user';

export enum WorkoutsCountType {
    Amount = 'amount',
    Time = 'time',
}

export type Workout = {
    id: string;
    name: string;
    countsType: WorkoutsCountType,
    countsValue: number;
    date: number;
    isDone?: boolean;
};

export type WorkoutOwner = {
    owner: User['username'];
};

export type WorkoutWithOwner = Workout & WorkoutOwner;

export type WorkoutCreateDataDB = Omit<WorkoutWithOwner, 'id'>;

export type WorkoutCreateData = Omit<WorkoutCreateDataDB, 'isDone'>;

export type ListWorkoutsDBParams = Pagination<WorkoutWithOwner, WorkoutOwner>;

export type ListWorkoutsDBRes = PaginationResp<Workout>;
