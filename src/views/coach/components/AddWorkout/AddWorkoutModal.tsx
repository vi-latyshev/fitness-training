import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import dayjs from 'dayjs';

import {
    WorkoutsCountType,
    WotkoutCountTypeHuman,
    workoutCountTimeParse,
    workoutCountTimeValidate,
} from 'lib/models/workout';

import { useWorkouts } from 'hooks/useWorkouts';
import Card from 'components/Card';
import { Button, Input, Select } from 'components/controls';

import { LoaderIcon } from 'icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { Workout, WorkoutCreateData } from 'lib/models/workout';
import type { APIErrorJSON } from 'lib/api/error';
import type { SelectItemValue } from 'components/controls';
import type { CreateWorkoutRes } from 'lib/api/routes/workouts/create';

interface AddWorkoutModalProps {
    owner: Workout['owner'];
    onCreated: () => void;
}

const WORKOUT_COUNT_TYPE_SELECTOR: SelectItemValue[] = Object.values(WorkoutsCountType).map((value) => ({
    value,
    humanValue: WotkoutCountTypeHuman[value],
}));

export const AddWorkoutModal = ({ owner, onCreated }: AddWorkoutModalProps) => {
    const { mutate } = useWorkouts(owner);
    const {
        register, handleSubmit, resetField, watch, formState: { errors, isSubmitting },
    } = useForm<WorkoutCreateData>({
        defaultValues: {
            countsType: WorkoutsCountType.Amount,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);
    const workoutType = watch('countsType');

    const handleFormSubmit: SubmitHandler<WorkoutCreateData> = useCallback(async (data) => {
        try {
            data.countsValue = workoutCountTimeParse(data.countsType, data.countsValue);

            await axios.post<CreateWorkoutRes>(`/api/workouts/${owner}`, data);
            await mutate();
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
                            value: /^[а-яА-Я]{3,30}/,
                            message: 'Только буквы а-я, А-Я',
                        },
                    })}
                />
                <Select
                    full
                    label="Тип"
                    items={WORKOUT_COUNT_TYPE_SELECTOR}
                    {...register('countsType', {
                        required: 'Выберите тип',
                        onChange: () => resetField('countsValue'),
                    })}
                />
                {workoutType === WorkoutsCountType.Amount && (
                    <Input
                        full
                        key="amout"
                        type="number"
                        label="Кол-во повторений"
                        min="1"
                        disabled={isSubmitting}
                        error={errors.countsValue?.message}
                        defaultValue="5"
                        {...register('countsValue', {
                            valueAsNumber: true,
                            required: 'Введите кол-во',
                            min: {
                                value: 1,
                                message: 'Минимальное значение 1',
                            },
                            minLength: {
                                value: 1,
                                message: 'Минимальная длина 1',
                            },
                            pattern: undefined,
                        })}
                    />
                )}
                {workoutType === WorkoutsCountType.Time && (
                    <Input
                        full
                        key="time"
                        type="text"
                        label="Время выполнения"
                        disabled={isSubmitting}
                        error={errors.countsValue?.message}
                        pattern="[0-9]{2}:[0-9]{2}"
                        defaultValue={dayjs.duration(5 * 60 * 1000).format('mm:ss')}
                        {...register('countsValue', {
                            valueAsNumber: false,
                            required: 'Введите время',
                            validate: (value) => workoutCountTimeValidate(value) || 'Неверное время',
                            pattern: {
                                value: /^[0-9]{2}:[0-9]{2}/,
                                message: 'Неверный формат',
                            },
                        })}
                    />
                )}
                {workoutType === WorkoutsCountType.Distance && (
                    <Input
                        full
                        key="distance"
                        type="number"
                        label="Дистанция (м.)"
                        min="0.01"
                        step="0.01"
                        disabled={isSubmitting}
                        error={errors.countsValue?.message}
                        defaultValue="2"
                        {...register('countsValue', {
                            valueAsNumber: true,
                            required: 'Введите дистанцию',
                            min: {
                                value: 1,
                                message: 'Минимальное значение 1',
                            },
                            minLength: {
                                value: 1,
                                message: 'Минимальная длина 1',
                            },
                            pattern: undefined,
                        })}
                    />
                )}
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
