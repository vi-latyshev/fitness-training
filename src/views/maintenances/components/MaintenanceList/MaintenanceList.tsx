import Card from '@/components/Card';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import Table from '@/components/Table';
import { useMaintenances } from '@/hooks/useMaintenances';

import type { EngineId } from '@/lib/models/engine';

type MaintanceListProps = {
    engineId: EngineId;
    limit?: number;
};

export const MaintanceList = ({ engineId, limit }: MaintanceListProps): React.ReactElement => {
    const maintances = useMaintenances(engineId, limit);

    const { items, isLoading, error } = maintances;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <Card.Container>
                <Table.Pagination {...maintances} />
                {items.map((item) => (
                    <Card.Card key={`${engineId}${item.id}`}>
                        <Card.Title center>Техническое обслуживание №{item.id}</Card.Title>
                    </Card.Card>
                ))}
            </Card.Container>
        </SwrLoadingHandle>
    );
};
