import clsx from 'clsx';

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
    <div className={clsx(className, 'w-full h-fit bg-white text-primary p-5 rounded-xl overflow-x-auto lg:p-7 md:w-auto')}>
        <div className="flex flex-col relative whitespace-nowrap space-y-6 w-fit sm:w-auto">
            {children}
        </div>
    </div>
);
