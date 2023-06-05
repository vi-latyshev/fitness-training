import type { User } from '../user';
import type { Pagination, PaginationResp } from '@/lib/api/redis/types';

export enum TaskColor {

}

export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done',
    Hold = 'Hold',
}

// type TaskStatusType = {
//     title: string;
//     color: TaskColor;
// };
// type TaskStatusesType = {
//     [K in TaskStatus]: TaskStatusType;
// };

export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
    description?: string;
    createdAt: number;
    dueDate?: number;
    status: TaskStatus;
    reporter: User['username'];
    assignee: User['username'];
};

export type TaskCreateDataDB = Omit<Task, 'id'>;

export type TaskCreateData = Omit<TaskCreateDataDB, 'reporter' | 'createdAt'>;

export type TaskUpdateData = Partial<Omit<Task, 'id' | 'reporter' | 'createdAt'>>;

export type TaskListDBParams = Pagination<Task>;

export type TaskListDBRes = PaginationResp<Task>;
