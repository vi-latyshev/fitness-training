import { useRouter } from 'next/router';

import { UserRole } from 'lib/models/user';

import { CoachBaseLayout } from 'views/coach';

import { useUserByUsername } from 'hooks/useUserByUsername';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const CoachTraineePick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    const { user, isLoading, error } = useUserByUsername(query.id);

    const { username, firstName, lastName } = user;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <Dashboard.Title>
                {firstName} {lastName} ({username})
            </Dashboard.Title>
            <Card.Container className="grid-cols-1 md:grid-cols-5">
                <Card.Card className="col-span-1 md:col-span-3">
                    <Card.Title>Список тренировок</Card.Title>
                </Card.Card>
            </Card.Container>
        </SwrLoadingHandle>
    );
};

CoachTraineePick.layoutProps = {
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: CoachBaseLayout,
};

export default CoachTraineePick;
