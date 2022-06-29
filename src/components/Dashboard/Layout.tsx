import { useUser } from 'lib/context/auth';

import { PageLoader } from 'components/PageLoader';

import { DashNav } from './Navigation/DashNav';
import { DashboardTitle } from './Title';

import type { NextLayout } from 'views/base';
import type { NavLinkProps } from './Navigation/NavBar';

export interface DashboardLayoutProps {
    links: NavLinkProps[];
}

export const DashboardLayout: NextLayout<DashboardLayoutProps> = ({ links, meta, children }) => {
    const { loggedIn } = useUser();

    if (!loggedIn) {
        return <PageLoader />;
    }

    return (
        <div className="lg:flex w-screen min-h-screen h-full bg-grayPrimary">
            <DashNav links={links} />
            <main className="bg-gray-100 w-full space-y-10 px-5 py-10 pt-28 lg:px-20 lg:pt-10 flex items-start justify-start flex-col">
                {meta?.title && <DashboardTitle>{meta.title}</DashboardTitle>}
                {children}
            </main>
        </div>
    );
};
