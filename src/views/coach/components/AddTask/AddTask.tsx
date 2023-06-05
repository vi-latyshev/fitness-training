import { useCallback, useState } from 'react';

import { Modal } from '@/components/Modal';
import { Button } from '@/components/controls';

import { AddTaskModal } from './AddTaskModal';

import type { Task } from '@/lib/models/task';

interface AddTaskProps {
    assigner?: Task['assignee'];
}

export const AddTask = ({ assigner }: AddTaskProps): JSX.Element => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <AddTaskModal onCreated={handleToggleModal} assignee={assigner} />
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>Добавить Задачу</Button>
        </>
    );
};
