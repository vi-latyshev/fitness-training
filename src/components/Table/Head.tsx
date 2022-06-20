interface TableHeadProps {
    children: React.ReactNode;
}

export const TableHead = ({ children }: TableHeadProps) => (
    <thead className="table-header-group">{children}</thead>
);
