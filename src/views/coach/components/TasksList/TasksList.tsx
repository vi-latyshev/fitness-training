import Table from '@/components/Table';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import { useTasks } from '@/hooks/useTasks';

import { TaskRow } from './TaskRow';

import type { Task } from '@/lib/models/task';

interface TasksListProps {
    assignee?: Task['assignee'];
}

export const TasksList = ({ assignee }: TasksListProps): JSX.Element => {
    const pagination = useTasks(assignee);

    const { items, isLoading, error } = pagination;

    return (
        <Table.Container>
            <Table.Pagination {...pagination} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Head>
                        <Table.Row disabled border={false}>
                            <Table.Cell />
                            <Table.Cell>Название</Table.Cell>
                            {!assignee && (
                                <Table.Cell>Исполнитель</Table.Cell>
                            )}
                            <Table.Cell>Статус</Table.Cell>
                            <Table.Cell />
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((task) => (
                            <TaskRow key={task.id} showUser={!assignee} {...task} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
