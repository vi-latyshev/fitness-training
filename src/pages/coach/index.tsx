import { UserRole } from 'lib/models/user';
import { CoachBaseLayout } from 'views/coach';
import { Dashboard } from 'components/Dashboard';

import type { NextPageWithLayout } from 'views/home';

export const CoachDashboard: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Обзор</Dashboard.Title>
        <Dashboard.Main>
            тренер
        </Dashboard.Main>
    </>
);

CoachDashboard.layoutProps = {
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: CoachBaseLayout,
};

export default CoachDashboard;
