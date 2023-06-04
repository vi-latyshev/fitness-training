import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

import { percent } from '@/utils/percent';
import {
    DiffStats,
    StatsTypeToHuman,
    calculateStatsDiff,
    statsTypeValueToHuman,
} from '@/lib/models/stats';

import type {
    DiffStatsData,
    StatsType,
} from '@/lib/models/stats';

interface StatsItemProps {
    statType: StatsType;
    diffStats: DiffStatsData;
}

export const StatsItem = ({
    statType,
    diffStats,
}: StatsItemProps) => {
    const start = diffStats.start?.[statType];
    const last = diffStats.last?.[statType];

    const diffState = calculateStatsDiff(statType, start, last);

    return (
        <div className="space-y-1">
            <div className="text-sm">{StatsTypeToHuman[statType]}</div>
            <div className="flex flex-row items-end font-bold text-xl space-x-1">
                <div>
                    {statsTypeValueToHuman(statType, start)}
                    {' '}
                    /
                    {' '}
                    {statsTypeValueToHuman(statType, last)}
                </div>
                <div className="flex flex-row text-lg">
                    {start && last ? `(${percent(start, last)}%)` : ''}
                </div>
                {diffState === DiffStats.UP && (
                    <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                )}
                {diffState === DiffStats.DOWN && (
                    <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                )}
            </div>
        </div>
    );
};
