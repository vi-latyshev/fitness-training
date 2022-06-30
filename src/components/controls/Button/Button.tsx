import { forwardRef, cloneElement } from 'react';
import clsx from 'clsx';

type PolymorphicRef<T extends React.ElementType = 'button'> = React.ComponentPropsWithRef<T>['ref'];

export type ButtonProps<T extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<T> & {
    /**
     * @default button
     */
    as?: T;
    color?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
    variant?: 'default' | 'soft' | 'text';
    hover?: boolean;
    rounded?: boolean;
    full?: boolean;
    Icon?: React.ReactElement;
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
    full,
    Icon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps<T>, ref: PolymorphicRef<T>) => {
    const Component = as ?? 'button';

    const classes = clsx(
        className,
        'flex items-center justify-center relative text-sm rounded font-medium leading-5 px-6 py-3 space-x-3 transition-all cursor-pointer select-none',
        {
            // default
            'text-white': variant === 'default',

            'bg-primary': variant === 'default' && color === 'default',
            'hover:bg-primary-light focus:outline-none': variant === 'default' && color === 'default' && hover,

            'bg-secondary': variant === 'default' && color === 'secondary',
            'hover:bg-secondary-light focus:bg-secondary-light': variant === 'default' && color === 'secondary' && hover,

            'bg-success': variant === 'default' && color === 'success',
            'hover:bg-success-light focus:bg-success-light': variant === 'default' && color === 'success' && hover,

            'bg-warning': variant === 'default' && color === 'warning',
            'hover:bg-warning-light focus:bg-warning-light': variant === 'default' && color === 'warning' && hover,

            'bg-error': variant === 'default' && color === 'error',
            'text-white bg-error hover:bg-error-light focus:bg-error-light': variant === 'default' && color === 'error' && hover,

            // text
            'text-primary': variant === 'text' && color === 'default',
            'hover:bg-grayPrimary': variant === 'text' && color === 'default' && hover,

            'text-secondary': variant === 'text' && color === 'secondary',
            'hover:bg-secondary-light/10': variant === 'text' && color === 'secondary' && hover,

            'text-success': variant === 'text' && color === 'success',
            'hover:bg-success-light/10': variant === 'text' && color === 'success' && hover,

            'text-warning': variant === 'text' && color === 'warning',
            'hover:bg-warning-light/10': variant === 'text' && color === 'warning' && hover,

            'text-error': variant === 'text' && color === 'error',
            'hover:bg-error-light/10': variant === 'text' && color === 'error' && hover,

            // soft
            'text-primary bg-primarySoft-light': variant === 'soft' && color === 'default',
            'hover:bg-primarySoft': variant === 'soft' && color === 'default' && hover,

            'text-secondary bg-secondarySoft-light': variant === 'soft' && color === 'secondary',
            'hover:bg-secondarySoft': variant === 'soft' && color === 'secondary' && hover,

            'text-success bg-successSoft-light': variant === 'soft' && color === 'success',
            'hover:bg-successSoft': variant === 'soft' && color === 'success' && hover,

            'text-warning bg-warningSoft-light': variant === 'soft' && color === 'warning',
            'hover:bg-warningSoft': variant === 'soft' && color === 'warning' && hover,

            'text-error bg-errorSoft-light': variant === 'soft' && color === 'error',
            'hover:bg-errorSoft': variant === 'soft' && color === 'error' && hover,

            // other
            'rounded-full': rounded,
            'w-full': full,
            'opacity-50 cursor-default pointer-events-none': disabled,
        },
    );

    const classesIcon = Icon && clsx(
        Icon.props?.className,
        'h-4 w-4 -ml-1',
        {
            'text-white': variant === 'default',
            ...((variant === 'text' || variant === 'soft') && {
                'text-primary': color === 'default',
                'text-secondary': color === 'secondary',
                'text-success': color === 'success',
                'text-warning': color === 'warning',
                'text-error': color === 'error',
            }),
        },
    );

    return (
        <Component
            {...props}
            disabled={disabled}
            className={classes}
            ref={ref}
        >
            {Icon && cloneElement(Icon, { className: classesIcon })}
            {children && <div>{children}</div>}
        </Component>
    );
});
