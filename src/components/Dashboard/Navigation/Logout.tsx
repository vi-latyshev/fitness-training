import { useCallback } from 'react';

import { useUser } from 'context/auth';

import { Button } from 'components/controls';

export const LogoutButton = () => {
    const { logoutUser } = useUser();

    const handleLogout = useCallback(async () => {
        await logoutUser();
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
