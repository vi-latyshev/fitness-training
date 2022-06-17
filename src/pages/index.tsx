import { DashboardLayout } from 'layouts/DashboardLayout';

import type { NextPageWithLayout } from 'pages/_app';

const Home: NextPageWithLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        test
    </div>
);

Home.layoutProps = {
    Layout: DashboardLayout,
};

export default Home;
