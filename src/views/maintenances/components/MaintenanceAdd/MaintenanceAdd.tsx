import { useCallback, useState } from 'react';

import { Button } from '@/components/controls';
import { Modal } from '@/components/Modal';

import { MaintenanceAddModal } from './MaintenanceAddModal';

import type { EngineId } from '@/lib/models/engine';

type MaintenanceAddProps = {
    engineId: EngineId;
};

export const MaintenanceAdd = ({ engineId }: MaintenanceAddProps): React.ReactElement => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <MaintenanceAddModal engineId={engineId} onCreated={handleToggleModal} />
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>
                Внести результаты технического обслуживания
            </Button>
        </>
    );
};
