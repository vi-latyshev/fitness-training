import { UserRole } from 'lib/models/user';
import { TraineeBaseLayout } from 'views/trainee';
import { Dashboard } from 'components/Dashboard';

import type { NextPageWithLayout } from 'views/home';

export const TraineeWorkout: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Тренировки</Dashboard.Title>
        <Dashboard.Main>
            test
        </Dashboard.Main>
    </>
);

TraineeWorkout.layoutProps = {
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeWorkout;
