import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';

import { AccountBio, AccountSecurity } from 'views/base/components/Account';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

/**
 * @TODO ??
 */
const TraineeAccount: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <AccountBio />
        <AccountSecurity />
    </Card.Container>
);

TraineeAccount.layoutProps = {
    meta: {
        title: 'Аккаунт',
    },
    auth: {
        needRole: UserRole.ASSIGNEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeAccount;
