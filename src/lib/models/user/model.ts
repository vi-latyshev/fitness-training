export enum UserRole {
    ADMIN = 'admin',
    REPORTER = 'reporter',
    ASSIGNEE = 'assignee',
}

export type UserName = string;

export type User = {
    /**
     * unique
     */
    username: UserName;
    role: UserRole;
    createdAt: number;
    firstName: string;
    lastName: string;
    avatartSrc?: string;
};

export type UserAuth = {
    username: UserName;
    password: string;
};

export type UserRegisterData = {
    auth: UserAuth;
    meta: Omit<User, 'createdAt' | 'avatartSrc'>;
};

export type UserRegisterDBData = UserRegisterData & {
    meta: User;
};

export type UserUpdateData = Partial<Omit<User, 'username' | 'role' | 'createdAt'>>;
