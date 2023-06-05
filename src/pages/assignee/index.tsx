import Router from 'next/router';
import { useEffect } from 'react';

import { UserRole } from '@/lib/models/user';
import { TraineeBaseLayout } from '@/views/trainee';

import type { NextPageWithLayout } from '@/views/base';

const TraineeOverview: NextPageWithLayout = () => {
    useEffect(() => {
        Router.replace('/assignee/tasks');
    }, []);

    return null;
};

TraineeOverview.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.ASSIGNEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeOverview;
