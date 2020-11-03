import { replaceSlashAndUnderscore } from "./string.utils";

export const valueToCustomDropdownValue = (
    value: string
): CustomDropdownValue => {
    const dropdownValue = { label: replaceSlashAndUnderscore(value), value };
    return dropdownValue;
};

export const generateSelectOptions = (
    values: string[]
): CustomDropdownValue[] => {
    const options = values.map((option) => {
        return {
            label: replaceSlashAndUnderscore(option),
            value: option,
        };
    });

    return options;
};
