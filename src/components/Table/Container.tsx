interface TableContainerProps {
    children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => (
    <div className="flex flex-col relative">{children}</div>
);
