import { useUser } from '@/context/auth';
import Table from '@/components/Table';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import { useTasks } from '@/hooks/useTasks';

import { TaskRow } from './TaskRow';

export const TasksList = (): JSX.Element => {
    const { user } = useUser();

    const pagination = useTasks(user.username);

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
                            <Table.Cell>Статус</Table.Cell>
                            <Table.Cell />
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((task) => (
                            <TaskRow key={task.id} {...task} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
