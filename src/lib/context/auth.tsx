import {
    useRef,
    useMemo,
    // useState,
    // useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import axios from 'axios';
import useSWR from 'swr';

import type { User, UserAuth, UserRegisterData } from 'lib/models/user';
import type { CreateUserRes } from 'lib/api/routes/users/create';
import type { LoginUserRes } from 'lib/api/routes/users/login';
import type { MeUserRes } from 'lib/api/routes/users/me';
import type { SetPasswordData, SetPasswordRes } from 'lib/api/routes/users/password';

interface AuthProviderProps {
    children: React.ReactNode;
}

export type UpdateUserParam = User | ((prev: User) => User);

export interface AuthContextValue {
    user: User;
    loggedIn: boolean | undefined;
    registerUser: (data: UserRegisterData) => Promise<void>;
    loginUser: (data: UserAuth) => Promise<void>;
    changePassUser: (data: SetPasswordData) => Promise<void>;
    updateUser: (user: UpdateUserParam) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
    user: {} as User,
    loggedIn: undefined,
    updateUser: async (_user: UpdateUserParam) => { },
    registerUser: async () => { },
    changePassUser: async () => { },
    loginUser: async () => { },
    logoutUser: async () => { },
});

export const useUser = () => useContext<AuthContextValue>(AuthContext);

// @TODO remove context
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { data: user = {} as User, error, mutate } = useSWR<MeUserRes>('/api/users/me', { shouldRetryOnError: false });
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

    const changePassUser = useCallback<AuthContextValue['changePassUser']>(async (data) => {
        await axios.patch<SetPasswordRes>('/api/users/password', data);
    }, [loggedIn]);

    const updateUser = useCallback(async (param: UpdateUserParam) => {
        const updated: User = typeof param === 'function'
            ? param(user)
            : param;

        await mutate(updated, loggedIn === undefined);
        // if (updated.username) {
        //     await mutateGlob(`/api/users/${updated.username}`, updated, false);
        // }
    }, [user]);

    const logoutUser = useCallback<AuthContextValue['logoutUser']>(async () => {
        try {
            await axios.get<MeUserRes>('/api/users/logout');
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
        changePassUser,
        updateUser,
        logoutUser,
    }), [user, loggedIn, changePassUser]);

    return (
        <AuthContext.Provider value={userValue}>
            {children}
        </AuthContext.Provider>
    );
};
