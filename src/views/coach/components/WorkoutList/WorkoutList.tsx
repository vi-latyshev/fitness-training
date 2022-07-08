import { usePagination } from 'hooks/usePagination';

import Table from 'components/Table';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { WorkoutRow } from './WorkoutRow';

import type { User } from 'lib/models/user';
import type { Workout } from 'lib/models/workout';

interface WorkoutListProps {
    owner: User['username'];
}

export const WorkoutList = ({ owner }: WorkoutListProps) => {
    const pagination = usePagination<Workout>(`/api/workouts/${owner}`);

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
