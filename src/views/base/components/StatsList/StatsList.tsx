import { useStatsList } from '@/hooks/useStatsList';
import Table from '@/components/Table';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';

import { StatsRowHead } from './StatsRowHead';
import { StatsRow } from './StatsRow';

import type { Stats } from '@/lib/models/stats';

type StatsListProps = {
    owner: Stats['owner'];
};

export const StatsList = ({ owner }: StatsListProps) => {
    const pagination = useStatsList(owner);

    const { items, isLoading, error } = pagination;

    return (
        <Table.Container>
            <Table.Pagination {...pagination} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Head>
                        <StatsRowHead />
                    </Table.Head>
                    <Table.Body>
                        {items.map((stats) => (
                            <StatsRow key={stats.id} {...stats} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
