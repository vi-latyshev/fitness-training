import { DashNav } from './Navigation/DashNav';

import type { NextLayout } from 'views/home';

import type { NavLinkProps } from './Navigation/NavBar';

export interface DashboardLayoutProps {
    links: NavLinkProps[];
}

export const DashboardLayout: NextLayout<DashboardLayoutProps> = ({ links, children }) => (
    <div className="lg:flex w-screen min-h-screen h-full bg-gray-100">
        <DashNav links={links} />
        <section className="bg-gray-100 w-full space-y-10 px-5 lg:px-20 py-10 pt-24 lg:pt-10 flex items-start justify-start flex-col">
            {/* <div className="space-y-10 w-full"> */}
            {children}
            {/* </div> */}
        </section>
    </div>
);
