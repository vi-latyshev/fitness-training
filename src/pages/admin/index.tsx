import { UserRole } from 'lib/models/user';

import { AdminBaseLayout } from 'views/admin';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const AdminDashboard: NextPageWithLayout = () => (
    <Card.Container>
        admin
    </Card.Container>
);

AdminDashboard.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminDashboard;
