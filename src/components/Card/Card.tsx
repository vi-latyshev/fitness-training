import clsx from 'clsx';

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
    <div className={clsx(className, 'bg-white text-primary lg:p-7 p-5 rounded-xl space-y-5')}>
        {children}
    </div>
);
