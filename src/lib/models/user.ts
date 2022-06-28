export enum UserRole {
    ADMIN = 'admin',
    TRAINEE = 'trainee',
    COACH = 'coach',
}

export type UserName = string;

export type User = {
    username: UserName;
    role: UserRole;
    firstName: string;
    lastName: string;

    height?: number;
    weight?: number;
    waistGirth?: number;
};

export type UserAuth = {
    username: UserName;
    password: string;
};

export type UserRegisterData = {
    auth: UserAuth;
    meta: Pick<User, 'firstName' | 'lastName'>;
};

export type UserRegisterDBData = UserRegisterData & {
    meta: UserRegisterData['meta'] & Pick<User, 'username' | 'role'>;
};
