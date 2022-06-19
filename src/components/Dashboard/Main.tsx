interface DashboardMainProps {
    children: React.ReactNode;
}

export const DashboardMain = ({ children }: DashboardMainProps) => (
    <main className="lg:flex lg:space-x-10 space-y-5 lg:space-y-0">
        {children}
    </main>
);
