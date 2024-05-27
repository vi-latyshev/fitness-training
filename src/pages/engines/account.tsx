import { UserRole } from '@/lib/models/user';
import Card from '@/components/Card';
import { EnginesBaseLayout } from '@/views/engines';
import { AccountBio, AccountSecurity } from '@/views/base/components/Account';

import type { NextPageWithLayout } from '@/views/base';

const EnginesAccount: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <AccountBio />
        <AccountSecurity />
    </Card.Container>
);

EnginesAccount.layoutProps = {
    meta: {
        title: 'Аккаунт',
    },
    auth: {
        needRole: UserRole.MASTER,
    },
    Layout: EnginesBaseLayout,
};

export default EnginesAccount;
