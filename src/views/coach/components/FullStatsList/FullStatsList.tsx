import { useUsersStats } from '@/hooks/useUsersStats';
import Table from '@/components/Table';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';

import { FullStatsRow } from './FullStatsRow';

export const FullStatsList = () => {
    const pagination = useUsersStats();

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
                            {/* <Table.Cell>Кол-во упражнений</Table.Cell>
                            <Table.Cell>Кол-во показателей</Table.Cell>
                            <Table.Cell>Общая успеваемость</Table.Cell> */}
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((userStats) => (
                            <FullStatsRow key={userStats.user.username} userStats={userStats} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
