import { UserRole } from 'lib/models/user';
import { AdminBaseLayout } from 'views/admin';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/home';

export const AdminDashboard: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Обзор</Dashboard.Title>
        <Card.Container>
            админ
        </Card.Container>
    </>
);

AdminDashboard.layoutProps = {
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminDashboard;
