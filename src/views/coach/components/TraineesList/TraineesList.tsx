import { useUsers } from 'hooks/useUsers';

import { SwrLoadingHandle } from 'components/SwrLoadingHandle';
import Table from 'components/Table';

import { TraineesRow } from './TraineesRow';

export const TraineesList = () => {
    const pagination = useUsers();

    const { items, isLoading, error } = pagination;

    return (
        <Table.Container>
            <Table.Pagination {...pagination} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Head>
                        <Table.Row disabled border={false}>
                            <Table.Cell>Имя пользователя</Table.Cell>
                            <Table.Cell>Имя</Table.Cell>
                            <Table.Cell>Фамилия</Table.Cell>
                            <Table.Cell>Дата регистрации</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((tableUser) => (
                            <TraineesRow key={tableUser.username} user={tableUser} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
