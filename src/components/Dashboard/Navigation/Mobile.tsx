import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Logo, SupportLogo } from 'components/Logo';
import { Button } from 'components/controls';

import { NavBar } from './NavBar';
import { LogoutButton } from './Logout';

import type { NavLinkProps } from './NavBar';

interface DashNavMobileProps {
    links: NavLinkProps[];
}

export const DashNavMobile = ({ links }: DashNavMobileProps) => {
    const [isMenuOpenned, setIsMenuOpenned] = useState<boolean>(false);
    const { pathname } = useRouter();

    const handleOpenMenu = useCallback(() => {
        setIsMenuOpenned((value) => !value);
    }, []);

    useEffect(() => {
        setIsMenuOpenned(false);
    }, [pathname]);

    return (
        <>
            {isMenuOpenned && (
                <div className="flex fixed bg-white z-10 w-screen h-screen flex-col justify-between pt-28 pb-16 px-5 text-center">
                    <NavBar links={links} />
                    <div>
                        <LogoutButton />
                        <SupportLogo />
                    </div>
                </div>
            )}
            <div className="lg:hidden z-20 fixed w-full px-5 з py-5 bg-white flex items-center justify-between">
                <Logo />
                <div>
                    <Button variant="soft" type="button" onClick={handleOpenMenu}>
                        Меню
                    </Button>
                </div>
            </div>
        </>
    );
};
