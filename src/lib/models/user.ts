export enum UserRole {
    TRAINEE = 'trainee',
    COACH = 'coach',
}

export type UserName = string;

export type User = {
    username: UserName;
    role: UserRole;
    height: number;
    weight: number;
};

export type UserAuth = {
    username: UserName;
    password: string;
};

export type UserAuthData = {
    auth: UserAuth;
    meta: Omit<User, 'username'>;
};

// export type Trainee extends User = {
//     role: UserRole.TRAINEE;
//     coach: UserName;
// }

// export interface Coach extends User {
//     role: UserRole.COACH;
//     trainees: UserName[];
// }
