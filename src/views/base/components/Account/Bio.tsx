import { useUser } from 'context/auth';

import Card from 'components/Card';
import { Input } from 'components/controls';

export const AccountBio = () => {
    const { user } = useUser();

    return (
        <Card.Card className="col-span-1">
            <Card.Title>Информация</Card.Title>
            <Input
                disabled
                label="Имя"
                defaultValue={user.firstName}
            />
            <Input
                disabled
                label="Фамилия"
                defaultValue={user.lastName}
            />
        </Card.Card>
    );
};
