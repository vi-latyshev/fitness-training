import { useUser } from 'context/auth';

import { StatsList } from 'views/base/components/StatsList';

export const StatsListSelf = () => {
    const { user } = useUser();

    return (
        <StatsList owner={user.username} />
    );
};
