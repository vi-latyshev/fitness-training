import clsx from 'clsx';

interface CardTitleProps {
    large?: boolean;
    center?: boolean;
    children: React.ReactNode;
}

export const CardTitle = ({
    large,
    center,
    children,
}: CardTitleProps) => {
    const classes = clsx('font-semibold text-lg', {
        'text-3xl mb-10': large,
        'text-center': center,
    });

    return (
        <div className={classes}>{children}</div>
    );
};
