import { forwardRef } from 'react';
import clsx from 'clsx';
import { CheckIcon } from '@heroicons/react/solid';

type PolymorphicRef = React.ComponentPropsWithRef<'input'>['ref'];

export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'children'> & {
    label?: string;
    color?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
    variant?: 'default' | 'soft';
    disabled?: boolean;
};

type CheckboxComponent = (
    props: CheckboxProps,
) => React.ReactElement | null;

export const Checkbox: CheckboxComponent = forwardRef(({
    label,
    color = 'default',
    variant = 'default',
    disabled,
    className,
    ...props
}: CheckboxProps, ref: PolymorphicRef) => {
    const classesContainer = clsx(
        className,
        'flex relative leading-none cursor-default',
        {
            'opacity-50 select-none pointer-events-none': disabled,
        },
    );
    const clessesBackground = clsx(
        'hidden peer-checked:flex text-white rounded-sm',
        {
            ...(variant === 'default' && {
                'bg-primary': color === 'default',
                'bg-secondary': color === 'secondary',
                'bg-success': color === 'success',
                'bg-warning': color === 'warning',
                'bg-error': color === 'error',
            }),
            ...(variant === 'soft' && {
                'bg-primarySoft': color === 'default',
                'bg-secondarySoft': color === 'secondary',
                'bg-successSoft': color === 'success',
                'bg-warningSoft': color === 'warning',
                'bg-errorSoft': color === 'error',
            }),
        },
    );

    return (
        <div className={classesContainer}>
            <div className="w-5 h-5 flex cursor-pointer items-center relative bg-grayPrimary rounded-sm">
                <input
                    {...props}
                    ref={ref}
                    disabled={disabled}
                    type="checkbox"
                    className="peer opacity-0 absolute cursor-pointer w-full h-full"
                />
                <div className={clessesBackground}>
                    <CheckIcon className="h-5 w-5" />
                </div>
            </div>
            {label && (
                <span className="text-sm font-semibold pl-3">
                    {label}
                </span>
            )}
        </div>
    );
});
