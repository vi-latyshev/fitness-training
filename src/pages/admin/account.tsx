import { UserRole } from 'lib/models/user';

import { AdminBaseLayout } from 'views/admin';

import { AccountBio, AccountSecurity } from 'views/base/components/Account';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

/**
 * @TODO ??
 */
const AdminAccount: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <AccountBio />
        <AccountSecurity />
    </Card.Container>
);

AdminAccount.layoutProps = {
    meta: {
        title: 'Аккаунт',
    },
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminAccount;
