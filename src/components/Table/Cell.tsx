import clsx from 'clsx';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children: React.ReactNode;
}

export const TableCell = ({
    className,
    ...props
}: TableCellProps) => {
    const classes = clsx(className, 'table-cell px-5 rounded');

    return (
        <td className={classes} {...props} />
    );
};
