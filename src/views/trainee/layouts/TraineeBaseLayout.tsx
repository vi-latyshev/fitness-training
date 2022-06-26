import { ChartPieIcon, UserIcon, ClipboardCheckIcon } from '@heroicons/react/outline';

import Dashboard from 'components/Dashboard';

import type { NextLayout } from 'views/home';
import type { DashboardLayoutProps } from 'components/Dashboard';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Обзор',
        href: '/trainee',
        Icon: <ChartPieIcon className="w-5 h-5" />,
    },
    {
        text: 'Тренировки',
        href: '/trainee/workouts',
        Icon: <ClipboardCheckIcon className="w-5 h-5" />,
    },
    {
        text: 'Аккаунт',
        href: '/trainee/account',
        Icon: <UserIcon className="w-5 h-5" />,
    },
];

export const TraineeBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
