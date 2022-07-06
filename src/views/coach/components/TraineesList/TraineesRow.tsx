import { useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import Table from 'components/Table';

import type { User } from 'lib/models/user';

interface TraineesRowProps {
    user: User;
}

export const TraineesRow = ({ user }: TraineesRowProps) => {
    const router = useRouter();

    const {
        username,
        firstName,
        lastName,
        createdAt,
    } = user;

    const handleUserClick = useCallback(() => {
        router.push(`/coach/trainees/${username}`);
    }, [username]);

    return (
        <Table.Row
            key={username}
        >
            <Table.Cell
                onClick={handleUserClick}
                className="w-1/5 cursor-pointer"
            >
                {username}
            </Table.Cell>
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
            <Table.Cell>
                {dayjs(createdAt).format('LLL')}
            </Table.Cell>
        </Table.Row>
    );
};
