import clsx from 'clsx';

import { LoaderIcon } from 'icons/Loader';

interface PageLoaderProps {
    full?: boolean;
}

export const PageLoader = ({
    full,
}: PageLoaderProps) => {
    const classes = clsx('flex justify-center items-center', {
        'w-full h-screen': full,
    });

    return (
        <div className={classes}>
            <LoaderIcon width="72" height="72" />
        </div>
    );
};
