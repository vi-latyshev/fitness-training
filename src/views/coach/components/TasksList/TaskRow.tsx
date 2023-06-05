import { memo, useCallback } from 'react';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';

import Table from '@/components/Table';
import { Button, Checkbox } from '@/components/controls';
import { useTasks } from '@/hooks/useTasks';
import { useUserByUsername } from '@/hooks/useUserByUsername';
import { getColorTaskStatus, TaskStatusTypeHuman } from '@/lib/models/task';

import type { RemoveTaskRes } from '@/lib/api/routes/tasks/remove';
import type { Task } from '@/lib/models/task';

interface TaskRowProps extends Task {
    showUser?: boolean;
}

export const TaskRow = memo(({
    id,
    assignee,
    title,
    status,
    showUser,
}: TaskRowProps): JSX.Element => {
    const { mutate } = useTasks(assignee);
    const { user, isLoading: userIsLoading, error: userError } = useUserByUsername(showUser ? assignee : null);

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
        <Table.Row>
            <Table.Cell>
                <Checkbox disabled />
            </Table.Cell>
            <Table.Cell full>
                {title}
            </Table.Cell>
            {showUser && (
                <Table.Cell loading={userIsLoading}>
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
    );
});
