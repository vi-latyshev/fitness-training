import {
    useRef,
    useMemo,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import axios from 'axios';

import type { User } from 'lib/models/user';
import type { MeUserRes } from 'lib/api/routes/users/me';

interface UserProviderProps {
    children: React.ReactNode;
}

export type UpdateUserParam = User | ((prev: User) => User);

export interface UserContextValue {
    user: User;
    loggedIn: boolean | undefined;
    /**
     * @TODO useSWR
     */
    forceGetMe: () => Promise<void>;
    // updateUser: (user: UpdateUserParam, onlyLocal?: boolean) => Promise<void>;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue>({
    user: {} as User,
    loggedIn: undefined,
    forceGetMe: async () => { },
    // updateUser: async (_user: UpdateUserParam, _onlyLocal?: boolean) => { },
    logout: async () => { },
});

export const useUser = () => useContext<UserContextValue>(UserContext);

/**
 * @TODO useSWR - change useState to useSWR
 */
export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({} as User);
    const userLoaded = useRef<boolean>(false);

    const loggedIn = useMemo(() => {
        if (user.username) {
            return true;
        }
        if (!userLoaded.current) {
            return undefined;
        }

        return false;
    }, [user]);

    // const handleUpdateUser = useCallback(async (param: UpdateUserParam) => {
    // }, []);

    const handleLogout = useCallback(async () => {
        try {
            await axios.get<MeUserRes>('/api/users/logout');
            setUser({} as User);
        } catch (e) {
            // @TODO SWR
            console.warn(e); // eslint-disable-line no-console
        }
    }, []);

    const getMe = useCallback(async () => {
        try {
            const resp = await axios.get<MeUserRes>('/api/users/me');

            setUser(resp.data);
        } catch (e) {
            setUser({} as User);
        }
        if (!userLoaded.current) {
            userLoaded.current = true;
        }
    }, []);

    useEffect(() => {
        getMe();
    }, [getMe]);

    const userValue: UserContextValue = useMemo(() => ({
        user,
        loggedIn,
        forceGetMe: getMe,
        // updateUser: handleUpdateUser,
        logout: handleLogout,
    }), [user, loggedIn]);

    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};
