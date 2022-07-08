import { useCallback, useState } from 'react';

import { Modal } from 'components/Modal';
import { Button } from 'components/controls';

import { AddWorkoutModal } from './AddWorkoutModal';

import type { User } from 'lib/models/user';

interface AddWorkoutProps {
    owner: User['username'];
}

export const AddWorkout = ({ owner }: AddWorkoutProps) => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <AddWorkoutModal onCreated={handleToggleModal} owner={owner} />
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>Добавить тренировоку</Button>
        </>
    );
};
