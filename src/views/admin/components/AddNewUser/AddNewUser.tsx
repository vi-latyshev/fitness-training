import { useCallback, useState } from 'react';

import { Modal } from 'components/Modal';
import Card from 'components/Card';
import { Button } from 'components/controls';

export const AddNewUser = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const handleToggleModal = useCallback(() => {
        setIsModelOpen((state) => !state);
    }, []);

    return (
        <>
            <Modal open={isModelOpen} onClose={handleToggleModal}>
                <Card.Card>
                    <Card.Title>Новый пользователь</Card.Title>

                </Card.Card>
            </Modal>
            <Button className="self-end" onClick={handleToggleModal}>Добавить пользователя</Button>
        </>
    );
};
