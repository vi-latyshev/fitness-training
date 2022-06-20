import clsx from 'clsx';

interface TableRowProps {
    border?: boolean;
    children: React.ReactNode;
}

export const TableRow = ({
    border = true,
    children,
}: TableRowProps) => {
    const classes = clsx('table-row align-middle h-14', {
        'child:border-t child:border-b child-first:border-l child-last:border-r child:border-grayPrimary ': border,
    });

    return (
        <tr className={classes}>{children}</tr>
    );
};
