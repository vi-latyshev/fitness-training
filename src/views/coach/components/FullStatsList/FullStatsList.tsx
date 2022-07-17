import { usePagination } from 'hooks/usePagination';

import Table from 'components/Table';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { FullStatsRow } from './FullStatsRow';

import type { User } from 'lib/models/user';

export const FullStatsList = () => {
    const pagination = usePagination<User>('/api/users');

    const { items, isLoading, error } = pagination;

    return (
        <Table.Container>
            <Table.Pagination {...pagination} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Head>
                        <Table.Row disabled border={false}>
                            <Table.Cell>Имя</Table.Cell>
                            <Table.Cell>Фамилия</Table.Cell>
                            <Table.Cell>Кол-во тренировок</Table.Cell>
                            <Table.Cell>Кол-во показателей</Table.Cell>
                            <Table.Cell>Общая успеваемость</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((tableUser) => (
                            <FullStatsRow key={tableUser.username} user={tableUser} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
