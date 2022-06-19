import { DashNavTablet } from './Tablet';
import { DashNavMobile } from './Mobile';

import type { NavLinkProps } from './NavBar';

interface DashNavProps {
    links: NavLinkProps[];
}

export const DashNav = ({ links }: DashNavProps) => (
    <>
        <DashNavTablet links={links} />
        <DashNavMobile links={links} />
    </>
);
