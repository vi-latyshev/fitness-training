import { useRouter } from 'next/router';

import { UserRole } from 'lib/models/user';

import { AccountSecurity } from 'views/base/components/Account';
import { AdminBaseLayout } from 'views/admin';

import { useUserByUsername } from 'hooks/useUserByUsername';
import { SwrLoadingHandle } from 'components/SwrLoadingHandle';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const AdminUserPick: NextPageWithLayout = () => {
    const router = useRouter();
    const { query } = router;

    const { user, isLoading, error } = useUserByUsername(query.username);

    const { username, firstName, lastName } = user;

    return (
        <SwrLoadingHandle isLoading={isLoading} error={error}>
            <Dashboard.Title>
                {firstName} {lastName} ({username})
            </Dashboard.Title>
            <Card.Container className="grid-cols-3">
                <AccountSecurity username={username} />
            </Card.Container>
        </SwrLoadingHandle>
    );
};

AdminUserPick.layoutProps = {
    auth: {
        needRole: UserRole.ADMIN,
    },
    Layout: AdminBaseLayout,
};

export default AdminUserPick;
