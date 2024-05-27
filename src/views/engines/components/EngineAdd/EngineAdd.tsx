import { useCallback, useState } from 'react';

import { Button } from '@/components/controls';
import { Modal } from '@/components/Modal';

import { AddEngineModal } from './EngineAddModal';

export const EngineAdd = (): React.ReactElement => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <AddEngineModal onCreated={handleToggleModal} />
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>Добавить двигатель</Button>
        </>
    );
};
