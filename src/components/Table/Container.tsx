interface TableContainerProps {
    children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => (
    <table className="table border-separate border-spacing-y-2">{children}</table>
);
