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


//do we want infinite recursion? Probably not?
type TimezoneJson = string | { [key: string]: TimezoneJson };
const timezoneJson: TimezoneJson = {
    America: {
        Adak: "Adak",
        Anchorage: "Anchorage",
        Argentina: {
            Catamarca: "Catamarca",
        },
    },
    CET: "CET",
};


type Area = Record<string, string | Location>;
type Location = Record<string, string | Region>;
type Region = Record<string, string>;

const tzObj: Area = {
    America: {
        Adak: "Adak",
        Anchorage: "Anchorage",
        Argentina: {
            Catamarca: "Catamarca",
        },
    },
    CET: "CET",
};



//Type 'string | Record<string, string | Record<string, string | Record<string, string>>>' is not assignable to 
//type 'string | Record<string, string | Record<string, string>>'.

function setValue(object:Area, path: string, value: string) {
    path = path.replace(/[\[]/gm, '/').replace(/[\]]/gm, ''); //to accept [index]
    const keys = path.split('/');
    const last = keys.pop();

    //@ts-expect-error
    keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, object)[last] = value;
}

var data = {};

setValue(data, 'location/degree/text', 'sometexthere');
setValue(data, "location/degree/qwe", "myvalue")
console.log(data);


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
