import { Loader } from 'components/Loader';

import type { APIErrorJSON } from 'lib/api/error';

interface SwrLoadingHandleProps {
    error?: APIErrorJSON;
    isLoading: boolean;
    children?: React.ReactNode;
}

export const SwrLoadingHandle = ({
    error,
    isLoading,
    children,
}: SwrLoadingHandleProps): React.ReactElement => {
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return (
            <div className="text-error text-sm">
                {error?.message ?? 'Ошибка получения данных'}
            </div>
        );
    }

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
