import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { APIErrorJSON } from 'lib/api/error';
import type { Stats } from 'lib/models/stats';
import type { FetchDiffStatsRes } from 'lib/api/routes/stats/diff';

type UseDiffStatsResult = {
    stats: FetchDiffStatsRes;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<FetchDiffStatsRes>;
};

export const useDiffStats = (owner: Stats['owner']): UseDiffStatsResult => {
    const {
        data,
        error,
        mutate,
    } = useSWR<FetchDiffStatsRes, APIErrorJSON>(
        typeof owner === 'string' ? `/api/stats/${owner}/diff` : null,
        { revalidateOnMount: true },
    );

    return {
        stats: data ?? {} as FetchDiffStatsRes,
        error,
        isLoading: !error && !data,
        mutate,
    };
};
