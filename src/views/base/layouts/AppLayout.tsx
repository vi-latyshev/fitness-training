import { Fragment } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

import { useUser } from 'lib/context/auth';

import { PageLoader } from 'components/PageLoader';

import { useAuthMiddleware } from 'hooks/useAuthMiddleware';

import type { UseAuthMiddlewareProps } from 'hooks/useAuthMiddleware';

export type NextPageMeta = {
    title: string;
    description?: string;
    keywords?: string[];
};

export type NextLayout<P = {}> = React.FunctionComponent<NextPageLayoutProps & P & {
    children: React.ReactNode;
}>;

type NextPageLayoutProps = {
    Layout?: NextLayout;
    meta?: NextPageMeta;
    auth?: UseAuthMiddlewareProps;
};

export type NextPageWithLayout = NextPage & {
    layoutProps?: NextPageLayoutProps;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export const AppLayout = ({ Component, pageProps }: AppPropsWithLayout) => {
    const { auth, Layout } = Component.layoutProps ?? {};

    const { loggedIn } = useUser();

    useAuthMiddleware(auth);

    if (loggedIn === undefined) {
        return <PageLoader />;
    }

    const BaseLayout = Layout ?? Fragment;

    return (
        <BaseLayout {...(Layout ? Component.layoutProps : {})}>
            <Component {...pageProps} />
        </BaseLayout>
    );
};
