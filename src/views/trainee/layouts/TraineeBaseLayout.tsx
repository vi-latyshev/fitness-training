import {
    UserIcon,
    ChartPieIcon,
    // TrendingUpIcon,
    ClipboardCheckIcon,
} from '@heroicons/react/outline';

import Dashboard from 'components/Dashboard';

import type { NextLayout } from 'views/base';
import type { DashboardLayoutProps } from 'components/Dashboard';

const ROOT = '/assignee';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Обзор',
        href: ROOT,
        Icon: ChartPieIcon,
    },
    // {
    //     text: 'Показатели',
    //     href: `${ROOT}/performance`,
    //     Icon: TrendingUpIcon,
    // },
    {
        text: 'Задачи',
        href: `${ROOT}/tasks`,
        Icon: ClipboardCheckIcon,
    },
    {
        text: 'Аккаунт',
        href: `${ROOT}/account`,
        Icon: UserIcon,
    },
];

export const TraineeBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
