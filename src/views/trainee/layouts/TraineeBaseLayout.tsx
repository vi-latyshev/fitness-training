import { ChartPieIcon, UserIcon, ClipboardCheckIcon } from '@heroicons/react/outline';

import Dashboard from 'components/Dashboard';

import type { NextLayout } from 'views/home';
import type { DashboardLayoutProps } from 'components/Dashboard';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Обзор',
        href: '/trainee',
        Icon: <ChartPieIcon />,
    },
    {
        text: 'Тренировки',
        href: '/trainee/workouts',
        Icon: <ClipboardCheckIcon />,
    },
    {
        text: 'Аккаунт',
        href: '/trainee/account',
        Icon: <UserIcon />,
    },
];

export const TraineeBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
