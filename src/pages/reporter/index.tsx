import { UserRole } from '@/lib/models/user';
import { CoachBaseLayout } from '@/views/coach';
import Card from '@/components/Card';
import { TasksList } from '@/views/coach/components/TasksList';
import { AddTask } from '@/views/coach/components/AddTask';

import type { NextPageWithLayout } from '@/views/base';

const CoachDashboard: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <AddTask />
            <TasksList />
        </Card.Card>
    </Card.Container>
);

CoachDashboard.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.REPORTER,
    },
    Layout: CoachBaseLayout,
};

export default CoachDashboard;
