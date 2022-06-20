import { UserRole } from 'lib/models/user';
import { CoachBaseLayout } from 'views/coach';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/home';

export const CoachDashboard: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Обзор</Dashboard.Title>
        <Card.Container>
            тренер
        </Card.Container>
    </>
);

CoachDashboard.layoutProps = {
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: CoachBaseLayout,
};

export default CoachDashboard;
