import { useEffect, useState } from 'react';
import {
    Area,
    XAxis,
    Tooltip,
    AreaChart,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

import { Workout } from 'lib/models/workout';

interface ChartDate {
    point: string;
    amount: 0,
}

interface ChartProps {
    workouts: Workout[];
}

export const Chart = ({ workouts }: ChartProps) => {
    const [data, setData] = useState<ChartDate[]>([]);

    useEffect(() => {
        const points: string[] = [];

        const addEmptyMonths = () => {
            const today = dayjs();

            for (let i = 6; i >= 0; i -= 1) {
                const point = today.subtract(i, 'd').format('D.MM');
                points.push(point);
                setData((chartData) => [...chartData, { point, amount: 0 }]);
            }
            const pointAfterToday = today.add(1, 'd').format('D.MM');
            points.push(pointAfterToday);
            setData((chartData) => [...chartData, { point: pointAfterToday, amount: 0 }]);
        };

        const addWorkoutsPerMonth = () => {
            // workouts.forEach(({ date }) => {
            //     const point = dayjs(date).format('D.MM');
            //     const index = points.indexOf(point);

            //     if (index !== -1) {
            //         setData((chartData) => {
            //             chartData[index].amount += 1;

            //             return chartData;
            //         });
            //     }
            // });
        };

        setData([]);
        addEmptyMonths();

        if (workouts.length > 0) {
            addWorkoutsPerMonth();
        }
    }, [workouts]);

    return (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient
                        id="colorUv"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="5%" stopColor="#FFB7E4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FFB7E4" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="point"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#FFB7E4', fontSize: 10 }}
                    interval={0}
                    padding={{ left: 5, right: 5 }}
                />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#de8cbf"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
