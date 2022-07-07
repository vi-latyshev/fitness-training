import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import dayjs from 'dayjs';

import Card from 'components/Card';
import { Button, Input } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { User } from 'lib/models/user';
import type { WorkoutCreateData } from 'lib/models/workout';
import type { APIErrorJSON } from 'lib/api/error';

interface AddWorkoutModalProps {
    username: User['username'];
}

export const AddWorkoutModal = ({ username }: AddWorkoutModalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WorkoutCreateData>({
        defaultValues: {
            owner: username,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<WorkoutCreateData> = useCallback(async (data) => {
        try {
            console.log(dayjs(data.date).isValid());
            console.log(data, 'data');
            // await axios.post('/api/workouts', data);
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
            <Card.Title>Новая тренировока</Card.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Название тренировки"
                    disabled={isSubmitting}
                    error={errors.name?.message}
                    {...register('name', {
                        required: 'Введите название',
                        minLength: {
                            value: 3,
                            message: 'Минимальная длина 3',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Максимальная длина 30',
                        },
                        pattern: {
                            value: /^[а-я]{3,30}/,
                            message: 'Только буквы а-я',
                        },
                    })}
                />
                {/* @TODO selector counts type */}
                <Input
                    full
                    type="number"
                    label="Кол-во повторений"
                    disabled={isSubmitting}
                    error={errors.name?.message}
                    {...register('counts.value', {
                        required: 'Введите название',
                        minLength: {
                            value: 1,
                            message: 'Минимальная длина 1',
                        },
                    })}
                />
                <Input
                    full
                    type="datetime-local"
                    label="Время выполнения"
                    disabled={isSubmitting}
                    error={errors.date?.message}
                    defaultValue={dayjs.duration({ minutes: 5 }).format('mm:ss')}
                    {...register('date', {
                        required: 'Введите время',
                        validate: (value) => dayjs(value).isValid() || 'Неверное время',
                        setValueAs: (value) => dayjs(value).valueOf(),
                    })}
                />
                <Input
                    full
                    type="datetime-local"
                    label="Дата выполнения"
                    disabled={isSubmitting}
                    error={errors.date?.message}
                    defaultValue={dayjs().format('YYYY-MM-DDTHH:mm')}
                    {...register('date', {
                        required: 'Введите дату',
                        validate: (value) => dayjs(value).isValid() || 'Неверная дата',
                        setValueAs: (value) => dayjs(value).valueOf(),
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
                    Создать
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
