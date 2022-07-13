import { UserRole } from './model';

type UserRoleHumanType = {
    [T in UserRole]: string;
};

export const UserRoleTypeHuman: UserRoleHumanType = {
    [UserRole.ADMIN]: 'Админ',
    [UserRole.COACH]: 'Тренер',
    [UserRole.TRAINEE]: 'Ученик',
};
