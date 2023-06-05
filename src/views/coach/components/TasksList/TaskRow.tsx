import { memo, useCallback, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';

import Table from '@/components/Table';
import { Button, Checkbox } from '@/components/controls';
import { useTasks } from '@/hooks/useTasks';
import { useUserByUsername } from '@/hooks/useUserByUsername';
import { getColorTaskStatus, TaskStatusTypeHuman } from '@/lib/models/task';

import { TaskEditor } from '../Task';

import type { RemoveTaskRes } from '@/lib/api/routes/tasks/remove';
import type { Task } from '@/lib/models/task';

interface TaskRowProps extends Task {
    showUser?: boolean;
}

export const TaskRow = memo((task: TaskRowProps): JSX.Element => {
    const {
        id,
        assignee,
        title,
        status,
        showUser,
    } = task;

    const { mutate } = useTasks(assignee);
    const { user, isLoading: userIsLoading, error: userError } = useUserByUsername(showUser ? assignee : null);

    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    const handleRemoveTask = useCallback(async () => {
        try {
            await axios.delete<RemoveTaskRes>(`/api/tasks/t/${id}`);
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
    }, [id, mutate]);

    return (
        <>
            <TaskEditor open={isModelOpen} task={task} onClose={handleToggleModal} />
            <Table.Row>
                <Table.Cell onClick={handleToggleModal} className="cursor-pointer">
                    <Checkbox disabled />
                </Table.Cell>
                <Table.Cell full onClick={handleToggleModal} className="cursor-pointer">
                    {title}
                </Table.Cell>
                {showUser && (
                    <Table.Cell loading={userIsLoading} onClick={handleToggleModal} className="cursor-pointer">
                        {userError && <p className="text-error text-sm">{userError.message}</p>}
                        {user.firstName}{' '}{user.lastName}
                    </Table.Cell>
                )}
                <Table.Cell>
                    <Button
                        full
                        hover={false}
                        variant="soft"
                        color={getColorTaskStatus(status)}
                    >
                        {TaskStatusTypeHuman[status] ?? '-'}
                    </Button>
                </Table.Cell>
                <Table.Cell className="px-1">
                    <Button
                        color="error"
                        variant="text"
                        Icon={<XIcon />}
                        className="px-5"
                        onClick={handleRemoveTask}
                    />
                </Table.Cell>
            </Table.Row>
        </>
    );
});
