import { TaskStatus } from './model';

import type { ButtonProps } from '@/components/controls';

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

export const getColorTaskStatus = (status: TaskStatus): ButtonProps['color'] => {
    if (status === TaskStatus.Hold) {
        return 'default';
    }
    if (status === TaskStatus.ToDo) {
        return 'error';
    }
    if (status === TaskStatus.InProgress) {
        return 'warning';
    }
    if (status === TaskStatus.Done) {
        return 'success';
    }

    return 'default';
};
