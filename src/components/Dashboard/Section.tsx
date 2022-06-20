import clsx from 'clsx';

interface DashboardSectionProps {
    className?: string;
    children: React.ReactNode;
}

export const DashboardSection = ({ className, children }: DashboardSectionProps) => (
    <section className={clsx(className, 'bg-white text-primary lg:p-7 p-5 rounded-xl space-y-10')}>
        {children}
    </section>
);
