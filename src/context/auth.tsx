import {
    useRef,
    useMemo,
    useContext,
    useCallback,
    createContext,
} from 'react';
import axios from 'axios';
import { mutate as mutateGlob } from 'swr';

import { useUserByUsername } from 'hooks/useUserByUsername';

import type { User, UserAuth, UserRegisterData } from 'lib/models/user';
import type { CreateUserRes } from 'lib/api/routes/users/create';
import type { LoginUserRes } from 'lib/api/routes/users/login';
import type { LogoutUserRes } from 'lib/api/routes/users/logout';

interface AuthProviderProps {
    children: React.ReactNode;
}

export type UpdateUserParam = User | ((prev: User) => User);

export interface AuthContextValue {
    user: User;
    loggedIn: boolean | undefined;
    registerUser: (data: UserRegisterData) => Promise<void>;
    loginUser: (data: UserAuth) => Promise<void>;
    updateUser: (user: UpdateUserParam) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
    user: {} as User,
    loggedIn: undefined,
    updateUser: async (_user: UpdateUserParam) => { },
    registerUser: async () => { },
    loginUser: async () => { },
    logoutUser: async () => { },
});

export const useUser = () => useContext<AuthContextValue>(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { user, error, mutate } = useUserByUsername('me');

    const userLoaded = useRef<boolean>(false);

    const loggedIn = useMemo(() => {
        if (user.username) {
            userLoaded.current = true;

            return true;
        }
        if (error) {
            userLoaded.current = true;

            return false;
        }
        if (!userLoaded.current) return undefined;

        return false;
    }, [user, error]);

    const registerUser = useCallback<AuthContextValue['registerUser']>(async (data) => {
        const resp = await axios.post<CreateUserRes>('/api/users', data);
        mutate(resp.data, false);
    }, []);

    const loginUser = useCallback<AuthContextValue['loginUser']>(async (data) => {
        const resp = await axios.post<LoginUserRes>('/api/users/login', data);
        mutate(resp.data, false);
    }, []);

    const updateUser = useCallback(async (param: UpdateUserParam) => {
        const updated: User = typeof param === 'function'
            ? param(user)
            : param;

        await mutate(updated, loggedIn === undefined);

        if (updated.username) {
            await mutateGlob(`/api/users/${updated.username}`, updated, false);
        }
    }, [user]);

    const logoutUser = useCallback<AuthContextValue['logoutUser']>(async () => {
        try {
            await axios.get<LogoutUserRes>('/api/users/logout');
            mutate({} as User, false);
        } catch (e) {
            // @TODO SWR
            console.warn(e); // eslint-disable-line no-console
        }
    }, []);

    const userValue: AuthContextValue = useMemo(() => ({
        user,
        loggedIn,
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
    }), [user, loggedIn]);

    return (
        <AuthContext.Provider value={userValue}>
            {children}
        </AuthContext.Provider>
    );
};
