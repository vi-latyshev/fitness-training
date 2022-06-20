interface TableContainerProps {
    children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => (
    <div className="overflow-x-auto">
        <table className="table border-separate border-spacing-y-3 whitespace-nowrap ">{children}</table>
    </div>
);
