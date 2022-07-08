import type { Pagination, PaginationResp } from 'lib/api/redis/types';
import type { User } from '../user';

export enum WorkoutsCountType {
    Amount = 'amount',
    Time = 'time',
}

export type Workout = {
    id: string;
    name: string;
    owner: User['username'],
    countsType: WorkoutsCountType,
    countsValue: number;
    date: number;
    isDone?: boolean;
};

export type WorkoutCreateDataDB = Omit<Workout, 'id'>;

export type WorkoutCreateData = Omit<WorkoutCreateDataDB, 'owner' | 'isDone'>;

export type ListWorkoutsDBParams = Pagination<Workout>;

export type ListWorkoutsDBRes = PaginationResp<Workout>;
