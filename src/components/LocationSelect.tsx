import React from "react";
import { useSelector } from "react-redux";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { useAppDispatch } from "../app/store";
import { generateSelectOptions, valueToCustomDropdownValue } from "../utils";
import {
    selectedAreaSelector,
    selectedLocationSelector,
    timezoneObjSelector,
    setSelectedLocation,
} from "../app/time.slice";

import styles from "./LocationSelect.module.scss";

type Props = {};

const LocationSelect = (props: Props) => {
    const appDispatch = useAppDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const timezoneObj = useSelector(timezoneObjSelector);
    const locations =
        selectedArea !== null ? Object.keys(timezoneObj[selectedArea]) : null;

    // if it's a string, there must not be any locations (else it would be an object)
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
                        appDispatch(setSelectedLocation(e.value))
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

    return (
        <div className={styles.notAvailable}>
            No locations available for the selected area
        </div>
    );
};

export default LocationSelect;
