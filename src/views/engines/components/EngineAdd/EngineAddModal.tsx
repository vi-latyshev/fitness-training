import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCallback, useState } from 'react';

import Card from '@/components/Card';
import { useEngines } from '@/hooks/useEngines';
import { Button, Input } from '@/components/controls';
import { LoaderIcon } from '@/icons/Loader';

import type { SubmitHandler } from 'react-hook-form';
import type { EngineCreateData } from '@/lib/models/engine';
import type { APIErrorJSON } from '@/lib/api/error';

type AddEngineModalProps = {
    onCreated: () => void;
};

export const AddEngineModal = ({ onCreated }: AddEngineModalProps): React.ReactElement => {
    const { mutate } = useEngines();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EngineCreateData>();

    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<EngineCreateData> = useCallback(async (data) => {
        try {
            await axios.post<EngineCreateData>('/api/engines', data);
            await mutate();
            setServerError(null);
            onCreated();
            reset();
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
    }, [mutate, reset, onCreated]);

    return (
        <Card.Card>
            <Card.Title>Новый двигатель</Card.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Название"
                    placeholder="Название двигателя"
                    disabled={isSubmitting}
                    error={errors.humanId?.message}
                    {...register('humanId', {
                        required: 'Введите название',
                        minLength: {
                            value: 3,
                            message: 'Минимальная длина 3',
                        },
                        maxLength: {
                            value: 15,
                            message: 'Максимальная длина 15',
                        },
                        pattern: {
                            value: /^[a-z.0-9_]{3,15}/,
                            message: 'Только буквы a-z, цифры и точки',
                        },
                    })}
                />
                <Input
                    type="number"
                    label="Макс. скорость"
                    placeholder="Макс. скорость"
                    disabled={isSubmitting}
                    error={errors.maxSpeedPm?.message}
                    {...register('maxSpeedPm', {
                        required: 'Введите значение',
                        valueAsNumber: true,
                    })}
                />
                <Input
                    type="number"
                    label="Мощность"
                    placeholder="Мощность"
                    disabled={isSubmitting}
                    error={errors.power?.message}
                    {...register('power', {
                        required: 'Введите значение',
                        valueAsNumber: true,
                    })}
                />
                <Input
                    type="number"
                    label="Напряжение"
                    placeholder="Напряжение"
                    disabled={isSubmitting}
                    error={errors.nominalVoltage?.message}
                    {...register('nominalVoltage', {
                        required: 'Введите значение',
                        valueAsNumber: true,
                    })}
                />
                <Input
                    type="number"
                    label="Ток"
                    placeholder="Ток"
                    disabled={isSubmitting}
                    error={errors.nominalCurrent?.message}
                    {...register('nominalCurrent', {
                        required: 'Введите значение',
                        valueAsNumber: true,
                    })}
                />
                <Input
                    type="number"
                    label="Вес"
                    placeholder="Вес"
                    disabled={isSubmitting}
                    error={errors.weight?.message}
                    {...register('weight', {
                        required: 'Введите значение',
                        valueAsNumber: true,
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
                    Добавить
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
