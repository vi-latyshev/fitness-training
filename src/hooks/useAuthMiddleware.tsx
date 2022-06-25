import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { UserRole } from 'lib/models/user';

type RedirectMainPage = {
    [P in UserRole]: string;
};

export type UseAuthMiddlewareProps = {
    needRole?: UserRole;
};

const loggedIn: boolean = false;
const userRole: UserRole = UserRole.TRAINEE;

const REDIRECT_MAIN_PAGE: RedirectMainPage = {
    [UserRole.TRAINEE]: '/trainee',
    [UserRole.COACH]: '/coach',
};
const LOGGED_OUT_PAGE = 'login';

/**
 * @TODO move logic to SSR
 */
export const useAuthMiddleware = ({ needRole }: UseAuthMiddlewareProps = {}): void => {
    const {
        asPath, prefetch, replace, push,
    } = useRouter();

    // redirect to login page

    const loginURL = useMemo(() => (
        `/${LOGGED_OUT_PAGE}`
    ), [asPath]);

    useEffect(() => {
        if (loggedIn) {
            prefetch(loginURL);
        }
    }, [loginURL, loggedIn]);

    useEffect(() => {
        if (!loggedIn && needRole !== undefined) {
            replace(loginURL);
        }
    }, [loggedIn, loginURL, needRole]);

    // redirect to main page of user by his role

    const redirectPage = useMemo(() => (
        REDIRECT_MAIN_PAGE[userRole] ?? REDIRECT_MAIN_PAGE[UserRole.TRAINEE]
    ), [userRole]);

    useEffect(() => {
        prefetch(redirectPage);
    }, [redirectPage]);

    // redirect to main page by role (same with 404 page)
    useEffect(() => {
        if (loggedIn && needRole !== userRole) {
            push(redirectPage);
        }
    }, [loggedIn, needRole, userRole, redirectPage]);
};
