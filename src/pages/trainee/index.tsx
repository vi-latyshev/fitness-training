import { UserRole } from 'lib/models/user';
import { TraineeBaseLayout } from 'views/trainee';
import { Dashboard } from 'components/Dashboard';

import type { NextPageWithLayout } from 'views/home';

export const TraineeOverview: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Обзор</Dashboard.Title>
        <Dashboard.Main>
            test
        </Dashboard.Main>
    </>
);

TraineeOverview.layoutProps = {
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeOverview;
