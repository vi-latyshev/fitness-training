interface DashboardTitleProps {
    children: string;
}

export const DashboardTitle = ({ children }: DashboardTitleProps) => (
    <div className="flex space-x-10">
        <h1 className="text-4xl font-bold">{children}</h1>
    </div>
);
