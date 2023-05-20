import { useRouter } from 'next/router';

import { UserRole } from 'lib/models/user';

import { CoachBaseLayout } from 'views/coach';
import { WorkoutList } from 'views/coach/components';
// import { PerformanceStats } from 'views/base/components/PerformanceStats';
// import { StatsList } from 'views/base/components/StatsList';

import { useUserByUsername } from 'hooks/useUserByUsername';

import { MetaTitle } from 'components/MetaTitle';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const CoachTraineePick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    const { user, isLoading, error } = useUserByUsername(query.username);

    const { username, firstName, lastName } = user;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <MetaTitle title={`${firstName} ${lastName}`} />
            <Dashboard.Title>
                {firstName} {lastName} ({username})
            </Dashboard.Title>
            <Dashboard.Title>Задачи</Dashboard.Title>
            <Card.Container>
                <Card.Card>
                    <Card.Title>Список задач</Card.Title>
                    {/* <AddWorkout owner={username} /> */}
                    <WorkoutList owner={username} />
                </Card.Card>
            </Card.Container>
            {/* <Dashboard.Title>Показатели</Dashboard.Title>
            <Card.Container className="grid-cols-1">
                <Card.Card>
                    <Card.Title>Статистика</Card.Title>
                    <PerformanceStats
                        owner={username}
                        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 auto-rows-max"
                    />
                </Card.Card>
                <Card.Card>
                    <Card.Title>Список показателей</Card.Title>
                    <StatsList owner={username} />
                </Card.Card>
            </Card.Container> */}
        </SwrLoadingHandle>
    );
};

CoachTraineePick.layoutProps = {
    auth: {
        needRole: UserRole.REPORTER,
    },
    Layout: CoachBaseLayout,
};

export default CoachTraineePick;
