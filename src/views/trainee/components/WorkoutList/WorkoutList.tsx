import { useUser } from 'context/auth';

import Table from 'components/Table';
import { useWorkouts } from 'hooks/useWorkouts';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { WorkoutRow } from './WorkoutRow';

export const WorkoutList = () => {
    const { user } = useUser();

    const pagination = useWorkouts(user.username);

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
