import clsx from 'clsx';
import { forwardRef } from 'react';

export type InputProps = React.ComponentPropsWithoutRef<'input'> & {
    label?: string;
    error?: string;
    full?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    full = false,
    label,
    error,
    disabled,
    className,
    ...props
}, ref) => {
    const classesContainer = clsx('flex flex-col', {
        'max-w-fit': !full,
        'w-full': full,
    });
    const classes = clsx(
        className,
        'block px-4 py-2 text-primary bg-white rounded border border-solid border-gray-300 focus:border-primary focus:outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400 transition',
        {
            'border-error': error,
            // 'w-64': !full,
            'w-full': full,
            'opacity-50 cursor-default pointer-events-none': disabled,
        },
    );

    return (
        <div className={classesContainer}>
            {label && <p className="text-sm font-semibold mb-1">{label}:</p>}
            <input
                type="text"
                {...props}
                ref={ref}
                disabled={disabled}
                className={classes}
            />
            {error && <p className="self-end mt-1 text-error text-sm">{error}</p>}
        </div>
    );
});
