import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';

import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import { Button, Input } from 'components/controls';
import { Checkbox } from 'components/controls/Checkbox';

import { LoaderIcon } from 'icons/Loader';

import type { NextPageWithLayout } from 'views/home';

/**
 * @TODO Полный обзор пользователя
 */
export const TraineeOverview: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Cards</Dashboard.Title>
        <Card.Container className="grid-cols-1 xl:grid-cols-4">
            <Card.Card>
                <Card.Title>title</Card.Title>
            </Card.Card>
            <Card.Card>
                <Card.Title center>center title</Card.Title>
            </Card.Card>
            <Card.Card>
                <Card.Title large>large title</Card.Title>
            </Card.Card>
            <Card.Card>
                w/o title
                <br />
                some content
                <br />
                some content
            </Card.Card>
        </Card.Container>
        <Dashboard.Title>Buttons</Dashboard.Title>
        <Card.Container className="grid-cols-1 xl:grid-cols-3">
            <Card.Card>
                <Card.Title>default</Card.Title>
                <Button>default</Button>
                <Button color="secondary">secondary</Button>
                <Button color="success">success</Button>
                <Button color="warning">warning</Button>
                <Button color="error">error</Button>
                <Button rounded>rounded</Button>
                <Button hover={false}>hover false</Button>
                <Button Icon={<LoaderIcon />}>icon</Button>
                <Button disabled>disabled</Button>
            </Card.Card>
            <Card.Card>
                <Card.Title>text</Card.Title>
                <Button variant="text">default</Button>
                <Button variant="text" color="secondary">secondary</Button>
                <Button variant="text" color="success">success</Button>
                <Button variant="text" color="warning">warning</Button>
                <Button variant="text" color="error">error</Button>
                <Button variant="text" rounded>rounded</Button>
                <Button variant="text" hover={false}>hover false</Button>
                <Button variant="text" Icon={<LoaderIcon />}>icon</Button>
                <Button variant="text" disabled>disabled</Button>
            </Card.Card>
            <Card.Card>
                <Card.Title>soft</Card.Title>
                <Button variant="soft">default</Button>
                <Button variant="soft" color="secondary">secondary</Button>
                <Button variant="soft" color="success">success</Button>
                <Button variant="soft" color="warning">warning</Button>
                <Button variant="soft" color="error">error</Button>
                <Button variant="soft" rounded>rounded</Button>
                <Button variant="soft" hover={false}>hover false</Button>
                <Button variant="soft" Icon={<LoaderIcon />}>icon</Button>
                <Button variant="soft" disabled>disabled</Button>
            </Card.Card>
        </Card.Container>
        <Dashboard.Title>Checkboxes</Dashboard.Title>
        <Card.Container className="grid-cols-1 xl:grid-cols-4">
            <Card.Card>
                <Card.Title>default</Card.Title>
                <Checkbox />
                <Checkbox defaultChecked />
                <Checkbox label="label" />
                <Checkbox defaultChecked color="secondary" />
                <Checkbox defaultChecked color="success" />
                <Checkbox defaultChecked color="warning" />
                <Checkbox defaultChecked color="error" />
                <Checkbox defaultChecked disabled />
            </Card.Card>
            <Card.Card>
                <Card.Title>soft</Card.Title>
                <Checkbox variant="soft" />
                <Checkbox defaultChecked variant="soft" />
                <Checkbox variant="soft" label="label" />
                <Checkbox defaultChecked variant="soft" color="secondary" />
                <Checkbox defaultChecked variant="soft" color="success" />
                <Checkbox defaultChecked variant="soft" color="warning" />
                <Checkbox defaultChecked variant="soft" color="error" />
                <Checkbox defaultChecked variant="soft" disabled />
            </Card.Card>
        </Card.Container>
        <Dashboard.Title>Inputs</Dashboard.Title>
        <Card.Container className="grid-cols-1 xl:grid-cols-2">
            <Card.Card>
                <Card.Title>default</Card.Title>
                <Input />
                <Input placeholder="placeholder" />
                <Input defaultValue="value" />
                <Input label="label" />
                <Input error="error" />
                <Input readOnly defaultValue="readOnly" />
                <Input disabled defaultValue="disabled" />
            </Card.Card>
            <Card.Card>
                <Card.Title>full</Card.Title>
                <Input full />
                <Input full placeholder="placeholder" />
                <Input full defaultValue="value" />
                <Input full label="label" />
                <Input full error="error" />
                <Input full readOnly defaultValue="readOnly" />
                <Input full disabled defaultValue="disabled" />
            </Card.Card>
        </Card.Container>
    </>
);

TraineeOverview.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeOverview;
