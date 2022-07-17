import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import durationPluging from 'dayjs/plugin/duration';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';

import { currVersion } from 'utils/currVersion';
import { AuthProvider } from 'context/auth';

import { fetcher } from 'lib/fetcher';

import { AppLayout } from 'views/base';

import { MetaTitle } from 'components/MetaTitle';

import '../styles/globals.css';

import type { AppPropsWithLayout, NextPageMeta } from 'views/base';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(durationPluging);
dayjs.extend(isBetweenPlugin);
dayjs.locale('ru');

const DOMAIN_URL = process.env.DOMAIN;

const DEFAULT_META: NextPageMeta = {
    description: 'Любой желающий может получить индивидуальный план тренировок от профессионального тренера и улучшить свою физическую подготовку',
    keywords: ['новобранец', 'физ подготовка', 'fitness', 'training'],
};

const App = (props: AppPropsWithLayout) => {
    const router = useRouter();

    const { Component } = props;

    const meta = Component.layoutProps?.meta ?? DEFAULT_META;
    const fullPath = `${DOMAIN_URL}${router.pathname}`;

    return (
        <>
            <MetaTitle title={meta.title} />
            <Head>
                {/* Primary */}
                <meta name="description" content={meta.description} />
                {/* required meta tags */}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content={meta.keywords?.join(', ')} />
                <meta name="url" content={fullPath} />

                {/* Open Graph / Facebook */}
                <meta property="og:description" content={meta.description} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={fullPath} />
                <meta property="og:image" content={currVersion('/logo-generation.jpg')} />

                {/* Twitter */}
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={fullPath} />
                <meta name="twitter:image" content={currVersion('/logo-generation.jpg')} />

                {/* links */}
                <link rel="canonical" href={fullPath} />
            </Head>
            <SWRConfig
                value={{
                    fetcher,
                    errorRetryCount: 3,
                    focusThrottleInterval: 1 * 60 * 1000,
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
