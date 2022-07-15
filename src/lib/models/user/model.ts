export enum UserRole {
    ADMIN = 'admin',
    COACH = 'coach',
    TRAINEE = 'trainee',
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
