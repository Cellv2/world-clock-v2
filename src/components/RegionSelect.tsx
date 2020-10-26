import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from './dropdowns/CustomDropdown'

import { WorldTimeApiResponseSchema } from "../models/world-time-api/time.model";
import { replaceSlashAndUnderscore } from "../helpers/utils";

import styles from "./RegionSelect.module.scss";

type Props = {
    regions: string[] | WorldTimeApiResponseSchema;
    selectedRegion: string | null;
    handleRegionOnChange: (event: ValueType<{value: string, label: string}>) => void;
};

const RegionSelect = (props: Props) => {
    const { regions, selectedRegion } = props;

    if (Array.isArray(regions)) {
        const selectOptions = regions.map((region) => {
            return {
                label: replaceSlashAndUnderscore(region),
                value: region,
            };
        });
        const selectedRegionValue =
            selectedRegion !== null
                ? {
                      label: replaceSlashAndUnderscore(selectedRegion),
                      value: selectedRegion,
                  }
                : null;

        return (
            <>
                <CustomDropdown
                    options={selectOptions}
                    handleOnChange={props.handleRegionOnChange}
                    value={selectedRegionValue}
                    name="Region:"
                    label="Region:"
                />
                {!selectedRegion && (
                    <>
                        <div className={styles.notAvailable}>
                            Please select a region
                        </div>
                    </>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No regions available for the selected area</div>;
};

export default RegionSelect;
