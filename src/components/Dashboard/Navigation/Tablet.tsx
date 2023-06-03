import { Logo } from 'components/Logo';

import { NavBar } from './NavBar';
import { LogoutButton } from './Logout';

import type { NavLinkProps } from './NavBar';

interface DashNavTabletProps {
    links: NavLinkProps[];
}

export const DashNavTablet = ({ links }: DashNavTabletProps) => (
    <aside className="hidden h-screen sticky top-0 lg:flex bg-white px-4 2xl:px-12 pt-20 pb-10 flex-col items-center justify-between">
        <div className="space-y-16 flex flex-col items-center">
            <Logo />
            <NavBar links={links} />
        </div>
        <div className="flex w-full">
            <LogoutButton />
        </div>
    </aside>
);
