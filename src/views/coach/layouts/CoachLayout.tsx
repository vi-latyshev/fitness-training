import { ChartPieIcon } from '@heroicons/react/outline';

import Dashboard from 'components/Dashboard';

import type { NextLayout } from 'views/home';
import type { DashboardLayoutProps } from 'components/Dashboard';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Обзор',
        href: '/coach',
        Icon: <ChartPieIcon className="w-5 h-5" />,
    },
];

export const CoachBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
