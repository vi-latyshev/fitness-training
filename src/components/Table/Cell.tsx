import clsx from 'clsx';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    full?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const TableCell = ({
    full,
    disabled,
    className,
    ...props
}: TableCellProps) => {
    const classes = clsx(className, 'table-cell px-5 first:rounded-l last:rounded-r', {
        'w-full': full,
        'opacity-60 bg-grayPrimary/30': disabled,
    });

    return (
        <td className={classes} {...props} />
    );
};
