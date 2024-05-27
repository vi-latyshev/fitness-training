import Card from '@/components/Card';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';
import Table from '@/components/Table';
import { useMaintenances } from '@/hooks/useMaintenances';

import { MaintenanceItem } from './MaintenanceItem';

import type { EngineId } from '@/lib/models/engine';

type MaintanceListProps = {
    engineId: EngineId;
    limit?: number;
    pagination?: boolean
};

export const MaintanceList = ({ engineId, limit, pagination = true }: MaintanceListProps): React.ReactElement => {
    const maintances = useMaintenances(engineId, { limit });

    const { items, isLoading, error } = maintances;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <Card.Container className="gap-8">
                {pagination && <Table.Pagination {...maintances} />}
                {items.map((item) => (
                    <MaintenanceItem
                        key={`${engineId}${item.id}`}
                        engineId={engineId}
                        maintenance={item}
                    />
                ))}
                {pagination && items.length > 2 && <Table.Pagination {...maintances} />}
            </Card.Container>
        </SwrLoadingHandle>
    );
};
