import { NavLink } from './NavLink';

import type { NavLinkProps } from './NavLink';

interface NavBarProps {
    links: NavLinkProps[];
}

export const NavBar = ({ links }: NavBarProps) => (
    <nav>
        <ul className="flex flex-col space-y-4">
            {links.map((props) => (
                <NavLink key={`${props.text}-${props.href}`} {...props} />
            ))}
        </ul>
    </nav>
);
