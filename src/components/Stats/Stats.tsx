import clsx from 'clsx';

import Card from 'components/Card';

import { Chart } from './Chart';

import type { Workout } from 'lib/models/workout';

interface StatsProps {
    workouts: Workout[];
    className?: string;
}

export const Stats = ({ workouts, className }: StatsProps) => (
    <Card.Card className={clsx(className, 'bg-primary text-white')}>
        <Card.Title>Успеваемость</Card.Title>
        <div className="space-y-1">
            <div className="text-sm">Всего</div>
            <div className="font-bold text-6xl">
                {workouts.length}
            </div>
        </div>
        <div className="space-y-1">
            <div className="text-sm">Выполнено</div>
            <div className="font-bold text-6xl">
                {workouts.filter((workout) => workout.isDone === true).length}
            </div>
        </div>
        <div className="space-y-1">
            <div className="text-sm">Осталось</div>
            <div className="font-bold text-6xl">
                {workouts.filter((workout) => !workout.isDone).length}
            </div>
        </div>
        <Chart workouts={workouts} />
    </Card.Card>
);
