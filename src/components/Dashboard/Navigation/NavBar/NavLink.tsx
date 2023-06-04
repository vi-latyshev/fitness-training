import { Link } from '@/components/controls';

import type { LinkProps } from '@/components/controls';

export interface NavLinkProps extends Omit<LinkProps, 'Icon'> {
    text: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export const NavLink = ({ href, text, Icon }: NavLinkProps) => (
    <li>
        <Link
            rounded
            href={href}
            Icon={<Icon className="w-5 h-5" />}
            variant="text"
            className="lg:justify-start px-12"
        >
            {text}
        </Link>
    </li>
);
