import { usePagination } from '@/hooks/usePagination';

import type { UsePaginationResult } from '@/hooks/usePagination';
import type { Task } from '@/lib/models/task';

export const useTasks = (assignee?: Task['assignee']): UsePaginationResult<Task, Task> => {
    const pagination = usePagination<Task>('/api/tasks', { filter: { assignee } });

    return pagination;
};
