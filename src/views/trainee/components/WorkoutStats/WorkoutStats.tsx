import { useUser } from 'context/auth';

import { WorkoutStats } from 'views/base/components/WorkoutStats';

export const WorkoutStatsSelf = () => {
    const { user } = useUser();

    return (
        <WorkoutStats owner={user.username} />
    );
};
