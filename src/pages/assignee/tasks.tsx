import { UserRole } from '@/lib/models/user';
import { TraineeBaseLayout } from '@/views/trainee';
// import { WorkoutList } from '@/views/trainee/components';
import Card from '@/components/Card';

import type { NextPageWithLayout } from '@/views/base';

const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <Card.Title>Список задач</Card.Title>
            {/* <WorkoutList /> */}
        </Card.Card>
    </Card.Container>
);

TraineeWorkout.layoutProps = {
    meta: {
        title: 'Задачи',
    },
    auth: {
        needRole: UserRole.ASSIGNEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeWorkout;
