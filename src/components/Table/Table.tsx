interface TableProps {
    children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => (
    <table className="table border-separate border-spacing-y-2 w-full">{children}</table>
);
