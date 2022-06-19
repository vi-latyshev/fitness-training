import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Logo } from 'components/Logo';

import { NavBar } from './NavBar';

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
                <div className="fixed bg-white z-10 w-screen h-screen flex-col items-center py-20 px-5 justify-center text-center space-y-20">
                    <NavBar links={links} />
                    <div className="text-primary cursor-pointer">
                        Sign Out
                    </div>
                </div>
            )}
            <div className="lg:hidden z-20 fixed w-full px-5 py-2 bg-white flex items-center justify-between">
                <Logo />
                <div>
                    <button type="button" onClick={handleOpenMenu}>Menu</button>
                    {/* <Button
                        value="Menu"
                        variant="secondary"
                        icon="menu"
                        action={handleMenu}
                    /> */}
                </div>
            </div>
        </>
    );
};
