import { useEffect } from 'react';
import Router from 'next/router';

import { UserRole } from '@/lib/models/user';
import { AdminBaseLayout } from '@/views/admin';

import type { NextPageWithLayout } from '@/views/base';

const AdminDashboard: NextPageWithLayout = () => {
    useEffect(() => {
        Router.replace('/admin/users');
    }, []);

    return null;
};

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
