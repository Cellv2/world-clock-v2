import React from "react";
import { useSelector } from "react-redux";

import AreaSelect from "./AreaSelect";
import LocationSelect from "./LocationSelect";
import RegionSelect from "./RegionSelect";

import {
    selectedAreaSelector,
    selectedLocationSelector,
} from "../app/time.slice";

type Props = {};

const TimezonesSelection = (props: Props) => {
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);

    return (
        <>
            <AreaSelect />
            {selectedArea && <LocationSelect />}
            {selectedArea && selectedLocation && <RegionSelect />}
        </>
    );
};

export default TimezonesSelection;
