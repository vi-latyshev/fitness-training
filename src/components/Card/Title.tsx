import clsx from 'clsx';

interface CardTitleProps {
    large?: boolean;
    center?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const CardTitle = ({
    large,
    center,
    children,
    className,
}: CardTitleProps) => {
    const classes = clsx(className, 'flex flex-row items-center font-semibold text-lg', {
        'text-3xl mb-10': large,
        'text-center': center,
    });

    return (
        <div className={classes}>{children}</div>
    );
};
