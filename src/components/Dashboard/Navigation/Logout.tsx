import { useCallback } from 'react';

import { useUser } from 'lib/context/auth';

import { Button } from 'components/controls';

export const LogoutButton = () => {
    const { logoutUser: logout } = useUser();

    const handleLogout = useCallback(async () => {
        await logout();
    }, []);

    return (
        <Button
            full
            rounded
            variant="text"
            onClick={handleLogout}
        >
            Выйти
        </Button>
    );
};
