import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

import { calculateFullStatsDiff } from 'lib/models/stats';

import Table from 'components/Table';

import type { FetchFullStatsUserResData } from 'lib/api/routes/users/stats';

interface FullStatsRowProps {
    userStats: FetchFullStatsUserResData;
}

export const FullStatsRow = ({ userStats }: FullStatsRowProps) => {
    const router = useRouter();

    const {
        user,
        wourkoutsCount,
        statsCount,
        statsDiff,
    } = userStats;
    const { username, firstName, lastName } = user;

    const fullDiffPercent = calculateFullStatsDiff(statsDiff);

    const handleUserClick = useCallback(() => {
        router.push(`/reporter/assignees/${username}`);
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
                {wourkoutsCount}
            </Table.Cell>
            <Table.Cell
                full
                onClick={handleUserClick}
                className="cursor-pointer text-right"
            >
                {statsCount}
            </Table.Cell>
            <Table.Cell
                full
                onClick={handleUserClick}
                className="cursor-pointer text-right"
            >
                <div className="flex items-center justify-end">
                    {fullDiffPercent}%
                    {fullDiffPercent > 0 && (
                        <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                    )}
                    {fullDiffPercent < 0 && (
                        <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                    )}
                </div>
            </Table.Cell>
        </Table.Row>
    );
};
