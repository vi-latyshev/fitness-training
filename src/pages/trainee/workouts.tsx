import { UserRole } from 'lib/models/user';
import { workouts, WorkoutsStatus } from 'lib/models/workout';

import { TraineeBaseLayout } from 'views/trainee';
import { WorkoutList } from 'views/trainee/WorkoutList';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/home';

export const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 md:grid-cols-4">
        <Card.Card className="col-span-1 md:col-span-3">
            <Card.Title>Список тренировок</Card.Title>
            <WorkoutList />
        </Card.Card>
        <Card.Card className="col-span-1">
            <Card.Title>Успеваемость</Card.Title>
            <div className="space-y-1">
                <h5 className="text-sm">Всего</h5>
                <h3 className="font-bold text-6xl">
                    {workouts.length}
                </h3>
            </div>
            <div className="space-y-1">
                <h5 className=" text-sm text-primary">Выполнено</h5>
                <h3 className="font-bold text-6xl text-primary">
                    {workouts.filter((workout) => workout.status === WorkoutsStatus.Done).length}
                </h3>
            </div>
            <div className="space-y-1">
                <h5 className="text-sm text-primary">Осталось</h5>
                <h3 className="font-bold text-6xl text-primary">
                    {workouts.filter((workout) => workout.status === WorkoutsStatus.UnDone).length}
                </h3>
            </div>
        </Card.Card>
    </Card.Container>
);

TraineeWorkout.layoutProps = {
    meta: {
        title: 'Тренировки',
    },
    Layout: TraineeBaseLayout,
    auth: {
        needRole: UserRole.TRAINEE,
    },
};

export default TraineeWorkout;
