import type { SelectItemValue } from './Item';

export const convertItemsToSelect = <T extends string>(
    items: T[],
    humanValues: Record<T, string>
): SelectItemValue[] => (
        items.map((item) => ({
            value: item,
            humanValue: humanValues[item] ?? item,
        }))
    );
