import clsx from 'clsx';
import { forwardRef } from 'react';

export type InputProps = React.ComponentPropsWithoutRef<'input'> & {
    full?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    full,
    className,
    ...props
}, ref) => {
    const classes = clsx(
        className,
        'block px-4 py-2 text-primary bg-white rounded border border-solid border-gray-300 focus:border-primary focus:outline-none placeholder:italic placeholder:text-sm placeholder:text-slate-400 transition',
        {
            ' w-full': full,
        },
    );

    return (
        <input
            {...props}
            ref={ref}
            className={classes}
        />
    );
});
