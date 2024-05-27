import { useRouter } from 'next/router';

import { UserRole } from '@/lib/models/user';
import { EnginesBaseLayout } from '@/views/engines';
import Card from '@/components/Card';
import { MaintanceList } from '@/views/maintenances';

import type { EngineId } from '@/lib/models/engine';
import type { NextPageWithLayout } from '@/views/base';

const MaintenancesPick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    return (
        <Card.Container>
            <Card.Card className="bg-grayPrimary">
                <MaintanceList engineId={query.engineId as EngineId} />
            </Card.Card>
        </Card.Container>
    );
};

MaintenancesPick.layoutProps = {
    meta: {
        title: 'История технических обслуживаний',
    },
    auth: {
        needRole: UserRole.MASTER,
    },
    Layout: EnginesBaseLayout,
};

export default MaintenancesPick;
