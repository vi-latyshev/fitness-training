import { UserRole } from 'lib/models/user';
import { AdminBaseLayout } from 'views/admin';
import { Dashboard } from 'components/Dashboard';

import type { NextPageWithLayout } from 'views/home';

export const AdminDashboard: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Обзор</Dashboard.Title>
        <Dashboard.Main>
            админ
        </Dashboard.Main>
    </>
);

AdminDashboard.layoutProps = {
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminDashboard;
