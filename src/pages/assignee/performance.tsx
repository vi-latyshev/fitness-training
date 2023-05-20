import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';
import { PerformanceStatsSelf, AddStats } from 'views/trainee/components';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const TraineePerformance: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-5">
        <Card.Card className="col-span-5 2xl:col-span-3">
            <Card.Title>Ввод текущих показателей</Card.Title>
            <AddStats />
        </Card.Card>
        <Card.Card className="col-span-5 2xl:col-span-2">
            <PerformanceStatsSelf />
        </Card.Card>
        <Card.Card className="col-span-5">
            <Card.Title>Список показателей</Card.Title>
            {/* <StatsListSelf /> */}
        </Card.Card>
    </Card.Container>
);

TraineePerformance.layoutProps = {
    meta: {
        title: 'Показатели',
    },
    auth: {
        needRole: UserRole.ASSIGNEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineePerformance;
