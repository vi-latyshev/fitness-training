import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserRole } from 'lib/models/user';
import { useUser } from 'lib/context/user';

type RedirectMainPage = {
    [P in UserRole]: string;
};

export type UseAuthMiddlewareProps = {
    needRole?: UserRole;
};

const REDIRECT_MAIN_PAGE: RedirectMainPage = {
    [UserRole.TRAINEE]: '/trainee',
    [UserRole.COACH]: '/coach',
};
const LOGGED_OUT_PAGE = '/login';

/**
 * @TODO move logic to SSR
 */
export const useAuthMiddleware = ({ needRole }: UseAuthMiddlewareProps = {}): void => {
    const router = useRouter();
    const { user, loggedIn } = useUser();

    // redirect to login page
    useEffect(() => {
        if (loggedIn === false && needRole !== undefined) {
            router.replace(LOGGED_OUT_PAGE);
        }
    }, [loggedIn, needRole]);

    // redirect to main page by role (same with 404 page)
    useEffect(() => {
        if (loggedIn && needRole !== user.role) {
            router.push(REDIRECT_MAIN_PAGE[user.role]);
        }
    }, [loggedIn, needRole, user]);
};
