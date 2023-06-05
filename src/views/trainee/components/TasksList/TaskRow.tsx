import axios from 'axios';
import { useCallback } from 'react';

import Table from '@/components/Table';
import { Button, Checkbox } from '@/components/controls';
import { getColorTaskStatus, TaskStatusTypeHuman, taskStatusTypeList } from '@/lib/models/task';
import { useTasks } from '@/hooks/useTasks';

import type { UpdateTaskRes } from '@/lib/api/routes/tasks/update';
import type { Task } from '@/lib/models/task';

interface TaskRowProps extends Task { }

export const TaskRow = ({
    id,
    assignee,
    title,
    status,
}: TaskRowProps): JSX.Element => {
    const { mutate } = useTasks(assignee);

    const handleDoneWorkout = useCallback(async () => {
        const findedIndex = taskStatusTypeList.indexOf(status);

        const nextStatus = findedIndex + 1 < taskStatusTypeList.length
            ? taskStatusTypeList[findedIndex + 1]
            : taskStatusTypeList[0];

        try {
            await axios.patch<UpdateTaskRes>(`/api/tasks/t/${id}`, { status: nextStatus });
            await mutate();
        } catch (error) {
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        }
    }, [id, mutate, status]);

    return (
        <Table.Row>
            <Table.Cell>
                <Checkbox disabled />
            </Table.Cell>
            <Table.Cell full>
                {title}
            </Table.Cell>
            <Table.Cell>
                <Button
                    full
                    hover={false}
                    variant="soft"
                    color={getColorTaskStatus(status)}
                    onClick={handleDoneWorkout}
                >
                    {TaskStatusTypeHuman[status] ?? '-'}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
