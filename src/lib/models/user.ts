export enum UserRole {
    TRAINEE = 'trainee',
    COACH = 'coach',
}

export type UserName = string;

export interface User {
    username: UserName;
    role: UserRole;
    height: number;
    weight: number;
}

export interface UserAuth {
    username: UserName;
    password: string;
}

export interface UserAuthData {
    auth: UserAuth;
    meta: Omit<User, 'username'>;
}

export interface Trainee extends User {
    role: UserRole.TRAINEE;
    coach: UserName;
}

export interface Coach extends User {
    role: UserRole.COACH;
    trainees: UserName[];
}
