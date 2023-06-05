import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Card from '@/components/Card';
import { Button, Input, Select } from '@/components/controls';
import { useTasks } from '@/hooks/useTasks';
import { LoaderIcon } from '@/icons/Loader';
import { TaskStatusTypeHuman, taskStatusTypeList } from '@/lib/models/task';

import type { SelectItemValue } from '@/components/controls';
import type { APIErrorJSON } from '@/lib/api/error';
import type { TaskCreateData, Task } from '@/lib/models/task';
import type { SubmitHandler } from 'react-hook-form';
import type { UpdateTaskRes } from '@/lib/api/routes/tasks/update';

type TaskUpdateFormProps = {
    task: Task;
    onCreated: () => void;
};

const TASK_STATUS_TYPE_SELECTOR: SelectItemValue[] = taskStatusTypeList.map((value) => ({
    value,
    humanValue: TaskStatusTypeHuman[value],
}));

export const TaskUpdateForm = ({ task, onCreated }: TaskUpdateFormProps): JSX.Element => {
    const {
        status, assignee, title, description,
    } = task;

    const { mutate } = useTasks(assignee);

    const {
        register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<TaskCreateData>({
        defaultValues: {
            title,
            description,
            status,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<TaskCreateData> = useCallback(async (data) => {
        try {
            await axios.patch<UpdateTaskRes>(`/api/tasks/t/${task.id}`, data);
            await mutate();
            setServerError(null);
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
    }, [task.id, mutate, onCreated]);

    return (
        <Card.Card>
            {/* <Card.Title>Новая Задача</Card.Title> */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Название"
                    placeholder="Название задачи"
                    disabled={isSubmitting}
                    error={errors.title?.message}
                    {...register('title', {
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
                <Input
                    full
                    label="Описание"
                    placeholder="Описание задачи"
                    disabled={isSubmitting}
                    error={errors.description?.message}
                    {...register('description', {
                        minLength: {
                            value: 1,
                            message: 'Минимальная длина 1',
                        },
                        maxLength: {
                            value: 250,
                            message: 'Максимальная длина 250',
                        },
                        pattern: {
                            value: /^[а-яА-Я\s]{1,250}/,
                            message: 'Только буквы а-я, А-Я',
                        },
                    })}
                />
                <Select
                    full
                    label="Статус"
                    items={TASK_STATUS_TYPE_SELECTOR}
                    {...register('status', {
                        required: 'Выберите статус',
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
                    Обновить
                </Button>
                {serverError && <p className="text-error text-sm">{serverError}</p>}
            </form>
        </Card.Card>
    );
};
