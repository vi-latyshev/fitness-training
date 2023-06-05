import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import dayjs from 'dayjs';

import { LoaderIcon } from '@/icons/Loader';
import Card from '@/components/Card';
import { Button, Input, Select } from '@/components/controls';
import { TaskStatus, TaskStatusTypeHuman, taskStatusTypeList } from '@/lib/models/task';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';

import type { CreateTaskRes } from '@/lib/api/routes/tasks/create';
import type { Task, TaskCreateData } from '@/lib/models/task';
import type { SubmitHandler } from 'react-hook-form';
import type { APIErrorJSON } from '@/lib/api/error';
import type { SelectItemValue } from '@/components/controls';

interface AddWorkoutModalProps {
    assignee?: Task['assignee'];
    onCreated: () => void;
}

const TASK_STATUS_TYPE_SELECTOR: SelectItemValue[] = taskStatusTypeList.map((value) => ({
    value,
    humanValue: TaskStatusTypeHuman[value],
}));

export const AddTaskModal = ({ assignee, onCreated }: AddWorkoutModalProps): JSX.Element => {
    const { mutate } = useTasks(assignee);
    const { items: usersItems, isLoading: usersIsLoading, error: usersError } = useUsers();

    const {
        register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<TaskCreateData>({
        defaultValues: {
            status: TaskStatus.ToDo,
            assignee,
        },
    });
    const [serverError, setServerError] = useState<string | null>(null);

    const handleFormSubmit: SubmitHandler<TaskCreateData> = useCallback(async (data) => {
        try {
            // data.countsValue = workoutCountTimeParse(data.countsType, data.countsValue);

            await axios.post<CreateTaskRes>('/api/tasks', data);
            await mutate();
            onCreated();
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
    }, [mutate, onCreated]);

    const users = useMemo<SelectItemValue[]>(() => usersItems.map((user) => ({
        value: user.username,
        humanValue: `${user.firstName} ${user.lastName}`,
    })), [usersItems]);

    return (
        <Card.Card>
            <Card.Title>Новая Задача</Card.Title>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-end w-full space-y-4">
                <Input
                    full
                    label="Название"
                    disabled={isSubmitting}
                    error={errors.title?.message}
                    {...register('title', {
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
                <Input
                    full
                    label="Описание"
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
                            value: /^[а-яА-Я]{1,250}/,
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
                {!assignee && (
                    <Select
                        full
                        label="Исполнитель"
                        loading={usersIsLoading}
                        error={usersError?.message}
                        items={users}
                        {...register('assignee', {
                            required: 'Выберите Исполнителя',
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
