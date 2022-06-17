import * as React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

const IS_PROD = process.env.IS_PRODUCTION;

export default class MyDocument extends Document {
    render = () => (
        <Html lang="ru">
            <Head>
                <meta name="theme-color" content="#ffffff" />
                {!IS_PROD && (
                    <meta name="robots" content="noindex" />
                )}
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
