import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClockFace from "./ClockFace";
import AreaSelect from "./AreaSelect";
import LocationSelect from "./LocationSelect";
import RegionSelect from "./RegionSelect";

import {
    fetchAllTimezones,
    fetchAllTimezonesHasErrorsSelector,
    getCurrentTimeInTimezone,
    getCurrentTimeInTimezoneHasErrorsSelector,
    selectedAreaSelector,
    selectedLocationSelector,
} from "../app/time.slice";
import { notificationsSelector } from "../app/notification.slice";

type Props = {};

const Clock = (props: Props) => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);
    const notifications = useSelector(notificationsSelector);
    const fetchAllTimezonesHasErrors = useSelector(
        fetchAllTimezonesHasErrorsSelector
    );
    const getCurrentTimeInTimezoneHasErrors = useSelector(
        getCurrentTimeInTimezoneHasErrorsSelector
    );

    useEffect(() => {
        dispatch(fetchAllTimezones());
        dispatch(getCurrentTimeInTimezone());
    }, [dispatch]);

    useEffect(() => {
        console.log(notifications);
    });

    return (
        <>
            {getCurrentTimeInTimezoneHasErrors ? (
                <FetchCurrentTimeHasErrors />
            ) : (
                <ClockFace />
            )}
            {fetchAllTimezonesHasErrors ? (
                <FetchTimezonesError />
            ) : (
                <>
                    <AreaSelect />
                    {selectedArea && <LocationSelect />}
                    {selectedArea && selectedLocation && <RegionSelect />}
                </>
            )}
        </>
    );
};

const TimezonesSelectionComponent = () => {};

const FetchCurrentTimeHasErrors = () => {
    return (
        <>
            <p>
                Sorry, it looks like there was a problem with retrieving the
                requested time
            </p>
            <p>Please try refreshing the page in a moment</p>
        </>
    );
};

const FetchTimezonesError = () => {
    return (
        <>
            <p>
                Sorry, it looks like there was a problem with retrieving the
                timezones
            </p>
            <p>Please try refreshing the page in a moment</p>
        </>
    );
};

export default Clock;
