import { UserRole } from '@/lib/models/user';
import Card from '@/components/Card';
import { EnginesBaseLayout } from '@/views/engines';
import { EnginesList } from '@/views/engines/components/EnginesList';
import { EngineAdd } from '@/views/engines/components/EngineAdd';

import type { NextPageWithLayout } from '@/views/base';

const EnginesDashboard: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <EngineAdd />
            <EnginesList />
        </Card.Card>
    </Card.Container>
);

EnginesDashboard.layoutProps = {
    meta: {
        title: 'Двигатели',
    },
    auth: {
        needRole: UserRole.MASTER,
    },
    Layout: EnginesBaseLayout,
};

export default EnginesDashboard;
