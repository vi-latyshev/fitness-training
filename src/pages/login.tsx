import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from 'lib/context/user';

import { AuthLayout } from 'views/home';

import { Button, Input, Link } from 'components/controls';

import type { SubmitHandler } from 'react-hook-form';
import type { NextPageWithLayout } from 'views/home';
import type { UserAuth } from 'lib/models/user';
import type { LoginUserRes } from 'lib/api/routes/users/login';
import type { APIErrorJSON } from 'lib/api/error';

type LoginFields = UserAuth;

const Login: NextPageWithLayout = () => {
    const { forceGetMe } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<LoginFields> = useCallback(async (data) => {
        try {
            await axios.post<LoginUserRes>('api/users/login', data);
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

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-8">
            <div className="flex flex-col w-full space-y-4">
                <Input
                    full
                    placeholder="Ваше имя пользователя"
                    error={errors.username?.message}
                    {...register('username', {
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
                    placeholder="Ваш пароль"
                    error={errors.password?.message}
                    {...register('password', {
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
                <Button full type="submit">
                    Войти
                </Button>
                {serverError && <p className="self-end text-error text-sm">{serverError}</p>}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end text-sm text-center w-full">
                <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-4">Еще нет аккаунта?</p>
                <Link href="/register" variant="soft">Создать</Link>
            </div>
        </form>
    );
};

Login.layoutProps = {
    meta: {
        title: 'Вход',
    },
    Layout: AuthLayout,
};

export default Login;
