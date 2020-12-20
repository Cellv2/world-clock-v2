import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClockFace from "./ClockFace";
import AreaSelect from "./AreaSelect";
import LocationSelect from "./LocationSelect";
import RegionSelect from "./RegionSelect";

import {
    fetchAllTimezones,
    getCurrentTimeInTimezone,
    selectedAreaSelector,
    selectedLocationSelector,
} from "../app/time.slice";
import { notificationsSelector } from "../app/notification.slice";

type Props = {};

const Clock = (props: Props) => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const notifications = useSelector(notificationsSelector)

    useEffect(() => {
        dispatch(fetchAllTimezones());
        dispatch(getCurrentTimeInTimezone());
    }, [dispatch]);

    useEffect(() => {
        console.log(notifications)
    })

    return (
        <>
            <ClockFace />
            <AreaSelect />
            {selectedArea && <LocationSelect />}
            {selectedArea && selectedLocation && <RegionSelect />}
        </>
    );
};

export default Clock;
