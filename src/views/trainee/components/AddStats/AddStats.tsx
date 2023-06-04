import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useUser } from '@/context/auth';
import {
    statsTypeList,
    StatsTypeRegisterFields,
    StatsTypeToHuman,
    statsTypeValueParse,
} from '@/lib/models/stats';
import { useStatsList } from '@/hooks/useStatsList';
import { useDiffStats } from '@/hooks/useDiffStats';
import { Button, Input } from '@/components/controls';

import type { SubmitHandler } from 'react-hook-form';
import type { APIErrorJSON } from '@/lib/api/error';
import type { StatsType, StatsCreateData } from '@/lib/models/stats';
import type { CreateStatsRes } from '@/lib/api/routes/stats/create';

export const AddStats = () => {
    const { user: { username } } = useUser();
    const { mutate: mutateList } = useStatsList(username);
    const { mutate: mutateDiff } = useDiffStats(username);

    const {
        register, handleSubmit, reset, formState: { errors, isSubmitting },
    } = useForm<StatsCreateData>();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<StatsCreateData> = useCallback(async (data) => {
        try {
            Object.keys(data).forEach((dataKey) => {
                data[dataKey as StatsType] = statsTypeValueParse(dataKey as StatsType, data[dataKey as StatsType]);
            });

            await axios.post<CreateStatsRes>(`/api/stats/${username}`, data);
            await mutateDiff();
            await mutateList();
            setServerError(null);
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
    }, []);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-6">
                {statsTypeList.map((type) => {
                    const { inputProps, inputRegister } = StatsTypeRegisterFields[type];

                    return (
                        <Input
                            key={type}
                            type="number"
                            min="1"
                            disabled={isSubmitting}
                            label={StatsTypeToHuman[type]}
                            error={errors[type]?.message}
                            {...inputProps}
                            {...register(type, {
                                valueAsNumber: true,
                                required: 'Введите данные',
                                ...inputRegister,
                                // @TODO fix it
                                pattern: undefined,
                                valueAsDate: false,
                            })}
                        />
                    );
                })}
            </div>
            <Button className="self-start">
                Добавить
            </Button>
            {serverError && <p className="text-error text-sm">{serverError}</p>}
        </form>
    );
};
