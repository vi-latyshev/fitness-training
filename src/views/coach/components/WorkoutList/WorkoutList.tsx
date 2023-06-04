import { useWorkouts } from '@/hooks/useWorkouts';
import Table from '@/components/Table';
import { SwrLoadingHandle } from '@/components/SwrLoadingHandle';

import { WorkoutRow } from './WorkoutRow';

import type { Workout } from '@/lib/models/workout';

interface WorkoutListProps {
    owner: Workout['owner'];
}

export const WorkoutList = ({ owner }: WorkoutListProps) => {
    const pagination = useWorkouts(owner);

    const { items, isLoading, error } = pagination;

    return (
        <Table.Container>
            <Table.Pagination {...pagination} />
            <SwrLoadingHandle isLoading={isLoading} error={error}>
                <Table.Table>
                    <Table.Body>
                        {items.map((workout) => (
                            <WorkoutRow key={workout.id} {...workout} />
                        ))}
                    </Table.Body>
                </Table.Table>
            </SwrLoadingHandle>
        </Table.Container>
    );
};
