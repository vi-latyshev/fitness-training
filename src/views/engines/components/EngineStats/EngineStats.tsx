import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import dayjs from 'dayjs';

import type { EngineId } from '@/lib/models/engine';

type EngineStatsProps = {
    engineId: EngineId
};

type StatsByDates<T> = {
    byDay: T[];
    byWeek: T[];
    byMonth: T[];
};

const TEMPERATURES: StatsByDates<{ name: string, temperature: number }> = {
    byDay: [
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
    ],
    byWeek: [
        { name: dayjs('2024-05-21T15:50:12Z').format('DD.MM'), temperature: 66 },
        { name: dayjs('2024-05-22T15:50:12Z').format('DD.MM'), temperature: 70 },
        { name: dayjs('2024-05-23T15:50:12Z').format('DD.MM'), temperature: 83 },
        { name: dayjs('2024-05-24T15:50:12Z').format('DD.MM'), temperature: 95 },
        { name: dayjs('2024-05-25T15:50:12Z').format('DD.MM'), temperature: 117 },
        { name: dayjs('2024-05-26T15:50:12Z').format('DD.MM'), temperature: 71 },
        { name: dayjs('2024-05-27T15:50:12Z').format('DD.MM'), temperature: 68 },
    ],
    byMonth: [
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
        { name: dayjs('2024-05-29T15:50:12Z').format('DD.MM.YYYY'), temperature: 60 },
    ],
};

export const EngineStats = ({ engineId: _engineId }: EngineStatsProps): React.ReactElement => (
    <div className="w-full">
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                data={TEMPERATURES.byWeek}
                margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="natural"
                    dataKey="temperature"
                    name="temperature"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);
