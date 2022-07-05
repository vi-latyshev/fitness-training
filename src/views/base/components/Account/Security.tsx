import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from 'context/auth';

import Card from 'components/Card';
import { Button, Input } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { SetPasswordData, SetPasswordRes } from 'lib/api/routes/users/password';
import type { APIErrorJSON } from 'lib/api/error';

interface AccountSecurityProps {
    username?: string;
}

export const AccountSecurity = ({
    username: usernameProp,
}: AccountSecurityProps) => {
    const { user, loggedIn } = useUser();

    const username = usernameProp ?? user.username;

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { isDirty, errors, isSubmitting },
    } = useForm<SetPasswordData>({
        defaultValues: {
            username,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleChangePass: SubmitHandler<SetPasswordData> = useCallback(async (data) => {
        try {
            await axios.patch<SetPasswordRes>('/api/users/password', data);
            reset();
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
    }, []);

    if (!loggedIn) {
        return null;
    }

    return (
        <Card.Card>
            <Card.Title>Безопастность</Card.Title>
            <form onSubmit={handleSubmit(handleChangePass)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    disabled
                    label="Имя пользователя"
                    defaultValue={username}
                />
                <Input
                    full
                    type="password"
                    label="Текущий пароль"
                    disabled={isSubmitting}
                    error={errors.currentPassword?.message}
                    {...register('currentPassword', {
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
                    type="password"
                    label="Новый пароль"
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
                        validate: (value) => (
                            getValues('currentPassword') !== value || 'Пароль совпадает с текущим'
                        ),
                    })}
                />
                <Input
                    full
                    type="password"
                    label="Повторите новый пароль"
                    disabled={isSubmitting}
                    error={errors.passwordRepeat?.message}
                    {...register('passwordRepeat', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 5,
                            message: 'Минимальная длина 5',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Максимальная длина 30',
                        },
                        validate: (value) => (
                            getValues('password') === value || 'Пароли не совпадают'
                        ),
                    })}
                />
                <Button
                    full
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    Icon={(isSubmitting
                        ? <LoaderIcon className="text-white" />
                        : undefined
                    )}
                >
                    Сохранить
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
