import Head from 'next/head';
import { useRouter } from 'next/router';

interface MetaTitleProps {
    title?: string;
}

const DEFAULT_TITLE = 'Сводка Моторов';

const getTitle = (title: string, pathname: string) => (
    pathname === '/'
        ? `${DEFAULT_TITLE} - ${title}`
        : `${title} - ${DEFAULT_TITLE}`
);

export const MetaTitle = ({ title }: MetaTitleProps) => {
    const router = useRouter();

    const fullTitle = title ? getTitle(title, router.pathname) : DEFAULT_TITLE;

    return (
        <Head>
            <title key="title">{fullTitle}</title>
            <meta key="twitter:title" name="twitter:title" content={fullTitle} />
            <meta key="og:title" property="og:title" content={fullTitle} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={fullTitle} />

            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
        </Head>
    );
};
