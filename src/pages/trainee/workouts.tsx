import { UserRole } from 'lib/models/user';
import { workouts } from 'lib/models/workout';

import { TraineeBaseLayout } from 'views/trainee';
import { WorkoutList } from 'views/trainee/WorkoutList';

import Card from 'components/Card';
import { Stats } from 'components/Stats';

import type { NextPageWithLayout } from 'views/base';

const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 md:grid-cols-5">
        <Card.Card className="col-span-1 md:col-span-3">
            <Card.Title>Список тренировок</Card.Title>
            <WorkoutList />
        </Card.Card>
        <Stats workouts={workouts} className="col-span-1 md:col-span-2" />
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
