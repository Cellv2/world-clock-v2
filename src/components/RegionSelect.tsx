import React from "react";
import { useSelector } from "react-redux";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { generateSelectOptions, valueToCustomDropdownValue } from "../utils";
import { useAppDispatch } from "../app/store";
import {
    selectedAreaSelector,
    selectedLocationSelector,
    selectedRegionSelector,
    setSelectedRegion,
    timezoneObjSelector,
} from "../app/time.slice";

import styles from "./RegionSelect.module.scss";

type Props = {};

const RegionSelect = (props: Props) => {
    const appDispatch = useAppDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const selectedRegion = useSelector(selectedRegionSelector);
    const timezoneObj = useSelector(timezoneObjSelector);
    const regions = (selectedArea !== null && selectedLocation !== null
        ? // @ts-expect-error - https://github.com/microsoft/TypeScript/issues/21760
          Object.keys(timezoneObj[selectedArea][selectedLocation])
        : null) as string[] | null;

    // if it's a string, there must not be any regions (else it would be an object)
    if (
        selectedArea &&
        selectedLocation &&
        // @ts-expect-error - https://github.com/microsoft/TypeScript/issues/21760
        typeof timezoneObj[selectedArea][selectedLocation] === "string"
    ) {
        return (
            <div className={styles.notAvailable}>
                No regions available for the selected location
            </div>
        );
    }

    if (Array.isArray(regions)) {
        return (
            <>
                <CustomDropdown
                    options={generateSelectOptions(regions)}
                    handleOnChange={(e) =>
                        appDispatch(setSelectedRegion(e.value))
                    }
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
