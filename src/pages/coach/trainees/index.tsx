import { UserRole } from 'lib/models/user';

import { CoachBaseLayout } from 'views/coach';
import { TraineesList } from 'views/coach/components';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const CoachTrainees: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1">
        <Card.Card className="col-span-1">
            <TraineesList />
        </Card.Card>
    </Card.Container>
);

CoachTrainees.layoutProps = {
    meta: {
        title: 'Ученики',
    },
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: CoachBaseLayout,
};

export default CoachTrainees;
