import { UserRole } from '@/lib/models/user';
import { TraineeBaseLayout } from '@/views/trainee';
import Card from '@/components/Card';
// import { PerformanceStatsSelf } from '@/views/trainee/components';

import type { NextPageWithLayout } from '@/views/base';

const TraineeOverview: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <Card.Title>Показатели</Card.Title>
            {/*
                <PerformanceStatsSelf
                className="grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 auto-rows-max" />
            */}
        </Card.Card>
    </Card.Container>
);

TraineeOverview.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.ASSIGNEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeOverview;
