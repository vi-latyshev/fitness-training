import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useCountWorkouts } from 'hooks/useCountWorkouts';
import { useCountStats } from 'hooks/useCountStats';

import Table from 'components/Table';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';

import { PerformanceCell } from './PerformanceCell';

import type { User } from 'lib/models/user';

interface FullStatsRowProps {
    user: User;
}

export const FullStatsRow = ({ user }: FullStatsRowProps) => {
    const router = useRouter();

    const {
        username,
        firstName,
        lastName,
    } = user;

    const {
        wourkoutsCount,
        isLoading: wourkoutsCountIsLoading,
        error: wourkoutsCountError,
    } = useCountWorkouts(username);

    const {
        statsCount,
        isLoading: statsCountIsLoading,
        error: statsCountError,
    } = useCountStats(username);

    const handleUserClick = useCallback(() => {
        router.push(`/coach/trainees/${username}`);
    }, [username]);

    return (
        <Table.Row key={username}>
            <Table.Cell
                onClick={handleUserClick}
                className="w-1/5 cursor-pointer"
            >
                {firstName}
            </Table.Cell>
            <Table.Cell
                full
                onClick={handleUserClick}
                className="cursor-pointer"
            >
                {lastName}
            </Table.Cell>
            <Table.Cell
                onClick={handleUserClick}
                className="w-1/5 cursor-pointer text-right"
            >
                <SwrLoadingHandle isLoading={wourkoutsCountIsLoading} error={wourkoutsCountError}>
                    {wourkoutsCount}
                </SwrLoadingHandle>
            </Table.Cell>
            <Table.Cell
                full
                onClick={handleUserClick}
                className="cursor-pointer text-right"
            >
                <SwrLoadingHandle isLoading={statsCountIsLoading} error={statsCountError}>
                    {statsCount}
                </SwrLoadingHandle>
            </Table.Cell>
            <Table.Cell
                full
                onClick={handleUserClick}
                className="cursor-pointer text-right"
            >
                <PerformanceCell username={username} />
            </Table.Cell>
        </Table.Row>
    );
};
