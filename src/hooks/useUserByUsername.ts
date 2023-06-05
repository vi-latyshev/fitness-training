import useSWR from 'swr';

import type { KeyedMutator } from 'swr';
import type { APIErrorJSON } from '@/lib/api/error';
import type { FetchUserRes } from '@/lib/api/routes/users/fetch';

interface UseUserResult {
    user: FetchUserRes;
    error?: APIErrorJSON;
    isLoading: boolean;
    mutate: KeyedMutator<FetchUserRes>;
}

export const useUserByUsername = (username?: string | string[] | null): UseUserResult => {
    const {
        data,
        error,
        mutate,
    } = useSWR<FetchUserRes, APIErrorJSON>(
        typeof username === 'string' ? `/api/users/u/${username}` : null,
        { revalidateOnMount: true },
    );

    return {
        user: data ?? {} as FetchUserRes,
        error,
        isLoading: !error && !data,
        mutate,
    };
};
