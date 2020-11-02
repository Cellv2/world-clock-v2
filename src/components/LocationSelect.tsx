import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { replaceSlashAndUnderscore } from "../helpers/utils";

import styles from "./LocationSelect.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    selectedAreaSelector,
    selectedLocationSelector,
    timezoneObjSelector,
    setSelectedLocation,
} from "../app/time.slice";

type Props = {
    // locations: string[] | WorldTimeApiResponseSchema;
    // selectedLocation: string | null;
    // handleRegionOnChange: (
    //     event: ValueType<{ value: string; label: string }>
    // ) => void;
};

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

const LocationSelect = (props: Props) => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const timezoneObj = useSelector(timezoneObjSelector);
    const locations =
        selectedArea !== null ? Object.keys(timezoneObj[selectedArea]) : null;

    if (selectedArea && typeof timezoneObj[selectedArea] === "string") {
        return (
            <div className={styles.notAvailable}>
                No locations available for the selected area
            </div>
        );
    }

    if (Array.isArray(locations)) {
        return (
            <>
                <CustomDropdown
                    options={generateSelectOptions(locations)}
                    handleOnChange={(e) =>
                        dispatch(setSelectedLocation(e.value))
                    }
                    value={
                        selectedLocation !== null
                            ? valueToCustomDropdownValue(selectedLocation)
                            : null
                    }
                    name="Location:"
                    label="Location:"
                />
                {!selectedLocation && (
                    <>
                        <div className={styles.notAvailable}>
                            Please select a location
                        </div>
                    </>
                )}
            </>
        );
    }

    // it should never reach here, but we need a default return
    return (
        <div className={styles.notAvailable}>
            No locations available for the selected area
        </div>
    );
};

export default LocationSelect;
// type Props = {
//     regions: string[] | WorldTimeApiResponseSchema;
//     selectedRegion: string | null;
//     handleRegionOnChange: (event: ValueType<{value: string, label: string}>) => void;
// };

// const RegionSelect = (props: Props) => {
//     const { regions, selectedRegion } = props;

//     if (Array.isArray(regions)) {
//         const selectOptions = regions.map((region) => {
//             return {
//                 label: replaceSlashAndUnderscore(region),
//                 value: region,
//             };
//         });
//         const selectedRegionValue =
//             selectedRegion !== null
//                 ? {
//                       label: replaceSlashAndUnderscore(selectedRegion),
//                       value: selectedRegion,
//                   }
//                 : null;

//         return (
//             <>
//                 <CustomDropdown
//                     options={selectOptions}
//                     handleOnChange={props.handleRegionOnChange}
//                     value={selectedRegionValue}
//                     name="Region:"
//                     label="Region:"
//                 />
//                 {!selectedRegion && (
//                     <>
//                         <div className={styles.notAvailable}>
//                             Please select a region
//                         </div>
//                     </>
//                 )}
//             </>
//         );
//     }

//     return <div className={styles.notAvailable}>No regions available for the selected area</div>;
// };

// export default RegionSelect;
