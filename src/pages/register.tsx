import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from 'lib/context/user';
import { UserRole } from 'lib/models/user';

import { AuthLayout } from 'views/home';

import {
    Link,
    Input,
    Button,
    Checkbox,
} from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { NextPageWithLayout } from 'views/home';
import type { UserRegisterData } from 'lib/models/user';
import type { CreateUserRes } from 'lib/api/routes/users/create';
import type { APIErrorJSON } from 'lib/api/error';

type RegisterFields = UserRegisterData;

const Register: NextPageWithLayout = () => {
    const { forceGetMe } = useUser();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFields>();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<RegisterFields> = useCallback(async (data) => {
        try {
            await axios.post<CreateUserRes>('api/users', data);
            await forceGetMe();
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

    const handleChangeCoach = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;

        setValue('meta.role', checked ? UserRole.COACH : UserRole.TRAINEE);
    }, []);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-8">
            <div className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    placeholder="Имя пользователя"
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
                    placeholder="Пароль"
                    disabled={isSubmitting}
                    error={errors.auth?.password?.message}
                    {...register('auth.password', {
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
                <Checkbox
                    className="self-end"
                    label="Стать тренером"
                    disabled={isSubmitting}
                    onChange={handleChangeCoach}
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
                    Зарегистрироваться
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end text-sm text-center w-full">
                <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-4">Есть аккаунт?</p>
                <Link disabled={isSubmitting} href="/login" variant="soft">Войти</Link>
            </div>
        </form>
    );
};

Register.layoutProps = {
    meta: {
        title: 'Регистрация',
    },
    Layout: AuthLayout,
};

export default Register;
