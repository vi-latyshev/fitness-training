import { UserRole } from './model';

export const userRoleList = Object.values(UserRole);

type UserRoleHumanType = {
    [T in UserRole]: string;
};

export const UserRoleTypeHuman: UserRoleHumanType = {
    [UserRole.ADMIN]: 'Админ',
    [UserRole.MASTER]: 'Мастер',
};
