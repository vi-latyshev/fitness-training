import clsx from 'clsx';

interface DashboardTitleProps extends React.HTMLAttributes<HTMLTableCellElement> { }

export const DashboardTitle = ({
    children,
    className,
    ...props
}: DashboardTitleProps) => (
    <div
        className={clsx('flex flex-row items-center space-x-5 text-primary text-4xl font-bold', className)}
        {...props}
    >
        {children}
    </div>
);
