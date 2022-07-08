import { usePagination } from 'hooks/usePagination';

import Table from 'components/Table';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { WorkoutRow } from './WorkoutRow';

import type { User } from 'lib/models/user';
import type { Workout, WorkoutOwner } from 'lib/models/workout';

interface WorkoutListProps {
    username: User['username'];
}

export const WorkoutList = ({ username: owner }: WorkoutListProps) => {
    const pagination = usePagination<Workout, WorkoutOwner>('/api/workouts', { owner });

    const { items, isLoading, error } = pagination;
    console.log(items, 'items');

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
