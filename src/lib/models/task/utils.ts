import { TaskStatus } from './model';

export const taskStatusTypeList = Object.values(TaskStatus);

type TaskStatusTypeHumanType = {
    [T in TaskStatus]: string;
};

export const TaskStatusTypeHuman: TaskStatusTypeHumanType = {
    [TaskStatus.ToDo]: 'Открыто',
    [TaskStatus.InProgress]: 'В разработке',
    [TaskStatus.Done]: 'Завершено',
    [TaskStatus.Hold]: 'Отложено',
};
