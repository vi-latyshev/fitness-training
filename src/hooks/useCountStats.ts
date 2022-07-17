import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { APIErrorJSON } from 'lib/api/error';
import type { Stats } from 'lib/models/stats';
import type { CountStatsRes } from 'lib/api/routes/stats/count';

type UseCountWorkoutsResult = {
    statsCount: CountStatsRes;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<CountStatsRes>;
};

export const useCountStats = (owner: Stats['owner']): UseCountWorkoutsResult => {
    const {
        data,
        error,
        mutate,
    } = useSWR<CountStatsRes, APIErrorJSON>(
        typeof owner === 'string' ? `/api/stats/${owner}/count` : null,
        { revalidateOnMount: true },
    );

    return {
        statsCount: data ?? 0,
        error,
        isLoading: error === undefined && data === undefined,
        mutate,
    };
};
