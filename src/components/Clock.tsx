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

type Props = {};

type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;

const x: Area = {
    America: {
        Adak: "Adak",
        Anchorage: "Anchorage",
        Argentina: {
            Catamarca: "Catamarca",
        },
    },
    CET: "CET",
};

const Clock = (props: Props) => {
    const dispatch = useDispatch();
    const selectedArea = useSelector(selectedAreaSelector);
    const selectedLocation = useSelector(selectedLocationSelector);

    useEffect(() => {
        // dispatch(fetchAllTimezones());
        // dispatch(getCurrentTimeInTimezone());
    }, [dispatch]);

    return (
        <>
            <p>Testing</p>
            <AreaSelect />
            {selectedArea && <LocationSelect />}
            {selectedArea && selectedLocation && <RegionSelect />}
        </>
    );
};

const gen = (input: string[]) => {
    // check whether there is a child
    // if no, add to object
    // if yes, create key and add an object
    let obj = {} as Area;
    // input.forEach(item => {
    //     const split = item.split("/");
    //     const key = split[0];
    //     if (split.length === 1) {
    //         obj[key] = key
    //     } else {
    //         const popped = split.slice(1, split.length);
    //         obj[key] = gen(popped)
    //     }
    // })

    // /timezone/{area}/{location}/{region}
    const timezonesObj = input.reduce((acc, item) => {
        const timezone = item.split("/");
        const area = timezone[0]; //this should always exists
        if (timezone.length === 1) {
            acc[area] = area;
        } else if (timezone.length === 2) {
            const location = timezone[1];
            acc[area] = {
                location,
            };
        } else if (timezone.length === 3) {
            const location = timezone[1];
            const region = timezone[2];
            acc[area] = {
                location: {
                    region,
                },
            };
        }
        return acc;
    }, {} as Area);

    return timezonesObj;
};

export default Clock;
