export interface SelectItemValue {
    value: string;
    humanValue: string;
}

interface SelectItemProps extends SelectItemValue { }

export const SelectItem = ({
    value,
    humanValue,
}: SelectItemProps) => (
    <option value={value}>{humanValue}</option>
);
