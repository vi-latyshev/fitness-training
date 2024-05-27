import { useCallback } from 'react';
import Router from 'next/router';
import { XIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import axios from 'axios';

import { useUser } from '@/context/auth';
import { UserRole, UserRoleTypeHuman } from '@/lib/models/user';
import Table from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/controls';

import type { User } from '@/lib/models/user';
import type { RemoveUserRes } from '@/lib/api/routes/users/remove';

interface UsersRowProps {
    user: User;
}

export const UsersRow = ({ user }: UsersRowProps): JSX.Element => {
    const { user: currUser } = useUser();
    const { mutate } = useUsers();

    const {
        username,
        firstName,
        lastName,
        role,
        createdAt,
    } = user;

    const isCurrUser = username === currUser.username;

    const handleUserClick = useCallback(() => {
        Router.push(`/admin/users/${username}`);
    }, [username]);

    const handleUserRemove = useCallback(async () => {
        try {
            await axios.delete<RemoveUserRes>(`/api/users/u/${username}`);
            await mutate();
        } catch (error) {
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        }
    }, [username, mutate]);

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
                {UserRoleTypeHuman[role]}
                {' '}
                ({role})
            </Table.Cell>
            <Table.Cell disabled={isCurrUser}>
                {dayjs(createdAt).format('LLL')}
            </Table.Cell>
            <Table.Cell className="px-1">
                <Button
                    color="error"
                    variant="text"
                    Icon={<XIcon />}
                    className="px-5"
                    disabled={isCurrUser || role === UserRole.ADMIN}
                    onClick={handleUserRemove}
                />
            </Table.Cell>
        </Table.Row>
    );
};
