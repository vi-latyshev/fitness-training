import { UserRole } from 'lib/models/user';
import { TraineeBaseLayout } from 'views/trainee';
import { Dashboard } from 'components/Dashboard';

import type { NextPageWithLayout } from 'views/home';

export const TraineeAccount: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Аккаунт</Dashboard.Title>
        <Dashboard.Main>
            test
        </Dashboard.Main>
    </>
);

TraineeAccount.layoutProps = {
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeAccount;
