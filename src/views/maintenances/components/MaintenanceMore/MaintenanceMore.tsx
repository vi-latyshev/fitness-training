import { Link } from '@/components/controls';

import type { EngineId } from '@/lib/models/engine';

type MaintenanceMoreProps = {
    engineId: EngineId;
};

export const MaintenanceMore = ({ engineId }: MaintenanceMoreProps): React.ReactElement => (
    <Link
        full
        variant="soft"
        href={`/engines/${engineId}/maintenances`}
    >
        История предыдущих технических обслуживаний
    </Link>
);
