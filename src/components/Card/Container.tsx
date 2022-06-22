import clsx from 'clsx';

interface CardContainerProps {
    className?: string;
    children: React.ReactNode;
}

export const CardContainer = ({ className, children }: CardContainerProps) => (
    <div className={clsx(className, 'grid gap-16 w-full')}>
        {children}
    </div>
);
