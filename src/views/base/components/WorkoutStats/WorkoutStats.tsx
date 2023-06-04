import { useWorkouts } from '@/hooks/useWorkouts';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';

import type { Workout } from '@/lib/models/workout';

type WorkoutStatsProps = {
    owner: Workout['owner'];
};

export const WorkoutStats = ({ owner }: WorkoutStatsProps) => {
    const pagination = useWorkouts(owner);

    const { items, isLoading, error } = pagination;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <div className="space-y-1">
                <div className="text-sm">Всего</div>
                <div className="font-bold text-6xl">
                    {items.length}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-sm">Выполнено</div>
                <div className="font-bold text-6xl">
                    {items.filter((workout) => workout.isDone).length}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-sm">Осталось</div>
                <div className="font-bold text-6xl">
                    {items.filter((workout) => !workout.isDone).length}
                </div>
            </div>
        </SwrLoadingHandle>
    );
};
