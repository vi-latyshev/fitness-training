import { useUser } from 'lib/context/auth';

import { PageLoader } from 'components/PageLoader';
import Card from 'components/Card';
import { Logo } from 'components/Logo';

import type { NextLayout } from './AppLayout';

export const AuthLayout: NextLayout = ({ meta, children }) => {
    const { loggedIn } = useUser();

    if (loggedIn === undefined || loggedIn) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen min-h-screen h-full bg-grayPrimary">
            <div className="mb-16">
                <Logo />
            </div>
            <main className="flex justify-center items-center w-full">
                <Card.Container className="max-w-fit">
                    <Card.Card>
                        {meta?.title && <Card.Title large center>{meta.title}</Card.Title>}
                        {children}
                    </Card.Card>
                </Card.Container>
            </main>
        </div>
    );
};
