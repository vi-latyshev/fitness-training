import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useMaintenances } from '@/hooks/useMaintenances';
import {
    Button, convertItemsToSelect, Input, Select,
} from '@/components/controls';
import { LoaderIcon } from '@/icons/Loader';
import { useUser } from '@/context/auth';
import { useEngine } from '@/hooks/useEngine';
import Card from '@/components/Card';
import {
    BearingFaultReason,
    bearingFaultReasonHuman,
    bearingFaultReasonList,
    FanFaultReason,
    fanFaultReasonHuman,
    fanFaultReasonList,
    RotorFaultReason,
    rotorFaultReasonHuman,
    rotorFaultReasonList,
    StatorFaultReason,
    statorFaultReasonHuman,
    statorFaultReasonList,
    WildingRotorFaultReason,
    wildingRotorFaultReasonHuman,
    wildingRotorFaultReasonList,
    WildingStatorFaultReason,
    wildingStatorFaultReasonHuman,
    wildingStatorFaultReasonList,
} from '@/lib/models/maintenance';

import type { MaintenanceCreateData } from '@/lib/models/maintenance';
import type { APIErrorJSON } from '@/lib/api/error';
import type { EngineId } from '@/lib/models/engine';
import type { SubmitHandler } from 'react-hook-form';

type MaintenanceAddModalProps = {
    engineId: EngineId;
    onCreated: () => void;
};

const rotorFaultSelector = convertItemsToSelect(rotorFaultReasonList, rotorFaultReasonHuman);
const wildingRotorFaultSelector = convertItemsToSelect(wildingRotorFaultReasonList, wildingRotorFaultReasonHuman);
const statorFaultSelector = convertItemsToSelect(statorFaultReasonList, statorFaultReasonHuman);
const wildingStatorFaultSelector = convertItemsToSelect(wildingStatorFaultReasonList, wildingStatorFaultReasonHuman);
const bearingFaultSelector = convertItemsToSelect(bearingFaultReasonList, bearingFaultReasonHuman);
const fanFaultSelector = convertItemsToSelect(fanFaultReasonList, fanFaultReasonHuman);

export const MaintenanceAddModal = ({ engineId, onCreated }: MaintenanceAddModalProps): React.ReactElement => {
    const { mutate } = useMaintenances(engineId, { limit: 1 });
    const { engine } = useEngine(engineId);
    const { user } = useUser();

    const {
        reset,
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MaintenanceCreateData>();

    const [serverError, setServerError] = useState<string | null>(null);

    const rotor = watch('rotor');
    const wildingRotor = watch('wildingRotor');
    const stator = watch('stator');
    const wildingStator = watch('wildingStator');
    const bearing = watch('bearing');
    const fan = watch('fan');

    const handleFormSubmit: SubmitHandler<MaintenanceCreateData> = useCallback(async (data) => {
        try {
            await axios.post<MaintenanceCreateData>(`/api/engines/${engineId}/maintenances`, data);
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
    }, [mutate, reset, engineId, onCreated]);

    return (
        <Card.Card>
            <Card.Title>Новое техническое обслуживание</Card.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Двигатель"
                    disabled
                    defaultValue={engine.humanId}
                />
                <Input
                    full
                    label="Обслуживание проводил"
                    disabled
                    defaultValue={`${user.firstName} ${user.lastName}`}
                />
                <Select
                    full
                    label="Ротор"
                    items={rotorFaultSelector}
                    error={errors.rotor?.message}
                    disabled={isSubmitting}
                    {...register('rotor')}
                />
                {rotor === RotorFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Ротера"
                        placeholder="Опишите проблему Ротора"
                        error={errors.rotorDescription?.message}
                        disabled={isSubmitting}
                        {...register('rotorDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Select
                    full
                    label="Обмотка ротора"
                    items={wildingRotorFaultSelector}
                    error={errors.wildingRotor?.message}
                    disabled={isSubmitting}
                    {...register('wildingRotor')}
                />
                {wildingRotor === WildingRotorFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Обмотки ротора"
                        placeholder="Опишите проблему Обмотки ротора"
                        error={errors.wildingRotorDescription?.message}
                        disabled={isSubmitting}
                        {...register('wildingRotorDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Select
                    full
                    label="Статор"
                    items={statorFaultSelector}
                    error={errors.stator?.message}
                    disabled={isSubmitting}
                    {...register('stator')}
                />
                {stator === StatorFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Статора"
                        placeholder="Опишите проблему Статора"
                        error={errors.statorDescription?.message}
                        disabled={isSubmitting}
                        {...register('statorDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Select
                    full
                    label="Обмотка статора"
                    items={wildingStatorFaultSelector}
                    error={errors.wildingStator?.message}
                    disabled={isSubmitting}
                    {...register('wildingStator')}
                />
                {wildingStator === WildingStatorFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Обмотки статора"
                        placeholder="Опишите проблему Обмотки Статора"
                        error={errors.wildingStatorDescription?.message}
                        disabled={isSubmitting}
                        {...register('wildingStatorDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Select
                    full
                    label="Подшипник"
                    items={bearingFaultSelector}
                    error={errors.bearing?.message}
                    disabled={isSubmitting}
                    {...register('bearing')}
                />
                {bearing === BearingFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Подшипника"
                        placeholder="Опишите проблему Подшипника"
                        error={errors.bearingDescription?.message}
                        disabled={isSubmitting}
                        {...register('bearingDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Select
                    full
                    label="Вентилятор"
                    items={fanFaultSelector}
                    error={errors.fan?.message}
                    disabled={isSubmitting}
                    {...register('fan')}
                />
                {fan === FanFaultReason.Other && (
                    <Input
                        full
                        label="Описание проблемы Вентилятора"
                        placeholder="Опишите проблему Вентилятора"
                        error={errors.fanDescription?.message}
                        disabled={isSubmitting}
                        {...register('fanDescription', {
                            maxLength: {
                                value: 150,
                                message: 'Максимальная длина 150',
                            },
                        })}
                    />
                )}
                <Input
                    full
                    label="Проведенные мероприятия по устранению неисправности"
                    placeholder="Опишите проведенные мероприятия"
                    error={errors.carriedOutDescription?.message}
                    disabled={isSubmitting}
                    {...register('carriedOutDescription', {
                        maxLength: {
                            value: 500,
                            message: 'Максимальная длина 500',
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
                    Добавить
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
