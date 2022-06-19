import * as React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

const IS_PROD = process.env.IS_PRODUCTION;
const DOMAIN_URL = process.env.DOMAIN;

const nowTime = Date.now();
const v = (href: string) => `${DOMAIN_URL}${href}?v=${nowTime}`;

export default class MyDocument extends Document {
    render = () => (
        <Html lang="ru">
            <Head>
                {/* required */}
                <meta name="theme-color" content="#ffffff" />

                {/* icons */}
                <link key="icon" rel="shortcut icon" href={v('/favicon.ico')} />
                {/* <link
                    key="icon-32"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={v('/favicon-32x32.png')}
                />
                <link
                    key="icon-16"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={v('/favicon-16x16.png')}
                /> */}

                {!IS_PROD && (
                    <meta name="robots" content="noindex" />
                )}

                {/* fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
                <div
                    aria-label="author"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: '<!-- Authored by Vi - https://github.com/vi-latyshev | P.s. design system is not mine and it is terribly ugly -->',
                    }}
                />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
};
