import React from "react";
import { useAppDispatch } from "../app/store";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { replaceSlashAndUnderscore } from "../helpers/utils";

import styles from "./AreaSelect.module.scss";
import { useSelector } from "react-redux";
import {
    selectedAreaSelector,
    setSelectedArea,
    timezoneObjSelector,
} from "../app/time.slice";

type Props = {};

const valueToCustomDropdownValue = (value: string): CustomDropdownValue => {
    const dropdownValue = { label: replaceSlashAndUnderscore(value), value };
    return dropdownValue;
};

const generateSelectOptions = (values: string[]): CustomDropdownValue[] => {
    const options = values.map((option) => {
        return {
            label: replaceSlashAndUnderscore(option),
            value: option,
        };
    });

    return options;
};

const AreaSelect = (props: Props) => {
    const appDispatch = useAppDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const timezoneObj = useSelector(timezoneObjSelector);
    const areas = Object.keys(timezoneObj);

    if (areas.length > 0) {
        return (
            <>
                <CustomDropdown
                    options={generateSelectOptions(areas)}
                    handleOnChange={(e) => {
                        appDispatch(setSelectedArea(e.value));
                    }}
                    value={
                        selectedArea
                            ? valueToCustomDropdownValue(selectedArea)
                            : null
                    }
                    name="Area:"
                    label="Area:"
                />
                {!selectedArea && (
                    <>
                        <div className={styles.notAvailable}>
                            Please select an area
                        </div>
                    </>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

// type Props = {
//     areas: string[];
//     selectedArea: string | null;
//     handleAreaOnChange: (event: ValueType<{value: string, label: string}>) => void;
// };

// const AreaSelect = (props: Props) => {
//     const { areas, selectedArea } = props;

//     //this should always be an array, but let's be on the safe side
//     if (Array.isArray(areas)) {
//         const selectOptions = areas.map((area) => {
//             return {
//                 label: replaceSlashAndUnderscore(area),
//                 value: area,
//             };
//         });
//         const selectedAreaValue =
//             selectedArea !== null
//                 ? {
//                       label: replaceSlashAndUnderscore(selectedArea),
//                       value: selectedArea,
//                   }
//                 : null;

//         return (
//             <>
//                 <CustomDropdown
//                     options={selectOptions}
//                     handleOnChange={props.handleAreaOnChange}
//                     value={selectedAreaValue}
//                     name="Area:"
//                     label="Area:"
//                 />
//                 {!selectedArea && (
//                     <>
//                         <div className={styles.notAvailable}>
//                             Please select an area
//                         </div>
//                     </>
//                 )}
//             </>
//         );
//     }

//     return <div className={styles.notAvailable}>No areas available</div>;
// };

export default AreaSelect;
