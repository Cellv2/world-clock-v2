import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClockFace from "./ClockFace";
import FetchCurrentTimeError from "./errors/FetchCurrentTimeError";
import FetchAllTimezonesError from "./errors/FetchAllTimezonesError";
import TimezonesSelection from "./TimezonesSelection";

import {
    fetchAllTimezones,
    fetchAllTimezonesHasErrorsSelector,
    getCurrentTimeInTimezone,
    getCurrentTimeInTimezoneHasErrorsSelector,
} from "../app/time.slice";
import { notificationsSelector } from "../app/notification.slice";

type Props = {};

const Clock = (props: Props) => {
    const dispatch = useDispatch();
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
            {!getCurrentTimeInTimezoneHasErrors ? (
                <ClockFace />
            ) : (
                <FetchCurrentTimeError />
            )}
            {!fetchAllTimezonesHasErrors ? (
                <TimezonesSelection />
            ) : (
                <FetchAllTimezonesError />
            )}
        </>
    );
};

export default Clock;
