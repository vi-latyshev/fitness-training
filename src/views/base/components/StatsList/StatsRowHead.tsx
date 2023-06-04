import { statsTypeList, StatsTypeToHuman } from '@/lib/models/stats';
import Table from '@/components/Table';

export const StatsRowHead = () => (
    <Table.Row border={false}>
        {statsTypeList.map((type) => (
            <Table.Cell key={type}>
                {StatsTypeToHuman[type]}
            </Table.Cell>
        ))}
    </Table.Row>
);
