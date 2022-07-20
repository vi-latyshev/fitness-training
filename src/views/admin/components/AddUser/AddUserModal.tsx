import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from 'context/auth';

import { UserRole, userRoleList, UserRoleTypeHuman } from 'lib/models/user';

import { usePagination } from 'hooks/usePagination';

import { Button, Input, Select } from 'components/controls';
import Card from 'components/Card';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { User, UserRegisterData } from 'lib/models/user';
import type { APIErrorJSON } from 'lib/api/error';
import type { SelectItemValue } from 'components/controls';

interface AddUserModalProps {
    onCreated: () => void;
}

const USERS_ROLE_TYPE_SELECTOR: SelectItemValue[] = userRoleList.map((value) => ({
    value,
    humanValue: UserRoleTypeHuman[value],
}));

export const AddUserModal = ({ onCreated }: AddUserModalProps) => {
    const { registerUser } = useUser();
    const { mutate } = usePagination<User>('/api/users');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserRegisterData>({
        defaultValues: {
            meta: {
                role: UserRole.TRAINEE,
            },
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<UserRegisterData> = useCallback(async (data) => {
        try {
            await registerUser(data, true);
            await mutate();
            setServerError(null);
            onCreated();
        } catch (error) {
            try {
                if (!axios.isAxiosError(error)) {
                    throw Error(`Unexpected error: ${error}`);
                }
                const { message: respMsg } = error.response?.data as APIErrorJSON;

                setServerError(respMsg);
            } catch (err) {
                throw new Error(`Handling response error: ${err}`);
            }
        }
    }, []);

    return (
        <Card.Card>
            <Card.Title>Новый пользователь</Card.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Имя пользователя"
                    error={errors.auth?.username?.message}
                    disabled={isSubmitting}
                    {...register('auth.username', {
                        required: 'Введите имя пользователя',
                        minLength: {
                            value: 5,
                            message: 'Минимальная длина 5',
                        },
                        maxLength: {
                            value: 15,
                            message: 'Максимальная длина 15',
                        },
                        pattern: {
                            value: /^[a-z.0-9_]/,
                            message: 'Только буквы a-z, цифры и точки',
                        },
                    })}
                />
                <Input
                    full
                    type="password"
                    label="Пароль"
                    disabled={isSubmitting}
                    error={errors.auth?.password?.message}
                    {...register('auth.password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 5,
                            message: 'Минимальная длина 5',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Максимальная длина 30',
                        },
                    })}
                />
                <Input
                    full
                    label="Имя"
                    disabled={isSubmitting}
                    error={errors.meta?.firstName?.message}
                    {...register('meta.firstName', {
                        required: 'Введите имя',
                        minLength: {
                            value: 1,
                            message: 'Минимальная длина 1',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50',
                        },
                    })}
                />
                <Input
                    full
                    label="Фамилия"
                    disabled={isSubmitting}
                    error={errors.meta?.lastName?.message}
                    {...register('meta.lastName', {
                        required: 'Введите фамилию',
                        minLength: {
                            value: 1,
                            message: 'Минимальная длина 1',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50',
                        },
                    })}
                />
                <Select
                    full
                    label="Роль"
                    items={USERS_ROLE_TYPE_SELECTOR}
                    {...register('meta.role')}
                />
                <Button
                    full
                    type="submit"
                    disabled={isSubmitting}
                    Icon={(isSubmitting
                        ? <LoaderIcon className="text-white" />
                        : undefined
                    )}
                >
                    Создать
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
