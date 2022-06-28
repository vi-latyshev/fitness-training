import React from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import durationPluging from 'dayjs/plugin/duration';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { SWRConfig } from 'swr';

import { AuthProvider } from 'lib/context/auth';
import { fetcher } from 'lib/fetcher';

import { AppLayout } from 'views/home';

import '../styles/globals.css';

import type { AppPropsWithLayout, NextPageMeta } from 'views/home';

dayjs.extend(durationPluging);
dayjs.extend(isBetweenPlugin);

const DEFAULT_META: NextPageMeta = {
    title: 'Fitness Trainging',
    description: '',
    keywords: ['fitness', 'training'],
};

const App = (props: AppPropsWithLayout) => {
    const { Component } = props;

    const meta = Component.layoutProps?.meta ?? DEFAULT_META;

    return (
        <>
            <Head>
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
                {/* <meta property="og:image" content="/favicon.ico" /> */}

                {/* Twitter */}
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:card" content="summary" />
                {/* <meta name="twitter:url" content={fullPath} /> */}
                {/* <meta name="twitter:image" content="/favicon.ico" /> */}

                {/* links */}
                {/* <link rel="canonical" href={fullPath} /> */}
            </Head>
            <SWRConfig
                value={{
                    fetcher,
                    errorRetryCount: 3,
                    focusThrottleInterval: 10000,
                }}
            >
                <AuthProvider>
                    <AppLayout {...props} />
                </AuthProvider>
            </SWRConfig>
        </>
    );
};

export default App;
