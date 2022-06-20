interface TableBodyProps {
    children: React.ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => (
    <tbody className="table-row-group w-full">{children}</tbody>
);
