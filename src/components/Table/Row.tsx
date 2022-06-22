import clsx from 'clsx';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    border?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export const TableRow = ({
    border = true,
    disabled,
    className,
    children,
}: TableRowProps) => {
    const classes = clsx(className, 'table-row align-middle h-14 transition-all', {
        'child:border-t child:border-b child-first:border-l child-last:border-r child:border-grayPrimary ': border,
        'hover:bg-grayPrimary/30': !disabled,
    });

    return (
        <tr className={classes}>{children}</tr>
    );
};
