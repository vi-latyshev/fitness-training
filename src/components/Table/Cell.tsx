import clsx from 'clsx';

import { LoaderIcon } from '@/icons/Loader';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    full?: boolean;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const TableCell = ({
    full,
    disabled,
    loading,
    className,
    children,
    ...props
}: TableCellProps): JSX.Element => {
    const classes = clsx(className, 'table-cell px-5 first:rounded-l last:rounded-r', {
        'w-full': full,
        'opacity-60 bg-grayPrimary/30 select-none pointer-events-none': disabled,
    });

    return (
        <td className={classes} {...props}>
            {loading && <LoaderIcon className="h-4 w-4 -ml-1" />}
            {!loading && children}
        </td>
    );
};
