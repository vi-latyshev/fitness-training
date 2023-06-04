import { statsTypeList, statsTypeValueToHuman } from '@/lib/models/stats';
import Table from '@/components/Table';

import type { Stats } from '@/lib/models/stats';

type StatsRowProps = Stats;

export const StatsRow = ({ ...stats }: StatsRowProps) => (
    <Table.Row>
        {statsTypeList.map((type) => (
            <Table.Cell key={type}>
                {statsTypeValueToHuman(type, stats[type])}
            </Table.Cell>
        ))}
    </Table.Row>
);
