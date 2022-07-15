import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';
import { WorkoutList, WorkoutStatsSelf } from 'views/trainee/components';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 md:grid-cols-4">
        <Card.Card className="col-span-1 md:col-span-3">
            <Card.Title>Список тренировок</Card.Title>
            <WorkoutList />
        </Card.Card>
        <Card.Card className="col-span-1 md:col-span-1">
            <WorkoutStatsSelf />
        </Card.Card>
    </Card.Container>
);

TraineeWorkout.layoutProps = {
    meta: {
        title: 'Тренировки',
    },
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeWorkout;
