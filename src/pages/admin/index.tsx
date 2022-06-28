import { UserRole } from 'lib/models/user';

import { CoachBaseLayout } from 'views/coach';

import type { NextPageWithLayout } from 'views/home';

export const AdminDashboard: NextPageWithLayout = () => (
    <>admin</>
);

AdminDashboard.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: CoachBaseLayout,
};

export default AdminDashboard;
