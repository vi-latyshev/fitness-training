import React, { Fragment } from 'react';
import Head from 'next/head';

import '../styles/globals.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageMeta = {
    title?: string;
    description?: string;
    keywords?: string[];
};

export type NextLayout = React.FunctionComponent<NextPageLayoutProps & {
    children: React.ReactNode;
}>;

type NextPageLayoutProps = {
    Layout?: NextLayout;
    meta?: NextPageMeta;
};

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    layoutProps?: NextPageLayoutProps;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const DEFAULT_META: NextPageMeta = {
    title: 'Fitness Trainging',
    description: '',
    keywords: ['fitness', 'training'],
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const Layout = Component.layoutProps?.Layout ?? Fragment;
    const layoutProps = Component.layoutProps?.Layout
        ? { layoutProps: Component.layoutProps }
        : {};

    const meta = Component.layoutProps?.meta ?? DEFAULT_META;

    return (
        <>
            <Head>
                {/* required */}
                <meta key="charSet" charSet="utf-8" />

                {/* title */}
                <title key="title">{meta.title}</title>
                <meta key="twitter:title" name="twitter:title" content={meta.title} />
                <meta key="og:title" property="og:title" content={meta.title} />

                {/* Primary */}
                <meta name="description" content={meta.description} />
                {/* required meta tags */}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content={meta.keywords?.join(', ')} />
                {/* <meta name="url" content={fullPath} /> */}

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:type" content="website" />
                {/* <meta property="og:url" content={fullPath} /> */}
                <meta property="og:image" content="/favicon.ico" />

                {/* Twitter */}
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:card" content="summary" />
                {/* <meta name="twitter:url" content={fullPath} /> */}
                <meta name="twitter:image" content="/favicon.ico" />

                {/* icons */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />

                {/* links */}
                {/* <link rel="canonical" href={fullPath} /> */}
            </Head>
            <Layout {...layoutProps}>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default App;
