import { UserRole } from '@/lib/models/user';
import { TraineeBaseLayout } from '@/views/trainee';
import Card from '@/components/Card';
import { TasksList } from '@/views/trainee/components/TasksList';

import type { NextPageWithLayout } from '@/views/base';

const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <Card.Title>Список задач</Card.Title>
            <TasksList />
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
