import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { UserRole } from 'lib/models/user';
import { useUser } from 'lib/context/auth';

import { TraineeBaseLayout } from 'views/trainee';

import Card from 'components/Card';
import { Button, Input } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { NextPageWithLayout } from 'views/home';
import type { SetPasswordData } from 'lib/api/routes/users/password';
import type { APIErrorJSON } from 'lib/api/error';

type SecurityFields = SetPasswordData;

/**
 * @TODO Смена тренера
 * @TODO ??
 */
export const TraineeAccount: NextPageWithLayout = () => {
    const { user, changePassUser } = useUser();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { isDirty, errors, isSubmitting },
    } = useForm<SecurityFields>({
        defaultValues: {
            username: user.username,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleChangePass: SubmitHandler<SecurityFields> = useCallback(async (data) => {
        try {
            await changePassUser(data);
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

    return (
        <Card.Container className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            <Card.Card className="col-span-1">
                <Card.Title>Информация</Card.Title>
                <Input
                    disabled
                    label="Имя"
                    defaultValue={user.firstName}
                />
                <Input
                    disabled
                    label="Фамилия"
                    defaultValue={user.lastName}
                />
            </Card.Card>
            <Card.Card>
                <Card.Title>Безопастность</Card.Title>
                <form onSubmit={handleSubmit(handleChangePass)} className="flex flex-col items-end w-full space-y-4">
                    <Input
                        full
                        disabled
                        label="Имя пользователя"
                        defaultValue={user.username}
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
        </Card.Container>
    );
};

TraineeAccount.layoutProps = {
    meta: {
        title: 'Аккаунт',
    },
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeAccount;
