import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { APIErrorJSON } from '@/lib/api/error';
import type { FetchEngineRes } from '@/lib/api/routes/engines/fetch';
import type { EngineId } from '@/lib/models/engine';

type UseEngineResult = {
    engine: FetchEngineRes;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<FetchEngineRes>;
};

export const useEngine = (engineId?: EngineId): UseEngineResult => {
    const {
        data,
        error,
        mutate,
    } = useSWR<FetchEngineRes, APIErrorJSON>(
        typeof engineId === 'string' ? `/api/engines/${engineId}` : null,
        { revalidateOnMount: true },
    );

    return {
        engine: data ?? {} as FetchEngineRes,
        error,
        isLoading: !error && !data,
        mutate,
    };
};
