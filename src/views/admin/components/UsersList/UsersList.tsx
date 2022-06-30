import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { PageLoader } from 'components/PageLoader';
import Table from 'components/Table';
import { Button } from 'components/controls';

import { UsersRow } from './UsersRow';

import type { ListUsersRes } from 'lib/api/routes/users/list';
import type { APIErrorJSON } from 'lib/api/error';

const LIMIT = 10;

export const UsersList = () => {
    const [offset, setOffset] = useState<number>(0);
    const { data, error } = useSWR<ListUsersRes, APIErrorJSON>(`/api/users?offset=${offset}&limit=${LIMIT}`);

    const handlePrevList = useCallback(() => {
        if (data === undefined) {
            return;
        }
        setOffset((data.page - 2) * LIMIT);
    }, [data?.page]);

    const handleNextList = useCallback(() => {
        if (data === undefined) {
            return;
        }
        setOffset(data.page * LIMIT);
    }, [data?.page]);

    if (!data && !error) {
        return <PageLoader />;
    }
    if (error || !data) {
        return (
            <div className="text-error text-sm">
                Ошибка получения данных:
                <br />
                <span>{error?.message ?? 'Пустые данные'}</span>
            </div>
        );
    }
    const {
        items, total, page, pages,
    } = data;

    return (
        <div>
            <div className="flex flex-row justify-end items-center space-x-8 mb-3">
                <div>Всего: {total}</div>
                <div>Cтраница {page} / {pages}</div>
                <div className="flex flex-row space-x-2">
                    <Button
                        disabled={page === 1}
                        variant="soft"
                        Icon={<ChevronLeftIcon />}
                        onClick={handlePrevList}
                    />
                    <Button
                        disabled={page === pages}
                        variant="soft"
                        Icon={<ChevronRightIcon />}
                        onClick={handleNextList}
                    />
                </div>
            </div>
            <Table.Container>
                <Table.Head>
                    <Table.Row disabled border={false}>
                        <Table.Cell>Имя пользователя</Table.Cell>
                        <Table.Cell>Имя</Table.Cell>
                        <Table.Cell>Фамилия</Table.Cell>
                        <Table.Cell>Роль</Table.Cell>
                        <Table.Cell>Дата регистрации</Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {items.map((tableUser) => (
                        <UsersRow key={tableUser.username} user={tableUser} />
                    ))}
                </Table.Body>
            </Table.Container>
        </div>
    );
};
