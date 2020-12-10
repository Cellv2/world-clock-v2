import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import timeManager from "../app/time-manager";
import {
    currentTimeResponseSelector,
    selectedAreaSelector,
} from "../app/time.slice";
import { replaceSlashAndUnderscore } from "../utils/string.utils";

import styles from "./ClockFace.module.scss";

type Props = {};

const ClockFace = (props: Props) => {
    const currentTimeResponse = useSelector(currentTimeResponseSelector);
    const selectedArea = useSelector(selectedAreaSelector);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const _interval = setInterval(() => {
            setSeconds(timeManager.getElapsedTime());
        }, 1000);
        return () => clearInterval(_interval);
    }, []);

    useEffect(() => {
        timeManager.startNewInterval();
        // we reset the locally used seconds to avoid the time 'skipping'
        // the skipping would happen because the local seconds variable only updates every 1 second...
        // ...and would keep the previous number of elapsed seconds until the next interval
        setSeconds(0)
    }, [currentTimeResponse]);

    if (currentTimeResponse === null) {
        return <div>Fetching time...</div>;
    }

    const { unixtime, raw_offset, dst_offset, dst } = currentTimeResponse;

    const adjustedTime: number = unixtime + raw_offset + seconds;

    const date: Date = new Date(adjustedTime * 1000);
    const hours = "0" + date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();
    const formattedTime: string =
        hours.substr(-2) + ":" + mins.substr(-2) + ":" + secs.substr(-2);

    const dstInHours: number = dst_offset ? dst_offset / 60 / 60 : 0;

    // the local machine's day
    const localDay: number = new Date(Date.now()).getDay();
    // the timezone that is selected through the dropdown
    const timezoneDay: number = date.getDay();
    let dayComparisonWord: string = "";
    if (localDay !== timezoneDay) {
        dayComparisonWord = localDay > timezoneDay ? "Yesterday" : "Tomorrow";
    }

    return (
        <div className={styles.clockFace}>
            <p>
                Currently selected time zone is{" "}
                {replaceSlashAndUnderscore(currentTimeResponse.timezone)}
            </p>
            {!selectedArea && (
                <p className={styles.smallText}>
                    <em>This was based off of your public IP</em>
                </p>
            )}
            <p>
                The current time is:{" "}
                <time dateTime={`${date}`}>{formattedTime}</time>
                <sup
                    className={`${styles.smallText} ${styles.superscriptItalics}`}
                >
                    {dayComparisonWord}
                </sup>
            </p>
            {dst && (
                <p className={styles.smallText}>
                    <em>
                        {!selectedArea ? "You are" : "This time zone is"}{" "}
                        currently in Daylight Saving Time (+{dstInHours}h)
                    </em>
                </p>
            )}
        </div>
    );
};

export default ClockFace;
