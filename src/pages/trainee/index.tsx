import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';

import Card from 'components/Card';
import { Button } from 'components/controls';
import { Checkbox } from 'components/controls/Checkbox';

import type { NextPageWithLayout } from 'views/home';

/**
 * @TODO Полный обзор пользователя
 */
export const TraineeOverview: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-6">
        <Card.Card>
            <h2>default</h2>
            <Button>Выйти</Button>
            <Button color="secondary">Выйти</Button>
            <Button color="success">Выйти</Button>
            <Button color="warning">Выйти</Button>
            <Button color="error">Выйти</Button>
            <Button rounded>Выйти</Button>
            <Button disabled>Выйти</Button>
        </Card.Card>
        <Card.Card>
            <h2>text</h2>
            <Button variant="text">Выйти</Button>
            <Button variant="text" color="secondary">Выйти</Button>
            <Button variant="text" color="success">Выйти</Button>
            <Button variant="text" color="warning">Выйти</Button>
            <Button variant="text" color="error">Выйти</Button>
            <Button variant="text" rounded>Выйти</Button>
            <Button variant="text" disabled>Выйти</Button>
        </Card.Card>
        <Card.Card>
            <h2>soft</h2>
            <Button variant="soft">Выйти</Button>
            <Button variant="soft" color="secondary">Выйти</Button>
            <Button variant="soft" color="success">Выйти</Button>
            <Button variant="soft" color="warning">Выйти</Button>
            <Button variant="soft" color="error">Выйти</Button>
            <Button variant="soft" rounded>Выйти</Button>
            <Button variant="soft" disabled>Выйти</Button>
        </Card.Card>
        <Card.Card>
            <h2>default</h2>
            <Checkbox defaultChecked />
            <Checkbox defaultChecked color="secondary" />
            <Checkbox defaultChecked color="success" />
            <Checkbox defaultChecked color="warning" />
            <Checkbox defaultChecked color="error" />
            <Checkbox defaultChecked disabled />
        </Card.Card>
        <Card.Card>
            <h2>soft</h2>
            <Checkbox defaultChecked variant="soft" />
            <Checkbox defaultChecked variant="soft" color="secondary" />
            <Checkbox defaultChecked variant="soft" color="success" />
            <Checkbox defaultChecked variant="soft" color="warning" />
            <Checkbox defaultChecked variant="soft" color="error" />
            <Checkbox defaultChecked variant="soft" disabled />
        </Card.Card>
    </Card.Container>
);

TraineeOverview.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    Layout: TraineeBaseLayout,
    auth: {
        needRole: UserRole.TRAINEE,
    },
};

export default TraineeOverview;
