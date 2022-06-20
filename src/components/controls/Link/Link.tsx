import { forwardRef } from 'react';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { Button, ButtonProps } from '../Button';

type ButtonPropsWithAnhor = ButtonProps<'a'>;

export type LinkProps = {
    href: NextLinkProps['href'],
    as?: NextLinkProps['as'],
    activeVariant?: ButtonPropsWithAnhor['variant'];
} & NextLinkProps & Omit<React.ComponentPropsWithRef<'a'> & ButtonPropsWithAnhor, 'href'>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
    href,
    as: linkAs,
    variant,
    activeVariant = 'default',
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
    const variantNow = isActive ? activeVariant : variant;

    const isExternal = hrefLink && (/^(http|mailto:|tel:)/.test(hrefLink));

    if (isExternal) {
        return (
            <Button
                as="a"
                ref={ref}
                hover={!isActive}
                variant={variantNow}
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
                hover={!isActive}
                variant={variantNow}
                {...props}
            />
        </NextLink>
    );
});
