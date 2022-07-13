import { UserRole } from 'lib/models/user';

import { AdminBaseLayout } from 'views/admin/';
import { AddUser, UsersList } from 'views/admin/components';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const AdminUsers: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1">
        <Card.Card className="col-span-1">
            <AddUser />
            <UsersList />
        </Card.Card>
    </Card.Container>
);

AdminUsers.layoutProps = {
    meta: {
        title: 'Пользователи',
    },
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminUsers;
