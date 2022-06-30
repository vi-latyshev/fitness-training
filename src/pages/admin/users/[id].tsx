import { useRouter } from 'next/router';
import useSWR from 'swr';

import { UserRole } from 'lib/models/user';

import { AdminBaseLayout } from 'views/admin/';

import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import { PageLoader } from 'components/PageLoader';

import type { NextPageWithLayout } from 'views/base';
import type { APIErrorJSON } from 'lib/api/error';
import type { FetchUserRes } from 'lib/api/routes/users/fetch';

const AdminUserPick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    const { data, error } = useSWR<FetchUserRes, APIErrorJSON>(
        typeof query.id === 'string' ? `/api/users/u/${query.id}` : null,
        { revalidateOnMount: true },
    );

    if (!data && !error) {
        return <PageLoader full />;
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
    const { username, firstName, lastName } = data;

    return (
        <>
            <Dashboard.Title>
                {firstName} {lastName} ({username})
            </Dashboard.Title>
            <Card.Container className="grid-cols-1">
                <Card.Card className="col-span-1">
                    {/* <Card.Title></Card.Title> */}
                </Card.Card>
            </Card.Container>
        </>
    );
};

AdminUserPick.layoutProps = {
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminUserPick;
