import Table from 'components/Table';

import { useWorkoutFilter } from './hooks/useWorkoutFilter';
import { ListTabs } from './ListTabs';
import { WorkoutRow } from './WorkoutRow';

export const WorkoutList = () => {
    const [workouts, filter, setWorkoutFilter] = useWorkoutFilter();

    return (
        <div className="space-y-6">
            <Table.Container>
                <ListTabs filter={filter} handleChange={setWorkoutFilter} />
                <Table.Body>
                    {workouts.map((workout) => (
                        <WorkoutRow key={workout.id} workout={workout} />
                    ))}
                </Table.Body>
            </Table.Container>
        </div>
    );
};
