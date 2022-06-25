export enum UserRole {
    TRAINEE = 'trainee',
    COACH = 'coach',
}

export type UserName = string;

export type UserBase<Role extends UserRole> = {
    username: UserName;
    role: Role;
};

export type Trainee = UserBase<UserRole.TRAINEE> & {
    role: UserRole.TRAINEE;
    coach: UserName;
    height?: number;
    weight?: number;
};

export type Coach = UserBase<UserRole.COACH> & {
    trainees: UserName[];
};

export type User = Trainee | Coach;

export type UserAuth = {
    username: UserName;
    password: string;
};

export type UserAuthData = {
    auth: UserAuth;
    meta: User;
};
