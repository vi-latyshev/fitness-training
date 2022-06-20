import { Link } from 'components/controls';

import type { LinkProps } from 'components/controls';

export interface NavLinkProps extends LinkProps {
    text: string;
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

export const NavLink = ({ href, text, Icon }: NavLinkProps) => (
    <li>
        <Link
            rounded
            href={href}
            Icon={Icon}
            variant="text"
            className="lg:justify-start px-12"
        >
            {text}
        </Link>
    </li>
);
