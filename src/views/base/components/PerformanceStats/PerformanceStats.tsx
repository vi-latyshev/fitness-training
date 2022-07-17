import clsx from 'clsx';

import { statsTypeList } from 'lib/models/stats';

import { useDiffStats } from 'hooks/useDiffStats';

import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { StatsItem } from './StatsItem';

import type { Stats } from 'lib/models/stats';

interface PerformanceStatsProps {
    owner: Stats['owner'];
    className?: string;
}

export const PerformanceStats = ({ owner, className }: PerformanceStatsProps) => {
    const { stats, isLoading, error } = useDiffStats(owner);

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <div className={clsx('grid gap-6', className)}>
                {statsTypeList.map((type) => (
                    <StatsItem key={type} statType={type} diffStats={stats} />
                ))}
            </div>
        </SwrLoadingHandle>
    );
};
