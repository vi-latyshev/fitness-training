import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from 'context/auth';

import { AuthLayout } from 'views/base';

import { Link, Input, Button } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { NextPageWithLayout } from 'views/base';
import type { UserRegisterData } from 'lib/models/user';
import type { APIErrorJSON } from 'lib/api/error';

const Register: NextPageWithLayout = () => {
    const { registerUser } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserRegisterData>();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<UserRegisterData> = useCallback(async (data) => {
        try {
            await registerUser(data);
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
                    placeholder="Ваше Имя"
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
                    placeholder="Ваша Фамилия"
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
