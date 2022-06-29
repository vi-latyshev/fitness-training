import { UserRole } from 'lib/models/user';

import { AdminBaseLayout } from 'views/admin/';

import Card from 'components/Card';
import Table from 'components/Table';

import type { NextPageWithLayout } from 'views/home';

export const AdminDashboard: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1">
        <Card.Card className="col-span-1">
            <Card.Title>Список пользователей</Card.Title>
            <Table.Container>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell
                            full
                        >
                            asdsa
                        </Table.Cell>
                        <Table.Cell>
                            12312312
                        </Table.Cell>
                        <Table.Cell>
                            asfasfas
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Container>
        </Card.Card>
    </Card.Container>
);

AdminDashboard.layoutProps = {
    meta: {
        title: 'Пользователи',
    },
    auth: {
        needRole: UserRole.COACH,
    },
    Layout: AdminBaseLayout,
};

export default AdminDashboard;
