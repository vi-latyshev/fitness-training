import { forwardRef } from 'react';
import clsx from 'clsx';

export type PolymorphicRef<T extends React.ElementType = 'button'> = React.ComponentPropsWithRef<T>['ref'];

export type ButtonProps<T extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<T> & {
    /**
     * @default button
     */
    as?: T;
    color?: 'default' | 'secondary' | 'success' | 'error';
    variant?: 'text' | 'contained';
    Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

export type ButtonComponent = <T extends React.ElementType = 'button'>(
    props: ButtonProps<T>,
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(<T extends React.ElementType = 'button'>({
    as,
    variant = 'contained',
    color = 'default',
    Icon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps<T>, ref: PolymorphicRef<T>) => {
    const Component = as ?? 'button';

    const classes = clsx(
        className,
        'flex items-start justify-center text-sm px-4 py-3 transition-all cursor-pointer',
        {
            ...(variant === 'text' && {
                'hover:bg-gray-100': color === 'default',
                'text-secondaryDark hover:bg-secondary/20': color === 'secondary',
                'text-green-600 hover:bg-green-200/20': color === 'success',
                'text-red-600 hover:bg-red-200/20': color === 'error',
            }),
            ...(variant === 'contained' && {
                'text-white bg-primary hover:bg-primaryDark focus:ring-primaryDark': color === 'default',
                'text-white bg-secondary hover:bg-secondaryDark/80 focus:bg-secondaryDark/80': color === 'secondary',
                'text-white bg-green-400 hover:bg-green-500 focus:bg-green-500': color === 'success',
                'text-white bg-red-400 hover:bg-red-500 focus:bg-red-500': color === 'error',
            }),
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
