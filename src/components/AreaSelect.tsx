import React from "react";
import { useSelector } from "react-redux";

import CustomDropdown from "./dropdowns/CustomDropdown";

import { useAppDispatch } from "../app/store";
import { generateSelectOptions, valueToCustomDropdownValue } from "../utils";
import {
    getCurrentTimeInTimezone,
    selectedAreaSelector,
    setSelectedArea,
    timezonesSelector,
} from "../app/time.slice";

import styles from "./AreaSelect.module.scss";

type Props = {};

const AreaSelect = (props: Props) => {
    const appDispatch = useAppDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const timezones = useSelector(timezonesSelector);
    const areas = Object.keys(timezones);

    const handleOnChange = (event: CustomDropdownValue) => {
        appDispatch(setSelectedArea(event.value));

        if (typeof timezones[event.value] === "string") {
            appDispatch(getCurrentTimeInTimezone());
        }
    };

    if (areas.length > 0) {
        return (
            <>
                <CustomDropdown
                    options={generateSelectOptions(areas)}
                    handleOnChange={(e) => handleOnChange(e)}
                    value={
                        selectedArea
                            ? valueToCustomDropdownValue(selectedArea)
                            : null
                    }
                    name="Area:"
                    label="Area:"
                />
                {!selectedArea && (
                    <div className={styles.notAvailable}>
                        Please select an area
                    </div>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

export default AreaSelect;
