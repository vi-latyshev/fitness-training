import { ChartPieIcon, UserGroupIcon, UserIcon } from '@heroicons/react/outline';

import Dashboard from 'components/Dashboard';

import type { NextLayout } from 'views/base';
import type { DashboardLayoutProps } from 'components/Dashboard';

const ROOT = '/reporter';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Обзор',
        href: ROOT,
        Icon: ChartPieIcon,
    },
    {
        text: 'Исполнители',
        href: `${ROOT}/assignees`,
        Icon: UserGroupIcon,
    },
    {
        text: 'Аккаунт',
        href: `${ROOT}/account`,
        Icon: UserIcon,
    },
];

export const CoachBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
