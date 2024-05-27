import type { Tagged } from 'type-fest';

export enum UserRole {
    ADMIN = 'admin',
    MASTER = 'master',
}

export type UserName = Tagged<string, 'UserId'>;

export type User = {
    /**
     * unique
     */
    username: UserName;
    role: UserRole;
    createdAt: number;
    firstName: string;
    lastName: string;
};

export type UserAuth = {
    username: UserName;
    password: string;
};

export type UserRegisterData = {
    auth: UserAuth;
    meta: Omit<User, 'createdAt'>;
};

export type UserRegisterDBData = UserRegisterData & {
    meta: User;
};

export type UserUpdateData = Partial<Omit<User, 'username' | 'role' | 'createdAt'>>;
