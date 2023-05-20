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

// import { currVersion } from 'utils/currVersion';
import { AuthProvider } from 'context/auth';

import { fetcher } from 'lib/fetcher';

import { AppLayout } from 'views/base';

import { MetaTitle } from 'components/MetaTitle';

import '../styles/globals.css';

import type { SWRConfiguration } from 'swr';
import type { AppPropsWithLayout, NextPageMeta } from 'views/base';
import type { APIErrorJSON } from 'lib/api/error';
import type { RateLimitHeaderErrors } from 'lib/api/middleware/plugins/utils/rate-limit';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(durationPluging);
dayjs.extend(isBetweenPlugin);
dayjs.locale('ru');

const swrConfig: SWRConfiguration = {
    fetcher,
    errorRetryCount: 3,
    focusThrottleInterval: 1 * 60 * 1000,
    onErrorRetry: (err: APIErrorJSON, _key, config, revalidate, opts) => {
        if (err.code >= 400 && err.code <= 406) {
            return;
        }

        if (err.code === 429) {
            const { errors } = err as APIErrorJSON<RateLimitHeaderErrors>;
            const reset = errors?.reset ?? Date.now() / 1000;

            if (errors?.reset) {
                const timeoutManyReq = (reset - Date.now() / 1000) * 1000;
                setTimeout(revalidate, timeoutManyReq, opts);

                return;
            }
        }
        const maxRetryCount = config.errorRetryCount;
        const currentRetryCount = opts.retryCount;

        /* eslint-disable no-bitwise */
        // Copy from
        // https://github.com/vercel/swr/blob/e81d22f4121743c75b6b0998cc0bbdbe659889c1/_internal/utils/config.ts#L27
        const timeout = ~~(
            (Math.random() + 0.5)
            // eslint-disable-next-line no-bitwise
            * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))
        ) * config.errorRetryInterval;
        /* eslint-enable no-bitwise */

        if (maxRetryCount !== undefined && currentRetryCount > maxRetryCount) {
            return;
        }

        setTimeout(revalidate, timeout, opts);
    },
};

const DOMAIN_URL = process.env.DOMAIN;

const DEFAULT_META: NextPageMeta = {
    description: '',
    keywords: [''],
};

const App = (props: AppPropsWithLayout) => {
    const router = useRouter();

    const { Component } = props;

    const meta = {
        ...DEFAULT_META,
        ...Component.layoutProps?.meta,
    };
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
                {/* <meta property="og:image" content={currVersion('/logo-generation.jpg')} /> */}

                {/* Twitter */}
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={fullPath} />
                {/* <meta name="twitter:image" content={currVersion('/logo-generation.jpg')} /> */}

                {/* links */}
                <link rel="canonical" href={fullPath} />
            </Head>
            <SWRConfig value={swrConfig}>
                <AuthProvider>
                    <AppLayout {...props} />
                </AuthProvider>
            </SWRConfig>
        </>
    );
};

export default App;
