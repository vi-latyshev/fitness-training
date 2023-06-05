import { Modal } from '@/components/Modal';

import { TaskUpdateForm } from './task-update-form';

import type { Task } from '@/lib/models/task';

type TaskProps = {
    task: Task;
    open: boolean;
    onClose: () => void;
};

export const TaskEditor = ({ task, open, onClose }: TaskProps): JSX.Element => (
    <Modal open={open} onClose={onClose}>
        <TaskUpdateForm task={task} onCreated={onClose} />
    </Modal>
);
