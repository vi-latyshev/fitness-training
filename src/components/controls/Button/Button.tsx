import { forwardRef } from 'react';
import clsx from 'clsx';

export type PolymorphicRef<T extends React.ElementType = 'button'> = React.ComponentPropsWithRef<T>['ref'];

export type ButtonProps<T extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<T> & {
    /**
     * @default button
     */
    as?: T;
    color?: 'default' | 'secondary' | 'success' | 'error';
    variant?: 'default' | 'soft' | 'text';
    hover?: boolean;
    rounded?: boolean;
    Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

export type ButtonComponent = <T extends React.ElementType = 'button'>(
    props: ButtonProps<T>,
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(<T extends React.ElementType = 'button'>({
    as,
    variant = 'default',
    color = 'default',
    hover = true,
    rounded,
    Icon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps<T>, ref: PolymorphicRef<T>) => {
    const Component = as ?? 'button';

    const classes = clsx(
        className,
        'flex items-center justify-center text-sm font-medium leading-none px-6 py-3 space-x-3 transition-all cursor-pointer',
        {
            // default
            'text-white': variant === 'default',

            'bg-primary': variant === 'default' && color === 'default',
            'hover:bg-primaryWhite focus:outline-none': variant === 'default' && color === 'default' && hover,

            'bg-secondary': variant === 'default' && color === 'secondary',
            'hover:bg-secondaryWhite focus:bg-secondaryWhite': variant === 'default' && color === 'secondary' && hover,

            'bg-success': variant === 'default' && color === 'success',
            'hover:bg-successWhite focus:bg-successWhite': variant === 'default' && color === 'success' && hover,

            'bg-error': variant === 'default' && color === 'error',
            'text-white bg-error hover:bg-errorWhite focus:bg-errorWhite': variant === 'default' && color === 'error' && hover,

            // text
            'text-primary': variant === 'text' && color === 'default',
            'hover:bg-grayPrimary': variant === 'text' && color === 'default' && hover,

            'text-secondary': variant === 'text' && color === 'secondary',
            'hover:bg-secondaryWhite/10': variant === 'text' && color === 'secondary' && hover,

            'text-success': variant === 'text' && color === 'success',
            'hover:bg-successWhite/10': variant === 'text' && color === 'success' && hover,

            'text-error': variant === 'text' && color === 'error',
            'hover:bg-errorWhite/10': variant === 'text' && color === 'error' && hover,

            // soft
            'text-primary bg-primarySoftWhite': variant === 'soft' && color === 'default',
            'hover:bg-primarySoft': variant === 'soft' && color === 'default' && hover,

            'text-secondary bg-secondarySoftWhite': variant === 'soft' && color === 'secondary',
            'hover:bg-secondarySoft': variant === 'soft' && color === 'secondary' && hover,

            'text-success bg-successSoftWhite': variant === 'soft' && color === 'success',
            'hover:bg-successSoft': variant === 'soft' && color === 'success' && hover,

            'text-error bg-errorSoftWhite': variant === 'soft' && color === 'error',
            'hover:bg-errorSoft': variant === 'soft' && color === 'error' && hover,

            // other
            'rounded-full': rounded,
            'opacity-50 cursor-default pointer-events-none': disabled,
        },
    );

    return (
        <Component {...props} className={classes} ref={ref}>
            {Icon && <Icon className="h-5 w-5" />}
            <div>{children}</div>
        </Component>
    );
});
