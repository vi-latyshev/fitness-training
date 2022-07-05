import { useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { useUser } from 'context/auth';

import Table from 'components/Table';

import type { User } from 'lib/models/user';

interface UsersRowProps {
    user: User;
}

export const UsersRow = ({ user }: UsersRowProps) => {
    const router = useRouter();
    const { user: currUser } = useUser();

    const {
        username,
        firstName,
        lastName,
        role,
        createdAt,
    } = user;

    const isCurrUser = username === currUser.username;

    const handleUserClick = useCallback(() => {
        router.push(`/admin/users/${username}`);
    }, [username]);

    return (
        <Table.Row
            key={username}
            disabled={isCurrUser}
        >
            <Table.Cell
                disabled={isCurrUser}
                onClick={handleUserClick}
                className="w-1/5 cursor-pointer"
            >
                {username}
                {isCurrUser ? ' (Это Вы)' : null}
            </Table.Cell>
            <Table.Cell
                disabled={isCurrUser}
                onClick={handleUserClick}
                className="w-1/5 cursor-pointer"
            >
                {firstName}
            </Table.Cell>
            <Table.Cell
                full
                disabled={isCurrUser}
                onClick={handleUserClick}
                className="cursor-pointer"
            >
                {lastName}
            </Table.Cell>
            <Table.Cell disabled={isCurrUser}>
                {role}
            </Table.Cell>
            <Table.Cell disabled={isCurrUser}>
                {dayjs(createdAt).format('LLL')}
            </Table.Cell>
        </Table.Row>
    );
};
