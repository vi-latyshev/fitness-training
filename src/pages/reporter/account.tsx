import { UserRole } from '@/lib/models/user';
import { CoachBaseLayout } from '@/views/coach';
import { AccountBio, AccountSecurity } from '@/views/base/components/Account';
import Card from '@/components/Card';

import type { NextPageWithLayout } from '@/views/base';

/**
 * @TODO ??
 */
const CoachAccount: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <AccountBio />
        <AccountSecurity />
    </Card.Container>
);

CoachAccount.layoutProps = {
    meta: {
        title: 'Аккаунт',
    },
    auth: {
        needRole: UserRole.REPORTER,
    },
    Layout: CoachBaseLayout,
};

export default CoachAccount;
