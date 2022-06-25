import { UserRole } from 'lib/models/user';

import type { NextPageWithLayout } from 'views/home';

const Home: NextPageWithLayout = () => null;

Home.layoutProps = {
    auth: {
        needRole: UserRole.TRAINEE,
    },
};

export default Home;
