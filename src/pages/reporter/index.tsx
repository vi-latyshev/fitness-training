import { UserRole } from '@/lib/models/user';
import { CoachBaseLayout } from '@/views/coach';
import { FullStatsList } from '@/views/coach/components';
import Card from '@/components/Card';

import type { NextPageWithLayout } from '@/views/base';

const CoachDashboard: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            {/* <DownloadAllStats /> */}
            <FullStatsList />
        </Card.Card>
    </Card.Container>
);

CoachDashboard.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.REPORTER,
    },
    Layout: CoachBaseLayout,
};

export default CoachDashboard;
