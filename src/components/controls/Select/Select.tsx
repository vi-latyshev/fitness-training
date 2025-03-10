import { forwardRef } from 'react';
import clsx from 'clsx';

import { SelectItem, SelectItemValue } from './Item';

export type SelectProps = Omit<React.ComponentPropsWithoutRef<'select'>, 'children'> & {
    label?: string;
    full?: boolean;
    items: SelectItemValue[];
    error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    items,
    label,
    full = false,
    error,
    disabled,
    className,
    ...props
}: SelectProps, ref) => {
    const classesContainer = clsx('flex flex-col', {
        'max-w-fit': !full,
        'w-full': full,
    });
    const classes = clsx(
        className,
        'block px-4 py-2 text-primary bg-white rounded border border-solid border-gray-300 focus:border-primary focus:outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400 transition',
        {
            'border-error': error,
            'w-full': full,
            'opacity-50 cursor-default pointer-events-none': disabled,
        },
    );

    return (
        <div className={classesContainer}>
            {label && <label htmlFor={label} className="text-sm font-semibold mb-1">{label}:</label>}
            <select
                {...props}
                id={label}
                ref={ref}
                className={classes}
            >
                {items.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SelectItem key={`${item.value}${index}`} {...item} />
                ))}
            </select>
            {error && <p className="self-end mt-1 text-error text-sm">{error}</p>}
        </div>
    );
});
