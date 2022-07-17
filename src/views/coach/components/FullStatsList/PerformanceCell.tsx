import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

import { calculateFullStatsDiff } from 'lib/models/stats';

import { useDiffStats } from 'hooks/useDiffStats';

import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import type { Stats } from 'lib/models/stats';

interface PerformanceCellProps {
    username: Stats['owner'];
}

export const PerformanceCell = ({ username }: PerformanceCellProps) => {
    const {
        stats,
        isLoading: statsIsLoading,
        error: statsError,
    } = useDiffStats(username);

    const fullDiffPercent = calculateFullStatsDiff(stats);

    return (
        <SwrLoadingHandle isLoading={statsIsLoading} error={statsError}>
            <div className="flex items-center justify-end">
                {fullDiffPercent}%
                {fullDiffPercent > 0 && (
                    <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                )}
                {fullDiffPercent < 0 && (
                    <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                )}
            </div>
        </SwrLoadingHandle>
    );
};
