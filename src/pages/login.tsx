import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from '@/context/auth';
import { LoaderIcon } from '@/icons/Loader';
import { AuthLayout } from '@/views/base';
import { Button, Input } from '@/components/controls';

import type { SubmitHandler } from 'react-hook-form';
import type { NextPageWithLayout } from '@/views/base';
import type { UserAuth } from '@/lib/models/user';
import type { APIErrorJSON } from '@/lib/api/error';

const Login: NextPageWithLayout = () => {
    const { loginUser } = useUser();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserAuth>();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<UserAuth> = useCallback(async (data) => {
        try {
            await loginUser(data);
            setServerError(null);
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
    }, [loginUser]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-8">
            <div className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    placeholder="Ваше имя пользователя"
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                <Button
                    full
                    type="submit"
                    disabled={isSubmitting}
                    Icon={(isSubmitting
                        ? <LoaderIcon className="text-white" />
                        : undefined
                    )}
                >
                    Войти
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
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
