import React from "react";
import { useSelector } from "react-redux";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { useAppDispatch } from "../app/store";
import { generateSelectOptions, valueToCustomDropdownValue } from "../utils";
import {
    getCurrentTimeInTimezone,
    selectedAreaSelector,
    selectedLocationSelector,
    selectedRegionSelector,
    setSelectedRegion,
    timezonesSelector,
} from "../app/time.slice";

import styles from "./RegionSelect.module.scss";

type Props = {};

const RegionSelect = (props: Props) => {
    const appDispatch = useAppDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const selectedRegion = useSelector(selectedRegionSelector);
    const timezones = useSelector(timezonesSelector);
    const regions =
        selectedArea !== null && selectedLocation !== null
            ? // @ts-expect-error - https://github.com/microsoft/TypeScript/issues/21760
              Object.keys(timezones[selectedArea][selectedLocation])
            : null;

    // if it's a string, there must not be any regions (else it would be an object)
    if (
        selectedArea &&
        selectedLocation &&
        // @ts-expect-error - https://github.com/microsoft/TypeScript/issues/21760
        typeof timezones[selectedArea][selectedLocation] === "string"
    ) {
        return (
            <div className={styles.notAvailable}>
                No regions available for the selected location
            </div>
        );
    }

    const handleOnChange = (event: CustomDropdownValue) => {
        appDispatch(setSelectedRegion(event.value));
        appDispatch(getCurrentTimeInTimezone());
    };

    if (Array.isArray(regions)) {
        return (
            <>
                <CustomDropdown
                    options={generateSelectOptions(regions)}
                    handleOnChange={(e) => handleOnChange(e)}
                    value={
                        selectedRegion !== null
                            ? valueToCustomDropdownValue(selectedRegion)
                            : null
                    }
                    name="Region:"
                    label="Region:"
                />
                {!selectedRegion && (
                    <div className={styles.notAvailable}>
                        Please select a region
                    </div>
                )}
            </>
        );
    }

    return (
        <div className={styles.notAvailable}>
            No regions available for the selected location
        </div>
    );
};

export default RegionSelect;
