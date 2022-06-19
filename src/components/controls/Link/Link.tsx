import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { Button, ButtonProps } from '../Button';

export type LinkProps = {
    href: NextLinkProps['href'],
    as?: NextLinkProps['as'],
    activeClassName?: string;
} & NextLinkProps & Omit<React.ComponentPropsWithRef<'a'> & ButtonProps<'a'>, 'href'>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
    href,
    as: linkAs,
    className,
    activeClassName,
    ...props
}, ref) => {
    const router = useRouter();

    let pathname: string | null | undefined;
    let hrefLink: string | null | undefined;

    if (typeof href === 'string') {
        pathname = href;
        hrefLink = href;
    } else {
        pathname = href.pathname;
        hrefLink = href.href;
    }
    const isActive = router.pathname === pathname;

    const classes = clsx(className, {
        [activeClassName ?? 'text-white bg-primary hover:bg-primary']: isActive,
    });

    const isExternal = hrefLink && (/^(http|mailto:|tel:)/.test(hrefLink));

    if (isExternal) {
        return (
            <Button
                as="a"
                ref={ref}
                className={classes}
                {...props}
            />
        );
    }

    return (
        <NextLink
            passHref
            href={href}
            as={linkAs}
        >
            <Button
                as="a"
                ref={ref}
                href={href as string}
                className={classes}
                {...props}
            />
        </NextLink>
    );
});
