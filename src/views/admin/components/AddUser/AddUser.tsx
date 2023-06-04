import { useCallback, useState } from 'react';

import { Button } from '@/components/controls';
import { Modal } from '@/components/Modal';

import { AddUserModal } from './AddUserModal';

export const AddUser = (): JSX.Element => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <AddUserModal onCreated={handleToggleModal} />
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>Добавить пользователя</Button>
        </>
    );
};
