import { ChartPieIcon, UserIcon } from '@heroicons/react/outline';

import Dashboard from '@/components/Dashboard';

import type { NextLayout } from '@/views/base';
import type { DashboardLayoutProps } from '@/components/Dashboard';

const ROOT = '/engines';

const NAV_BAR_LINKS: DashboardLayoutProps['links'] = [
    {
        text: 'Двигатели',
        href: ROOT,
        Icon: ChartPieIcon,
    },
    {
        text: 'Аккаунт',
        href: `${ROOT}/account`,
        Icon: UserIcon,
    },
];

export const EnginesBaseLayout: NextLayout = (props) => (
    <Dashboard.Layout links={NAV_BAR_LINKS} {...props} />
);
