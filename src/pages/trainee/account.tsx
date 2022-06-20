import { UserRole } from 'lib/models/user';
import { TraineeBaseLayout } from 'views/trainee';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import { Table } from 'views/trainee/components/Table';

import type { NextPageWithLayout } from 'views/home';

/**
 * @TODO Смена почты
 * @TODO Смена пароля
 * @TODO Смена тренера
 * @TODO ??
 */
export const TraineeAccount: NextPageWithLayout = () => (
    <>
        <Dashboard.Title>Аккаунт</Dashboard.Title>
        <Card.Container>
            <Card.Title>test</Card.Title>
            <Table />
        </Card.Container>
    </>
);

TraineeAccount.layoutProps = {
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeAccount;
